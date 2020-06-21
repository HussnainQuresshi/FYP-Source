import jwtDecode from "jwt-decode";
import http from "./httpService";

const tokenKey = "userToken";
const apiUrl = "/";

export async function login(token) {
  const response = await http.post(apiUrl + "usersignin", token);
  console.log("res", response.data);

  localStorage.setItem(tokenKey, response.data.token);
}
http.setJWT(getjwt());
function getjwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem(tokenKey);
    const { sub: user } = jwtDecode(token);
    return user;
  } catch (error) {
    return null;
  }
}
