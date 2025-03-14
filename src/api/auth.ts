const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData: { name: string; email: string; password: string }) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Login User
export const loginUser = async (userData: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return response.json();
};

// Save JWT Token
export const saveToken = (token: string) => {
  localStorage.setItem("authToken", token);
};

// Get JWT Token
export const getToken = () => {
  return localStorage.getItem("authToken");
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("authToken");
};
