import React, { useState } from "react";
import pb from "../lib/pocketbase";
import { useForm } from "react-hook-form";
import useLogout from "../hooks/useLogout";
import useLogin from "../hooks/useLogin";
import useVerified, { requestVerfication } from "../hooks/useVerified";
import useRegister from "../hooks/useRegister";
export default function Auth() {
  //Hooks
  const logout = useLogout();
  const { data: isVerified } = useVerified();
  const { mutate : login , isLoading: loginLoading, isError: loginError } = useLogin();
  const { mutate: signUp, isLoading: registerLoading, isError: registerError } = useRegister();
  //React-Hook-Form
  const { register: loginForm, handleSubmit, reset } = useForm();

  const [formState, setFormState] = useState(false);

  const isLoggedIn = pb.authStore.isValid;

  async function onSubmitLogin(data: any) {
    console.log(data);
    login({ email: data.email, password: data.password });
    reset();
  }

  async function onSubmitRegister(data: any) {
    console.log(data);
    if(data.password !== data.confirmPassword) {
      alert("Password and ConfirmPassword Are not same")
      return;
    }
    signUp({ email: data.email, password: data.password });
    setFormState(false);
    reset();
  }

  if (isLoggedIn) {
    return (
      <>
        <h1> Logged In: {pb.authStore.model?.email}</h1>
        <p>Verified : {isVerified}</p>
        {!isVerified && <button onClick={requestVerfication}>Send Verfication Mail</button>}
        <button onClick={logout}>Log Out</button>
      </>
    );
  }

  if(!isLoggedIn && !formState){
    return (
      <>
      <button onClick={() => {setFormState(!formState)}}>Change Form</button>
      {loginLoading && <p>Loading ...</p>}
      {loginError && <p style={{ color: "red" }}>Invalid email and Password</p>}

      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmitLogin)}>
        <input
          type='email'
          id='email'
          placeholder='Email'
          {...loginForm("email")}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          {...loginForm("password")}
        />
        <button type='submit' disabled={loginLoading}>
          {loginLoading ? "Loading" : "Login"}
        </button>
      </form>
    </>
    );
  } else if (!isLoggedIn && formState) {
    return (
      <>
      <button onClick={() => {setFormState(!formState)}}>Change Form</button>
      {registerLoading && <p>Loading ...</p>}
      {registerError && <p style={{ color: "red" }}>Invalid email and Password</p>}

      <h1>Please Register</h1>
      <form onSubmit={handleSubmit(onSubmitRegister)}>
        <input
          type='email'
          id='email'
          placeholder='Email'
          {...loginForm("email")}
        />
        <input
          type='password'
          id='password'
          placeholder='Password'
          {...loginForm("password")}
        />
        <input
          type='password'
          id='Confirmpassword'
          placeholder='Confirm Password'
          {...loginForm("confirmPassword")}
        />
        <button type='submit' disabled={registerLoading}>
          {registerLoading ? "Loading" : "Register"}
        </button>
      </form>
    </>
    );
  }
}
