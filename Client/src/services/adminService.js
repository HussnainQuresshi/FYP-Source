import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "token";
const apiUrl = "/";

http.setJWT(getjwt());

function getjwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(data) {
  const response = await http.post(apiUrl + "adminsignin", data);
  localStorage.setItem(tokenKey, response.data.token);
}

export function updateToken(token) {
  localStorage.setItem(tokenKey, token);
}

export function getCurrentAdmin() {
  try {
    const token = localStorage.getItem(tokenKey);
    const { sub: admin } = jwtDecode(token);
    return admin;
  } catch (error) {
    return null;
  }
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}
