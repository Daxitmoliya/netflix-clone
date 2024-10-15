import { SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, USERLOGINREQ, USERLOGINRES, USERLOGINREJ, LOGOUTREQ, LOGOUTRES, LOGOUTREJ, GOOGLELOGINREQ, GOOGLELOGINREJ, GOOGLELOGINRES } from '../const';

const storedUser = localStorage.getItem('user');

let parsedUser = null;
try {
  parsedUser = storedUser ? JSON.parse(storedUser) : null;
} catch (error) {
  console.error('Error parsing user data:', error);
}
const initialState = {
  isLoading: false,
  isSignUp: false,
  isLogin: !!parsedUser,
  user: parsedUser,
  err: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,  
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignUp: true,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isLoading: false,
        isSignUp: false,
        err: "something went wrong",
      };
    case USERLOGINREQ:
      return {
        ...state,
        isLoading: true,
      };
    case USERLOGINRES:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        isLoading: false,
        isLogin: true,
        user: action.payload,
        err: null,
      };
    case USERLOGINREJ:
      return {
        ...state,
        isLoading: false,
        isLogin: false,
        err: action.payload,
      };
    case LOGOUTREQ:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUTRES:
      localStorage.removeItem('user');
      return {
        ...state,
        isLoading: false,
        user: null,
        isLogin: false,
      };
    case LOGOUTREJ:
      return {
        ...state,
        isLoading: false,
        err: "something went wrong"
      };
      case GOOGLELOGINREQ:
        return {
          ...state,
          isLoading: true,
          err: null,
        };
      case GOOGLELOGINRES:
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
          ...state,
          isLogin: true,
          user: action.payload,
          isLoading: false,
          err: null,
        };
      case GOOGLELOGINREJ:
        return {
          ...state,
          isLoading: false,
          err: "something went wrong",
        };
    default:
      return state;
  }
};

export default authReducer;