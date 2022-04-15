import React, { useEffect, useState } from "react";

import Image from "next/dist/client/image";
import { FcUnlock } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import InputField from "../components/InputField";
import { loginUser } from "../redux/actions/user";
const initalStateForm = {
  password: "",
  fullName: "",
  confirmPassword: "",
  email: "",
  contact: "",
  role : 0,
}


const Home = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();

  const [form, setForm] = useState(initalStateForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const LoginSubmit = () => {
    const {email,password} = form;
    if (!email) {
      setError('Enter a valid username');
      return;
    }
    if (!password ) {
      setError('Enter a valid password');
      return;
    }
    console.log(email,password);
    dispatch(loginUser({email,password}, setLoading, setError, router));
    



  };
  const RegisterSubmit = ()=>{};


  useEffect(()=>{
    setError('');
  }, [isLogin])

  return (
    <div className="flex justify-between">
      <div className="p-16">
        <div>
          <Image src="/logo.svg" height="40px" width="250px" />
        </div>
        <div className={`${isLogin?'mt-28':'mt-16'}`}>
          <div className="flex space-x-2 items-center">
            <FcUnlock size={36} />
            <div
              className={` ${
                error ? "text-red-600" : "text-black"
              } text-2xl font-semibold`}
            >
              {error
                ? `Error ${isLogin ? "Logging" : "Signing"} In`
                : `${isLogin ? "Login" : "SignUp"}`}
            </div>
          </div>
          <div
            className={`${
              error ? "text-red-600" : "text-black"
            } text-sm mt-3 pl-1`}
          >
            {error
              ? error
              : "Login to find best doctors according to your requirement"}
          </div>

          <div className="mt-10 space-y-5">
            <div className="flex space-x-3">
              {!isLogin && (
                <InputField
                  label="Full Name"
                  type="text"
                  width={510}
                  placeholder="Enter your Full Name"
                  name="fullName"
                  onChange={handleChange}
                  value={form.fullName}
                />
              )}
            </div>

            <div className="flex space-x-3">
              
                <InputField
                  label="Email"
                  type="email"
                  placeholder="Enter your Email"
                  name="email"
                  width={isLogin?370:250}
                  onChange={handleChange}
                  value={form.email}
                />
              
              {!isLogin && (
                <InputField
                  label="Contact"
                  type="text"
                  placeholder="Enter your Phone Number"
                  name="contact"
                  width={250}
                  onChange={handleChange}
                  value={form.contact}
                />
              )}
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor={"role"}
                  className={`block text-sm font-semibold`}
                >
                  Role
                </label>
                <select
                  name="role"
                  id=""
                  value={form.role}
                  onChange={handleChange}
                  className="mt-2  h-[40px] w-[510px] text-sm p-2 rounded-md outline-none"
                >
                  <option value="0">Doctor</option>
                  <option value="1">Patient</option>
                </select>
              </div>
            )}


            



            <div className="flex space-x-3">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your Password"
                name="password"
                width={isLogin ? 370 : 250}
                onChange={handleChange}
                value={form.password}
              />
              {!isLogin && (
                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Re-Enter"
                  name="password"
                  width={isLogin ? 370 : 250}
                  onChange={handleChange}
                  value={form.confirmPassword}
                />
              )}
            </div>
         

            <div>
              <div
                onClick={isLogin?LoginSubmit:RegisterSubmit}
                style={{ width : isLogin?'370px':'510px'}}
                className="mt-7 bg-primary cursor-pointer text-white  h-[37px] hover:bg-purple-500 transition-all flex items-center justify-center rounded-md"
              >
              {loading?'Loading...':(
                isLogin?'Login':'Sign Up'
              )}
              </div>
            </div>
          </div>
          <div className="mt-5 text-sm">
            {isLogin?"Don't have an account ":"Already have an account? "}
            <span className="text-primary transition-all cursor-pointer font-semibold" onClick={()=>setIsLogin(!isLogin)}>{isLogin?'Sign Up':'Login'}</span>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Home;
