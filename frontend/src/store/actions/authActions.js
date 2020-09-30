import axios from "axios";
import JWT from "expo-jwt";
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
  SET_STEP,
  UNSET_ERROR,
  INCOMPLETE_PROFILE,
  SEND_MSG,
} from "../types";

import { setActiveComponent } from "./templateActions";

const expiresIn = 604800;
export const authStart = () => ({ type: AUTH_START });
export const unsetError = () => ({ type: UNSET_ERROR });

function setLocalStorage(temp, token, userId, email, account_type) {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  temp
    ? localStorage.setItem("tempToken", token)
    : localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("email", email);
  localStorage.setItem("expirationDate", expirationDate);
  localStorage.setItem("accountType", account_type);
}

export const authSuccess = (token, userId, userName = "") => {
  return { type: AUTH_SUCCESS, idToken: token, userId, userName };
};

export const authFail = (err) => {
  let error;
  if (err.response) {
    // in case of backend error
    error = err.response.data;
  } else if (err.message) {
    // in case of frontend error
    error = err;
  } else {
    // any other error (e.g: no connection)
    error = { message: "Something wrong happened. Please contact us" };
  }
  //toast.error(error.message ? error.message : error);
  return { type: AUTH_FAIL, error };
};

export const logout = (removeStep = true) => {
  localStorage.clear();
  //document.cookie = "rememberme=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //if (removeStep) localStorage.removeItem("step");
  return { type: AUTH_LOGOUT };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return { type: SET_AUTH_REDIRECT_PATH, path: path };
};

export const authCheckState = () => {
  return (dispatch) => {
    // check if there is a non expired token
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (!token || expirationDate <= new Date()) return dispatch(logout(false));

    const filter = JSON.parse(localStorage.getItem("analytics_filter"));

    const acs = localStorage.getItem("active_components");
    console.log("filter", filter);

    acs && dispatch(setActiveComponent("route", "val", true));

    const userId = localStorage.getItem("userId");
    let payload = JWT.decode(token, process.env.REACT_APP_JWT_SECRET);
    dispatch(authSuccess(token, userId, payload.userName));
    dispatch(
      checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
    );
  };
};

export const authCheckProfile = (token) => {
  console.log("Checking profile");
  return (dispatch) => {
    try {
      let payload = JWT.decode(token, process.env.REACT_APP_JWT_SECRET);
      console.log(`userId: ${payload.userId} && step: ${payload.step}`);
      console.log(
        `customerId: ${payload.customerId} && email: ${payload.email}`
      );
      let step = +payload.step;
      if (step <= 6) {
        setLocalStorage(
          true,
          token,
          payload.userId,
          payload.email,
          payload.account_type
        );
      } else {
        setLocalStorage(
          false,
          token,
          payload.userId,
          payload.email,
          payload.account_type
        );
        dispatch(authSuccess(token, payload.userId, payload.userName));
        dispatch(checkAuthTimeout(expiresIn));
      }
    } catch (err) {
      dispatch(authFail({ message: "Not a valid token" }));
    }
  };
};

function login({ email, password }) {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password };
    let url = `${process.env.REACT_APP_API_URL}/auth/signin`;
    axios
      .post(url, authData)
      .then((response) => {
        let step = +response.data.step;

        if (step <= 6) {
          setLocalStorage(
            true,
            response.data.token,
            response.data.userId,
            email,
            response.data.account_type
          );
        } else {
          setLocalStorage(
            false,
            response.data.token,
            response.data.userId,
            email,
            response.data.account_type
          );
          dispatch(
            authSuccess(
              response.data.token,
              response.data.userId,
              response.data.userName
            )
          );
          dispatch(checkAuthTimeout(expiresIn));
        }
      })
      .catch((err) => dispatch(authFail(err)));
  };
}

export const handleAuthentication = (authType, formData) => {
  switch (authType) {
    case "login":
      return login(formData);

    default:
      return false;
  }
};

export const authCheckResetToken = (token) => {
  console.log("Checking reset token");
  return (dispatch) => {
    dispatch(authStart());
    try {
      let payload = JWT.decode(token, process.env.REACT_APP_JWT_SECRET);
      let change = payload.changePassword;
      console.log("change = ", change);
      console.log("typeof change : ", typeof change);
      if (change) {
        setLocalStorage(true, token, payload.userId, payload.email);
      } else {
        dispatch(authFail({ message: "Not a valid token" }));
      }
    } catch (err) {
      dispatch(authFail({ message: "Not a valid token" }));
    }
  };
};
