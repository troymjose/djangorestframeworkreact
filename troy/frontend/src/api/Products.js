import axios from "axios";
import { PRODUCTS_LIST_URL } from "./Urls";
import { RefreshAccessToken } from "./Token";

const listProducts = async () => {
  let statuscode = 0;
  let data = {};
  try {
    let access = localStorage.getItem("access");
    let headers = { Authorization: "Bearer " + access };
    const response = await axios.get(PRODUCTS_LIST_URL, { headers: headers });
    statuscode = response.status;
    data = response.data;
  } catch (error) {
    statuscode = error.response.status;
  }
  return {
    statuscode: statuscode,
    data: data,
  };
};

export async function ListProducts() {
  const resultWithExistingToken = await listProducts();
  if (resultWithExistingToken.statuscode == 401) {
    const result = await RefreshAccessToken(localStorage.getItem("refresh"));
    if (result.statuscode == 200) {
      const resultWithNewToken = await listProducts();
      return resultWithNewToken;
    } else {
      return {
        statuscode: result.statuscode,
        data: {},
      };
    }
  } else {
    return resultWithExistingToken;
  }
}

const retrieveProducts = async (id) => {
  let statuscode = 0;
  let data = {};
  try {
    let access = localStorage.getItem("access");
    let headers = { Authorization: "Bearer " + access };
    const response = await axios.get(PRODUCTS_LIST_URL + id + "/", {
      headers: headers,
    });
    statuscode = response.status;
    data = response.data;
  } catch (error) {
    statuscode = error.response.status;
  }
  return {
    statuscode: statuscode,
    data: data,
  };
};

export async function RetrieveProducts(id) {
  const resultWithExistingToken = await retrieveProducts(id);
  if (resultWithExistingToken.statuscode === 401) {
    const result = await RefreshAccessToken(localStorage.getItem("refresh"));
    if (result.statuscode === 200) {
      const resultWithNewToken = await retrieveProducts(id);
      return resultWithNewToken;
    } else {
      return {
        statuscode: result.statuscode,
        data: {},
      };
    }
  } else {
    return resultWithExistingToken;
  }
}
