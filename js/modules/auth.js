/* ===================================================================
   MathMaster — auth.js
   Client-side auth (demo): register, login, logout, session, roles
   NOTE: For demo/education only — no real security. Replace with a
   backend before production use.
   =================================================================== */
(function () {
  "use strict";
  const MM = (window.MM = window.MM || {});

  // Use localStorage (not sessionStorage) so the session survives tab
  // switches, mobile browser backgrounding, and page reloads.
  const SESSION_KEY = "mathmaster.session";

  function hash(str) {
    // tiny non-crypto hash for demo only
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return String(h);
  }

  function currentSession() {
    try {
      // Prefer localStorage; fall back to sessionStorage for older sessions
      const raw =
        localStorage.getItem(SESSION_KEY) ||
        sessionStorage.getItem(SESSION_KEY) ||
        "null";
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  function setSession(s) {
    try {
      if (s) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(s));
        // also clear any stale sessionStorage entry
        sessionStorage.removeItem(SESSION_KEY);
      } else {
        localStorage.removeItem(SESSION_KEY);
        sessionStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      console.warn("Session save failed", e);
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function register({ name, email, password }) {
    email = String(email || "").trim().toLowerCase();
    const errors = {};
    if (!name || name.trim().length < 2) errors.name = "Please enter your name.";
    if (!validateEmail(email)) errors.email = "Enter a valid email address.";
    if (!password || password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (Object.keys(errors).length) return { ok: false, errors };

    const exists = MM.store.users.some((u) => u.email === email);
    if (exists) {
      return {
        ok: false,
        errors: {
          email: "An account with this email already exists. Please sign in instead.",
        },
      };
    }

    const isAdmin = MM.store.users.filter((u) => !String(u.id).startsWith("demo_")).length === 0;
    const user = {
      id: MM.uid("usr"),
      name: name.trim(),
      email,
      pass: hash(password),
      avatar: null,
      role: isAdmin ? "admin" : "student",
      joinedAt: Date.now(),
      bio: "",
      title: "Math Explorer",
    };
    MM.store.addUser(user);
    // auto login — persist session + current user
    setSession({ id: user.id, at: Date.now() });
    MM.store.user = user;
    return { ok: true, user };
  }

  function login({ email, password }) {
    email = String(email || "").trim().toLowerCase();
    const errors = {};
    if (!validateEmail(email)) errors.email = "Enter a valid email.";
    if (!password) errors.password = "Enter your password.";
    if (Object.keys(errors).length) return { ok: false, errors };

    const user = MM.store.users.find((u) => u.email === email);
    if (!user || user.pass !== hash(password)) {
      return { ok: false, errors: { form: "Incorrect email or password." } };
    }
    setSession({ id: user.id, at: Date.now() });
    MM.store.user = user;
    return { ok: true, user };
  }

  function loginDemo(role = "student") {
    // Reuse existing demo user if present so we don't flood the store
    const email = role + "@demo.math";
    let user = MM.store.users.find((u) => u.email === email);
    if (!user) {
      user = {
        id: MM.uid("demo"),
        name: role === "admin" ? "Demo Admin" : "Demo Student",
        email,
        pass: "",
        avatar: null,
        role,
        joinedAt: Date.now(),
        bio: "Exploring MathMaster with a demo account.",
        title: role === "admin" ? "Administrator" : "Math Explorer",
      };
      MM.store.addUser(user);
    }
    setSession({ id: user.id, at: Date.now(), demo: true });
    MM.store.user = user;
    return { ok: true, user };
  }

  function logout() {
    setSession(null);
    MM.store.user = null;
  }

  // restore session on load
  function restore() {
    const s = currentSession();
    if (s && s.id) {
      const u = MM.store.users.find((x) => x.id === s.id);
      if (u) {
        MM.store.user = u;
        return u;
      }
      // stale session — clear it
      setSession(null);
    }
    return null;
  }

  function currentUser() {
    // Auto-restore if session exists but store.user is not set yet
    // (fixes race when page scripts run before app.js initGlobal)
    if (!MM.store.user) restore();
    return MM.store.user;
  }
  function isLoggedIn() { return !!currentUser(); }
  function isAdmin() { return currentUser()?.role === "admin"; }

  function requireAuth(redirect = "login.html") {
    if (!isLoggedIn()) {
      MM.toast("Please sign in to continue.", "warning");
      setTimeout(() => (window.location.href = redirect), 800);
      return false;
    }
    return true;
  }
  function requireAdmin(redirect = "../index.html") {
    if (!isAdmin()) {
      MM.toast("Admin access required.", "error");
      setTimeout(() => (window.location.href = redirect), 800);
      return false;
    }
    return true;
  }

  function updateProfile(patch) {
    if (!MM.store.user) return;
    Object.assign(MM.store.user, patch);
    MM.store.updateUser(MM.store.user.id, patch);
  }

  MM.auth = {
    register, login, loginDemo, logout,
    currentUser, isLoggedIn, isAdmin,
    requireAuth, requireAdmin, updateProfile, restore, validateEmail, hash,
  };
})();
