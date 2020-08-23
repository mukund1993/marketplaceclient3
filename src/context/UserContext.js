import React from "react";
import API from '../services'
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, ...action.value };
    case "VALIDATE_LOGIN":
      return { ...state, isAuthenticated: true, ...action.value };
    case "OPEN_OTP": {
      console.log(state)
      return { ...state, isAuthenticated: false, ...action.value };
    }
    case "CLEAR_OTP":
      return { ...state, isAuthenticated: false, ...action.value };
    case "VALIDATE_REGISTER":
      return { ...state, isAuthenticated: true, ...action.value };
    case "REGISTER_SUCCESS":
      return { ...state, isAuthenticated: false, ...action.value };
    case "REGISTER_FAILURE":
      return { ...state, isAuthenticated: false, ...action.value };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, ...action.value };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false, ...action.value };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: false,
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, validateOTP, registerUser, updateProfile };

async function loginUser(dispatch, email, phoneNumber, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  try {
    const response = await API.userLogin({email, phone:phoneNumber})
    if (response) {
    setTimeout(() => {
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS', value: {
          email,
          phoneNumber
        } })
        history.push('/dashboard')
      }, 2000);
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);  
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}

async function registerUser(dispatch, email, phoneNumber, firstName, lastName, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  localStorage.setItem('profile', JSON.stringify({email, phone: phoneNumber, firstName, lastName}))
  const response = await API.userProfileNew({email, phone: phoneNumber, firstName, lastName})
  if (response) {
    setTimeout(() => {
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'OPEN_OTP', value: {
        email,
        phoneNumber,
        firstName,
        lastName,
      } })
      history.push('/otp')
    }, 2000);
  }
}

async function validateOTP(dispatch, otp, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  try {
    if (!!otp) {
      const localData = localStorage.getItem('profile')
      const user = JSON.parse(localData)
      console.log(user,localData,otp);
      const response = await API.verifyOTP({email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phoneNumber, token:otp})
      setTimeout(() => {
        setError(null)
        setIsLoading(false)
        dispatch({ type: 'LOGIN_SUCCESS' , value: {
          otp
        } })
        history.push('/dashboard')
      }, 2000);
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
      setIsLoading(false);
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
  }
}


async function updateProfile(dispatch, profile) {
  try {
    if (!!profile) {
      const response = await API.registerProvider(profile)
    }
  } catch (error) {

  }
}



function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}