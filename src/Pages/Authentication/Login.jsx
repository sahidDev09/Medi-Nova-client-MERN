import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { PiSpinnerBallFill } from "react-icons/pi";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { loading, setLoading, signIn } = useAuth();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await signIn(email, password);
      toast.success("Login Successfull");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        "Something went wrong, Check email and password and try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Helmet>Medinova-Login</Helmet>
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-blue-50 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-[#473288]">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLoginSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div className=" relative">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-[#8F85DD] bg-gray-200 text-gray-900"
              />
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? (
                  <FaEyeSlash className="absolute right-2 top-1/2 transform translate-y-1/4 text-lg" />
                ) : (
                  <FaEye className="absolute right-2 top-1/2 transform translate-y-1/4 text-lg" />
                )}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#8F85DD] w-full rounded-md py-3 text-white">
              {loading ? (
                <PiSpinnerBallFill className=" mx-auto text-xl animate-spin" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Do not have an account yet?
          <Link
            to="/register"
            className="hover:underline hover:text-rose-500 text-gray-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
