import { useQuery } from "@tanstack/react-query";
import japaLogo from "../assets/JAPALOGO.png";
import { FaEye, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FourSquare } from "react-loading-indicators";

import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  const [loginState, setLoginState] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [maskedPassword, setMaskedPassword] = useState("");
  const [isMasked, setIsMasked] = useState(true);
  const [logged, setLogged] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (logged === "yes") {
      window.location.href = "/admin";
    }
  }, [logged]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login_call = async (email, password) => {
    try {
      //extract to env..
      setLoading(true);
      const { data } = await axios.post(
        "https://server.japatalent.com/japa/v1/admin/login",
        { email, password }
      );
      if (data.message !== "Invalid details") {
        // console.log(data.data.message);
        sessionStorage.setItem("tokken", JSON.stringify(data.message));
        sessionStorage.setItem("details", JSON.stringify(data.user_data));
        setLogged("yes");
        setLoading(false);
        return data;
      } else {
        toast.error("please your check credentials");
        setLoading(false);
      }
    } catch (ex) {
      console.log(ex);
      setLoading(false);
    }
  };

  const handle_login = () => {
    if ((email !== "") & (password !== "")) {
      login_call(email, password);
    } else {
      console.log("invalid details");
    }
  };

  const LoginOrReset = () => {
    switch (loginState) {
      case 1:
        return (
          <div className="flex flex-row">
            <div className="bg-[#5922A9] flex items-center justify-center h-[100vh] w-[50%]">
              <div className=" ">
                <div>
                  <h1 className="text-white font-popins font-extrabold text-[60px] f">
                    Hello <br /> Japa!
                  </h1>
                  <p className="text-white text-[18px] font-medium">
                    Unlock your potential for global success with <br /> japa
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mx-auto items-center">
              <div>
                <img src={japaLogo} alt="" />
                <h1 className="mt-10 font-medium text-[30px]">Welcome back!</h1>

                <div className="flex flex-col mt-10">
                  <label htmlFor=""> Email: </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <label htmlFor=""> Password: </label>
                  <div className="relative">
                    <input
                      onChange={(e) => handlePasswordChange(e)}
                      className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                      type={isMasked ? "password" : "text"}
                    />
                    {/* <p> {reveal == true ? password : fakePasswordCover} </p> */}
                    <FaEye
                      size="32"
                      onClick={() => setIsMasked(!isMasked)}
                      color="#000000"
                      className="absolute top-5 right-2"
                    />
                  </div>
                  {(email !== "") & (password !== "") ? (
                    <div
                      onClick={handle_login}
                      className="flex flex-row cusor-pointer  text-white items-center justify-center bg-[#5922A9] h-10 mt-10 rounded-[24px]"
                    >
                      <p className="hover:cursor-pointer"> Sign in </p>
                      {loading ? (
                        <FourSquare
                          color="#ffffff"
                          size="small"
                          text=""
                          textColor=""
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <p className="font-light text-sm text-center mt-5 text-red-600">
                      Enter email and password
                    </p>
                  )}

                  <div className="flex  text-white items-center justify-center mt-2 rounded-[24px]">
                    <p
                      onClick={() => setLoginState(2)}
                      className="text-[#5922A9] text-small "
                    >
                      Forgot password ?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row">
            <div className="bg-[#5922A9] flex items-center justify-center h-[100vh] w-[50%]">
              <div className=" ">
                <div>
                  <h1 className="text-white font-popins font-extrabold text-[60px] f">
                    Hello <br /> Japa!
                  </h1>
                  <p className="text-white text-[18px] font-medium">
                    Unlock your potential for global success with <br /> japa
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mx-auto items-center">
              <div>
                <img src={japaLogo} alt="" />
                <FaArrowLeft
                  size="32"
                  onClick={() => setLoginState(1)}
                  color="#000000"
                  className="mt-5"
                />
                <h1 className="mt-10 font-medium text-[30px]">
                  Reset Password
                </h1>
                <p className="text-sm font-light">
                  Forgot your password? Enter your email we'll send you a code
                </p>
                {/* Form input */}
                <div className="flex flex-col mt-10 ">
                  <label htmlFor="" className="font-light">
                    Email:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <div className="flex  text-white items-center justify-center bg-[#5922A9] h-10 mt-10 rounded-[24px]">
                    <p onClick={() => setLoginState(3)}> Reset Password </p>
                  </div>
                  <div className="flex  text-white items-center justify-center mt-2 rounded-[24px]"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row">
            <div className="bg-[#5922A9] flex items-center justify-center h-[100vh] w-[50%]">
              <div className=" ">
                <div>
                  <h1 className="text-white font-popins font-extrabold text-[60px] f">
                    Hello <br /> Japa!
                  </h1>
                  <p className="text-white text-[18px] font-medium">
                    Unlock your potential for global success with <br /> japa
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mx-auto items-center">
              <div>
                <img src={japaLogo} alt="" />
                <FaArrowLeft
                  onClick={() => setLoginState(2)}
                  color="#000000"
                  className="mt-5"
                />
                <h1 className="mt-10 font-medium text-[30px]">
                  Enter Your Code
                </h1>
                <p className="text-sm font-light">
                  We sent a 6-digit code to {email}
                </p>
                {/* Form input */}
                <div className="flex flex-col mt-10 ">
                  <label htmlFor="" className="font-light">
                    Verification code:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <div className="flex  text-white items-center justify-center bg-[#5922A9] h-10 mt-10 rounded-[24px]">
                    <p onClick={() => setLoginState(4)}>Resend Code </p>
                  </div>
                  <div className="flex  text-white items-center justify-center mt-2 rounded-[24px]"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row">
            <div className="bg-[#5922A9] flex items-center justify-center h-[100vh] w-[50%]">
              <div className=" ">
                <div>
                  <h1 className="text-white font-popins font-extrabold text-[60px] f">
                    Hello <br /> Japa!
                  </h1>
                  <p className="text-white text-[18px] font-medium">
                    Unlock your potential for global success with <br /> japa
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mx-auto items-center">
              <div>
                <img src={japaLogo} alt="" />
                <FaArrowLeft
                  size="32"
                  onClick={() => setLoginState(2)}
                  color="#000000"
                  className="mt-5"
                />
                <h1 className="mt-10 font-medium text-[30px]">
                  Create a New Password
                </h1>

                {/* Form input */}
                <div className="flex flex-col mt-10 ">
                  <label htmlFor="" className="font-light">
                    New Password:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                  />
                </div>
                <div className="flex flex-col mt-10 ">
                  <label htmlFor="" className="font-light">
                    Re-enter New Password:
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                  />
                </div>
                <div className="flex flex-col mt-5">
                  <div className="flex  text-white items-center justify-center bg-[#5922A9] h-10 mt-10 rounded-[24px]">
                    <p>Resend Code </p>
                  </div>
                  <div className="flex  text-white items-center justify-center mt-2 rounded-[24px]"></div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return LoginOrReset();
};

export default Login;
