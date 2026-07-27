const USERS_KEY = "siftSimmerUsers";
const SESSION_KEY = "siftSimmerSession";

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function loadUsers() {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function registerUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = loadUsers();

  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await hashPassword(password);
  users.push({ email: normalizedEmail, passwordHash });
  saveUsers(users);

  return { email: normalizedEmail };
}

export async function loginUser(email, password) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = loadUsers();
  const user = users.find((candidate) => candidate.email === normalizedEmail);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    throw new Error("Invalid email or password.");
  }

  const session = { email: normalizedEmail };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}

export function getStoredSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
}

export const SESSION_STORAGE_KEY = SESSION_KEY;
