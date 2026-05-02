import { SignInData, SignUpData, User } from "../types";

const USERS_KEY = "food_ordering_users";
const CURRENT_USER_KEY = "food_ordering_current_user";

const ownerUser: User & { password: string } = {
  id: 1,
  fullName: "Restaurant Owner",
  email: "owner@food.com",
  password: "owner123",
  role: "OWNER",
};

function getStoredUsers(): Array<User & { password: string }> {
  const users = localStorage.getItem(USERS_KEY);

  if (!users) {
    localStorage.setItem(USERS_KEY, JSON.stringify([ownerUser]));
    return [ownerUser];
  }

  const parsedUsers = JSON.parse(users) as Array<User & { password: string }>;

  const hasOwner = parsedUsers.some((user) => user.email === ownerUser.email);

  if (!hasOwner) {
    const updatedUsers = [ownerUser, ...parsedUsers];
    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return updatedUsers;
  }

  return parsedUsers;
}

function saveUsers(users: Array<User & { password: string }>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const authService = {
  signUp(data: SignUpData): User {
    const users = getStoredUsers();

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === data.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const newUser: User & { password: string } = {
      id: Date.now(),
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      role: data.role,
      nicNumber: data.nicNumber,
      gender: data.gender,
      phone: data.phone,
      vehicleType: data.vehicleType,
      vehicleNumber: data.vehicleNumber,
    };

    users.push(newUser);
    saveUsers(users);

    const userWithoutPassword: User = {
      id: newUser.id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      nicNumber: newUser.nicNumber,
      gender: newUser.gender,
      phone: newUser.phone,
      vehicleType: newUser.vehicleType,
      vehicleNumber: newUser.vehicleNumber,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  signIn(data: SignInData): User {
    const users = getStoredUsers();

    const user = users.find(
      (storedUser) =>
        storedUser.email.toLowerCase() === data.email.toLowerCase() &&
        storedUser.password === data.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const userWithoutPassword: User = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      nicNumber: user.nicNumber,
      gender: user.gender,
      phone: user.phone,
      vehicleType: user.vehicleType,
      vehicleNumber: user.vehicleNumber,
    };

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));

    return userWithoutPassword;
  },

  getCurrentUser(): User | null {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
};