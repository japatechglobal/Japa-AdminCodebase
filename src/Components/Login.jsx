import { useEffect, useState } from "react";
import japaLogo from "../assets/JAPALOGO.png";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { FourSquare } from "react-loading-indicators";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [loginState, setLoginState] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMasked, setIsMasked] = useState(true);
  const [logged, setLogged] = useState("");
  const [loading, setLoading] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (logged === "yes") {
      window.location.href = "/admin";
    }
  }, [logged]);

  const login_call = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://server.japatalent.com/japa/v1/admin/login",
        { email, password }
      );
      if (data.message !== "Invalid details") {
        sessionStorage.setItem("tokken", JSON.stringify(data.message));
        sessionStorage.setItem("details", JSON.stringify(data.user_data));
        setLogged("yes");
      } else {
        toast.error("Please check your credentials");
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const handle_login = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      login_call(email, password);
    } else {
      toast.error("Enter both email and password");
    }
  };

  const LeftPanel = () => (
    <div className="bg-[#5922A9] flex items-center justify-center h-[100vh] w-[50%]">
      <div>
        <h1 className="text-white font-popins font-extrabold text-[60px]">
          Hello <br /> Japa!
        </h1>
        <p className="text-white text-[18px] font-medium">
          Unlock your potential for global success with <br /> japa
        </p>
      </div>
    </div>
  );

  const renderRightPanel = () => {
    switch (loginState) {
      case 1:
        return (
          <form onSubmit={handle_login} className="flex mx-auto items-center">
            <div>
              <img src={japaLogo} alt="logo" />
              <h1 className="mt-10 font-medium text-[30px]">Welcome back!</h1>
              <div className="flex flex-col mt-10">
                <label>Email:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="p-2 border-2 w-[441px] rounded-md mt-2"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label>Password:</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border-2 w-[441px] rounded-md mt-2 pr-10"
                    type={isMasked ? "password" : "text"}
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setIsMasked(!isMasked)}
                  >
                    {isMasked ? <FaEyeSlash size="20" /> : <FaEye size="20" />}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-10 flex items-center justify-center bg-[#5922A9] text-white h-10 rounded-[24px]"
                disabled={loading}
              >
                {loading ? <FourSquare color="#fff" /> : "Sign in"}
              </button>
              <p
                onClick={() => setLoginState(2)}
                className="text-[#5922A9] text-sm mt-2 text-center cursor-pointer"
              >
                Forgot password ?
              </p>
            </div>
          </form>
        );
      case 2:
        return (
          <div className="flex mx-auto items-center">
            <div>
              <img src={japaLogo} alt="logo" />
              <FaArrowLeft
                onClick={() => setLoginState(1)}
                className="mt-5 cursor-pointer"
              />
              <h1 className="mt-10 font-medium text-[30px]">Reset Password</h1>
              <p className="text-sm font-light">
                Enter your email, we'll send you a code
              </p>
              <div className="flex flex-col mt-10">
                <label>Email:</label>
                <input
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  type="email"
                  className=" p-2 border-2 w-[441px] rounded-md mt-2"
                />
              </div>
              <button
                onClick={() => setLoginState(3)}
                className="w-full mt-10 bg-[#5922A9] text-white h-10 rounded-[24px]"
              >
                Reset Password
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex mx-auto items-center">
            <div>
              <img src={japaLogo} alt="logo" />
              <FaArrowLeft
                onClick={() => setLoginState(2)}
                className="mt-5 cursor-pointer"
              />
              <h1 className="mt-10 font-medium text-[30px]">Enter Your Code</h1>
              <p className="text-sm font-light">
                We sent a 6-digit code to {resetEmail}
              </p>
              <div className="flex flex-col mt-10">
                <label>Verification code:</label>
                <input
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  type="text"
                  className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                />
              </div>
              <button
                onClick={() => setLoginState(4)}
                className="w-full mt-10 bg-[#5922A9] text-white h-10 rounded-[24px]"
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex mx-auto items-center">
            <div>
              <img src={japaLogo} alt="logo" />
              <FaArrowLeft
                onClick={() => setLoginState(2)}
                className="mt-5 cursor-pointer"
              />
              <h1 className="mt-10 font-medium text-[30px]">
                Create a New Password
              </h1>
              <div className="flex flex-col mt-10">
                <label>New Password:</label>
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                />
              </div>
              <div className="flex flex-col mt-5">
                <label>Re-enter New Password:</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="h-[60px] p-2 border-2 w-[441px] rounded-md mt-2"
                />
              </div>
              <button className="w-full mt-10 bg-[#5922A9] text-white h-10 rounded-[24px]">
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row">
      <LeftPanel />
      {renderRightPanel()}
    </div>
  );
};

export default Login;
