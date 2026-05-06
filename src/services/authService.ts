import api from "./api";

export type UserRole = "CUSTOMER" | "DRIVER" | "OWNER" | "ADMIN";

export type AppUser = {
  id: string;
  fullName: string;
  name?: string;
  email: string;
  password?: string;
  role: UserRole;
  phone?: string;
  nicNumber?: string;
  nic?: string;
  gender?: string;
  vehicleType?: string;
  vehicleNumber?: string;
};

export type BackendAuthResponse = {
  token: string;
  role: "ADMIN" | "CUSTOMER";
  email: string;
  fullName: string;
};

const USERS_KEY = "food_ordering_users";
const CURRENT_USER_KEY = "food_ordering_current_user";
const TOKEN_KEY = "food_ordering_token";

const defaultUsers: AppUser[] = [
  {
    id: "admin-local-001",
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

  if (!hasAdmin) users = [defaultUsers[0], ...users];
  if (!hasOwner) users = [defaultUsers[1], ...users];

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return users;
}

function saveUsers(users: AppUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function saveAuth(user: Omit<AppUser, "password">, token?: string) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("foodexpress_token", token);
    localStorage.setItem("token", token);
  }
}

function removePassword(user: AppUser): Omit<AppUser, "password"> {
  const { password, ...safeUser } = user;
  return safeUser;
}

function localLogin(email: string, password: string) {
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
  saveAuth(safeUser);

  return safeUser;
}

function localRegister(user: Omit<AppUser, "id">) {
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
  saveAuth(safeUser);

  return safeUser;
}

async function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const localUser = getStoredUsers().find(
    (user) => user.email.toLowerCase() === normalizedEmail
  );

  if (localUser && (localUser.role === "OWNER" || localUser.role === "DRIVER")) {
    return localLogin(email, password);
  }

  if (normalizedEmail === "adithaanusara@gmail.com") {
    return localLogin(email, password);
  }

  try {
    const response = await api.post<BackendAuthResponse>("/auth/signin", {
      email: email.trim(),
      password: password.trim(),
    });

    const data = response.data;

    const safeUser: Omit<AppUser, "password"> = {
      id: data.email,
      fullName: data.fullName,
      name: data.fullName,
      email: data.email,
      role: data.role,
      phone: "N/A",
    };

    saveAuth(safeUser, data.token);
    return safeUser;
  } catch {
    return localLogin(email, password);
  }
}

async function register(user: Omit<AppUser, "id">) {
  if (user.role === "DRIVER" || user.role === "OWNER" || user.role === "ADMIN") {
    return localRegister(user);
  }

  try {
    const response = await api.post<BackendAuthResponse>("/auth/signup", {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      phone: user.phone || "N/A",
    });

    const data = response.data;

    const safeUser: Omit<AppUser, "password"> = {
      id: data.email,
      fullName: data.fullName,
      name: data.fullName,
      email: data.email,
      role: data.role,
      phone: user.phone || "N/A",
    };

    saveAuth(safeUser, data.token);

    const users = getStoredUsers();
    const exists = users.some(
      (savedUser) => savedUser.email.toLowerCase() === data.email.toLowerCase()
    );

    if (!exists) {
      saveUsers([
        ...users,
        {
          id: data.email,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
          phone: user.phone || "N/A",
        },
      ]);
    }

    return safeUser;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data ||
      "Unable to create account.";

    throw new Error(String(message));
  }
}

function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("foodexpress_token");
  localStorage.removeItem("token");
}

function getCurrentUser() {
  return safeJsonParse<Omit<AppUser, "password"> | null>(
    localStorage.getItem(CURRENT_USER_KEY),
    null
  );
}

function getAllUsers(): AppUser[] {
  return getStoredUsers();
}

function getUsersByRole(role: UserRole): AppUser[] {
  return getStoredUsers().filter(
    (user) => user.role.toLowerCase() === role.toLowerCase()
  );
}

async function signIn(data: { email: string; password: string }) {
  return login(data.email, data.password);
}

async function signUp(data: Omit<AppUser, "id">) {
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