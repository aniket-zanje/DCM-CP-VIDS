// ─── VIDS Auth Utility (LocalStorage-based) ───────────────────────────────
// Simple hash function for educational password storage (not production-grade)
const simpleHash = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
};

const USERS_KEY = 'vids_users';
const SESSION_KEY = 'vids_session';

// Get all users from LocalStorage
export const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || {}; }
  catch { return {}; }
};

// Save users to LocalStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
export const registerUser = ({ fullName, username, password }) => {
  const users = getUsers();
  if (users[username]) return { success: false, error: 'User ID already taken. Choose another.' };
  if (!fullName.trim()) return { success: false, error: 'Full name cannot be empty.' };
  if (username.length < 3) return { success: false, error: 'User ID must be at least 3 characters.' };
  if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

  users[username] = {
    fullName: fullName.trim(),
    username: username.trim(),
    passwordHash: simpleHash(password),
    createdAt: new Date().toISOString(),
  };
  saveUsers(users);
  return { success: true };
};

// Login a user
export const loginUser = ({ username, password }) => {
  const users = getUsers();
  const user = users[username];
  if (!user) return { success: false, error: 'No account found with this User ID.' };
  if (user.passwordHash !== simpleHash(password)) return { success: false, error: 'Incorrect password. Try again.' };

  const session = { username: user.username, fullName: user.fullName, loggedInAt: new Date().toISOString() };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session };
};

// Get current session
export const getSession = () => {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
  catch { return null; }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};
