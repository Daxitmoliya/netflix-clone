  import { initializeApp } from "firebase/app";
  import { getFirestore, collection, addDoc, getDocs, getDoc, doc , deleteDoc } from "firebase/firestore";
  import { ADD_ADMIN_REJECT, ADD_ADMIN_REQUEST, ADD_DATA, DELETE_ADMIN, DELETE_ADMIN_REJECT, DELETE_ADMIN_REQUEST, FAILURE_DATA, RECEIVE_DATA, REQUEST_DATA, SINGLE_ADMIN_RECEIVE, SINGLE_ADMIN_REJECT, SINGLE_ADMIN_REQUEST } from "../const";

  const firebaseConfig = {
    apiKey: "AIzaSyBCA5iqUazTW5oERpf8kS-e8p8-u6U_KAQ",
    authDomain: "fir-pro-f1028.firebaseapp.com",
    projectId: "fir-pro-f1028",
    storageBucket: "fir-pro-f1028.appspot.com",
    messagingSenderId: "311588339596",
    appId: "1:311588339596:web:b33d1ff9ef6d3312efe0a9"
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app); 

  export const addAdminRequest = () => ({
    type: ADD_ADMIN_REQUEST,
  });
  
  export const addData = (data) => ({
    type: ADD_DATA,
    payload: data,
  });
  
  export const addAdminReject = (error) => ({
    type: ADD_ADMIN_REJECT,
    payload: error,
  });
  
  export const addadmin = (data) => {
    return (dispatch) => {
      dispatch(addAdminRequest());
  
      addDoc(collection(db, "servicies"), data)
        .then((res) => {
          console.log(res);
          dispatch(fetchData());
        })
        .catch((error) => {
          console.log(error);
          dispatch(addAdminReject(error));
        });
    };
  };
  
  export const requestData = () => ({
    type: REQUEST_DATA,
  });
  
  export const receiveData = (data) => ({
    type: RECEIVE_DATA,
    payload: data,
  });
  
  export const failureData = (error) => ({
    type: FAILURE_DATA,
    payload: error,
  });
  
  export const fetchData = () => {
    return (dispatch) => {
      let arr = [];
      dispatch(requestData());
      getDocs(collection(db, "servicies"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            console.log("da", doc.data());
            arr = [...arr, { id: doc.id, ...doc.data() }];
          });

          dispatch(receiveData(arr));
        })
        .catch((error) => {
          console.log(error);
          dispatch(failureData(error));
        });
    };
  };
  
  export const singleAdminRequest = () => ({
    type: SINGLE_ADMIN_REQUEST,
  });
  
  export const singleAdminReceive = (data) => ({
    type: SINGLE_ADMIN_RECEIVE,
    payload: data,
  });
  
  export const singleAdminReject = () => ({
    type: SINGLE_ADMIN_REJECT,
    payload: "Document not found", 
  });
  
  export const singleadd = (adminId) => {
    return dispatch => {
      dispatch(singleAdminRequest());
  
      const docRef = doc(db, "services", adminId);
      getDoc(docRef)
        .then((single) => {
          if (single.exists()) {
            const singlerec = { id: single.id, ...single.data() };
            console.log(singlerec);
            dispatch(singleAdminReceive(singlerec));
          } else {
            dispatch(singleAdminReject());
          }
        })
        .catch((error) => {
          console.log('Fetch Single Record Error:', error);
          dispatch(singleAdminReject());
        });
    };
  };
  
  export const deleteAdminRequest = () => ({
    type: DELETE_ADMIN_REQUEST,
  });
  
  export const deleteAdminReject = (error) => ({
    type: DELETE_ADMIN_REJECT,
    payload: error,
  });
  
  export const deleteAdminSuccess = (adminId) => ({
    type: DELETE_ADMIN,
    payload: { id: adminId },
  });
  
  export const deleteAdmin = (adminId) => {
    return(dispatch) => {
      dispatch(deleteAdminRequest());
  
      const docRef = doc(db, "servicies", adminId);
  
      deleteDoc(docRef)
        .then(() => {
          console.log("Document successfully deleted!");
          dispatch(deleteAdminSuccess(adminId));
          dispatch(fetchData());
        })
        .catch((error) => {
          console.error("Error deleting document:", error);
          dispatch(deleteAdminReject(error));
        });
    };
  };
  
  
 
  