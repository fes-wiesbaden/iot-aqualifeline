// src/service/MockAuthService.js
const mockUsers = [
  { username: "test", password: "1234", email: "test@test.com" }
];

export const MockAuthService = {
  login: (username, password) => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      return { success: true, token: "mock-token-123" };
    }
    return { success: false, message: "Invalid username or password" };
  },

  register: (username, password, email) => {
    const exists = mockUsers.find(u => u.username === username);
    if (exists) {
      return { success: false, message: "Username already taken" };
    }
    mockUsers.push({ username, password, email });
    return { success: true, token: "mock-token-123" };
  }
};