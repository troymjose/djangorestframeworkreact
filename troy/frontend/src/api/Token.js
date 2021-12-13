import axios from "axios";
import { TOKEN_URL, TOKEN_REFRESH_URL } from "./Urls";

export async function GetAccessToken(username, password) {
  let statuscode = 0;
  let message = "";
  try {
    const body = { username: username, password: password };
    const response = await axios.post(TOKEN_URL, body);
    statuscode = response.status;
    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  } catch (error) {
    let statuscode = error.response.status;
    if (statuscode == 401) {
      message = "No active account found with the given credentials";
    } else if (statuscode == 400) {
      message = "Username & Password fields cannot be blank";
    } else if (statuscode == 501) {
      message = "Internal server error";
    }
  }
  return {
    statuscode: statuscode,
    message: message,
  };
}

export async function RefreshAccessToken(refresh) {
  let statuscode = 0;
  try {
    const body = { refresh: refresh };
    const response = await axios.post(TOKEN_REFRESH_URL, body);
    statuscode = response.status;
    if (statuscode === 200)
      localStorage.setItem("access", response.data.access);
  } catch (error) {
    statuscode = error.response.status;
  }
  return {
    statuscode: statuscode,
  };
}
