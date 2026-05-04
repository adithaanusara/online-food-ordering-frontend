export type UserRole = "CUSTOMER" | "DRIVER" | "OWNER" | "ADMIN";

export type AppUser = {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  nicNumber?: string;
  nic?: string;
  gender?: string;
  vehicleType?: string;
  vehicleNumber?: string;
};

const USERS_KEY = "food_ordering_users";
const CURRENT_USER_KEY = "food_ordering_current_user";

const defaultUsers: AppUser[] = [
  {
    id: "admin-001",
    fullName: "Aditha Admin",
    email: "adithaanusara@gmail.com",
    password: "123456",
    role: "ADMIN",
    phone: "N/A",
  },
  {
    id: "owner-001",
    fullName: "FoodExpress Owner",
    email: "owner@food.com",
    password: "123456",
    role: "OWNER",
    phone: "N/A",
  },
];

function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function getStoredUsers(): AppUser[] {
  let users = safeJsonParse<AppUser[]>(localStorage.getItem(USERS_KEY), []);

  const hasAdmin = users.some(
    (user) => user.email.toLowerCase() === "adithaanusara@gmail.com"
  );

  const hasOwner = users.some(
    (user) => user.email.toLowerCase() === "owner@food.com"
  );

  if (!hasAdmin) {
    users = [defaultUsers[0], ...users];
  }

  if (!hasOwner) {
    users = [defaultUsers[1], ...users];
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
}

function saveUsers(users: AppUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function removePassword(user: AppUser) {
  const { password, ...safeUser } = user;
  return safeUser;
}

function login(email: string, password: string) {
  const users = getStoredUsers();

  const user = users.find(
    (savedUser) =>
      savedUser.email.toLowerCase() === email.trim().toLowerCase() &&
      savedUser.password === password.trim()
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const safeUser = removePassword(user);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return safeUser;
}

function register(user: Omit<AppUser, "id">) {
  const users = getStoredUsers();

  const emailExists = users.some(
    (savedUser) => savedUser.email.toLowerCase() === user.email.toLowerCase()
  );

  if (emailExists) {
    throw new Error("Email already exists.");
  }

  const newUser: AppUser = {
    ...user,
    id: `${user.role.toLowerCase()}-${Date.now()}`,
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  const safeUser = removePassword(newUser);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(safeUser));

  return safeUser;
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function getCurrentUser() {
  return safeJsonParse(localStorage.getItem(CURRENT_USER_KEY), null);
}

function getAllUsers(): AppUser[] {
  return getStoredUsers();
}

function getUsersByRole(role: UserRole): AppUser[] {
  return getStoredUsers().filter(
    (user) => user.role.toLowerCase() === role.toLowerCase()
  );
}

function signIn(data: { email: string; password: string }) {
  return login(data.email, data.password);
}

function signUp(data: Omit<AppUser, "id">) {
  return register(data);
}

function signOut() {
  return logout();
}

export const authService = {
  login,
  register,
  logout,
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  getAllUsers,
  getUsersByRole,
};