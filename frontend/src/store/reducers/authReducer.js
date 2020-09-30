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

const initialState = {
  token: null,
  userId: null,
  userName: "",
  error: null,
  loading: false,
  isLoggedIn: false,
  authRedirectPath: "/auth",
  currentStep: 0,
  isNotComplete: false,
  successMsg: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
        isLoggedIn: false,
        successMsg: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        userName: action.userName ? action.userName : "",
        error: null,
        loading: false,
        isNotComplete: false,
        isLoggedIn: true,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        isLoggedIn: false,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        isLoggedIn: false,
      };
    case SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.path,
      };
    case UNSET_ERROR:
      return {
        ...state,
        error: null,
        successMsg: null,
      };

    default:
      return state;
  }
};

export default reducer;
