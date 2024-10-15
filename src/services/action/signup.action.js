import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider } from 'firebase/auth';
import { GOOGLELOGINREJ, GOOGLELOGINREQ, GOOGLELOGINRES, LOGOUTREJ, LOGOUTREQ, LOGOUTRES, SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, USERLOGINREJ, USERLOGINREQ, USERLOGINRES } from '../const';
import {auth, provider} from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';

export const signupreq = () => ({
  type: SIGN_UP_REQUEST,
});

export const signupsucc = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: user,
});

export const signuperr = (error) => ({
  type: SIGN_UP_ERROR,
});

export const loginreq = () => ({
  type: USERLOGINREQ,
});

export const loginres = (userData) => {
  localStorage.setItem('user', JSON.stringify(userData));
  return {
    type: USERLOGINRES,
    payload: userData,
  };
};

export const loginrej = (err) => ({
  type: USERLOGINREJ,
  payload: err,
});

export const logoutreq = () => ({
  type: LOGOUTRES,
});

export const logoutres = () => {
  localStorage.removeItem('user');
  return {
    type: LOGOUTRES,
  };
};
export const logoutrej = (err) => ({
  type: LOGOUTREJ,
});

export const googlereq = () => ({
  type: GOOGLELOGINREQ,
});

export const googleres = (data) => ({
  type: GOOGLELOGINRES,
  payload:data,
});

export const googlerej = (err) => ({
  type: GOOGLELOGINREJ,
});

export const userCreate = (email, password) => {
  return async dispatch => {
      
      dispatch(signupreq());

      await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              const user = userCredential.user;
              console.log("user", user);
              dispatch(signupsucc());
          })
          .catch((err) => {
              console.log("something went wrong", err);
              dispatch(signuperr());
          });
  };
};

export const loginuser = (email, password) => {
  return (dispatch) => {
    dispatch(loginreq());

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        dispatch(loginres());
      })
      .catch((error) => {
        let err = null;
        const errorCode = error.code;
        const errorMessage = error.message;

        if ("auth/missing-email" === errorCode) {
          err = "Email is missing or empty";
        }

        console.log("errrr", error);
        dispatch(loginrej(err));
      });
  };
};



export const logoutuser = () => {
  return (dispatch) => {
    dispatch(logoutreq());

    return signOut(auth)
      .then(() => {
        dispatch(logoutres());
        localStorage.removeItem('user');
        navigate('/');
      })
      .catch((err) => {
        console.error("Error logging out:", err);
        dispatch(logoutrej());
      });
  };
};

  export const googlelogin = () => {
    return (dispatch) => {
      dispatch(googlereq())
      signInWithPopup(auth,provider).then((res)=>{
        console.log("res",res.user);
        dispatch(googleres(res.user))
      }).catch((err)=>{
        console.log(err);
        dispatch(googlerej())
      })
    };
  };