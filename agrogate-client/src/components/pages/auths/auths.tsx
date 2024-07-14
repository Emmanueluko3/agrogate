import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Agrogate from "../../../assets/images/agrogate.png";
import GoogleIcon from "../../../assets/images/GoogleIcon.png";
import Button from "../../atoms/buttons/button";
import Input from "../../atoms/inputs/input";
import SocialButton from "../../atoms/buttons/socialButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { login } from "../../../store/features/auth/authSlice";
import apiService from "../../../api/apiService";
import toast from "react-hot-toast";

interface AuthData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name: string;
  email: string;
  password: string;
}

const Authentication: React.FC = () => {
  // Pathnames
  const location = useLocation();
  const navigate = useNavigate();
  const isSignin = location.pathname === "/signin";
  const isSignup = location.pathname === "/signup";
  const hasAccount = isSignin || !isSignup;
  const socialLogins = [
    { icon: GoogleIcon, name: "Google", text: "Sign in with Google" },
  ];
  // input credentials

  const [isLoading, setIsAuthLoading] = useState<boolean>(false);

  const [authData, setAuthData] = useState<AuthData>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    setAuthData({
      name: "",
      email: "",
      password: "",
    });
    setErrors({
      name: "",
      email: "",
      password: "",
    });
  }, [location, user]);

  const isValidEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData({
      ...authData,
      [name]: value,
    });

    if (value.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} is required`,
      }));
    } else {
      if (name === "email" && !isValidEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Invalid email address",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials = authData;

    let hasErrors = false;
    const newErrors: Partial<Errors> = {};
    Object.keys(authData).forEach((key) => {
      const value = authData[key as keyof AuthData];
      if (value.trim() === "") {
        newErrors[key as keyof Errors] = `${key} is required`;
        hasErrors = true;
      } else if (key === "email" && !isValidEmail(value)) {
        newErrors.email = "Invalid email address";
        hasErrors = true;
      }
    });
    if (hasErrors) {
      setErrors(newErrors as Errors);
      return;
    } else {
      try {
        setIsAuthLoading(true);
        await dispatch(login(credentials));
      } catch (error) {
        console.log("login error", error);
      } finally {
        setIsAuthLoading(false);
      }
    }
  };

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasErrors = false;
    const newErrors: Partial<Errors> = {};
    Object.keys(authData).forEach((key) => {
      const value = authData[key as keyof AuthData];
      if (value.trim() === "") {
        newErrors[key as keyof Errors] = `${key} is required`;
        hasErrors = true;
      } else if (key === "email" && !isValidEmail(value)) {
        newErrors.email = "Invalid email address";
        hasErrors = true;
      }
    });
    if (hasErrors) {
      setErrors(newErrors as Errors);
      return;
    } else {
      try {
        setIsAuthLoading(true);
        const response: any = await apiService(
          "/api/v1/accounts/register",
          "POST",
          authData
        );
        if (response.code || response.data.data) {
          await dispatch(login(authData));
          setAuthData({
            name: "",
            email: "",
            password: "",
          });
          setErrors({
            name: "",
            email: "",
            password: "",
          });

          // dispatch(loginSuccess(response.data.data));
        }
      } catch (error: any) {
        if (error?.response) {
          toast.error(error?.response.data.message);
        }
        console.log("error message", error);
      } finally {
        setIsAuthLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center bg-primary-50 min-h-screen">
      <div className="bg-white w-full drop-shadow-sm border-b border-primary-100 flex justify-center items-center py-6 lg:py-10 lg:mb-20 mb-6">
        <img src={Agrogate} className="mr-4 h-16" alt="Gift" />
        <h3 className="text-primary-700 text-2xl font-bold">AgroGate</h3>
      </div>

      <div className="md:bg-[#fff] lg:px-7 lg:py-8 p-4 rounded-xl w-full lg:w-2/5 md:w-3/5 mb-24">
        <h3 className="text-xl font-bold mb-2 text-primary-600">
          {hasAccount ? "Welcome Back" : "Sign Up"}
        </h3>
        <p className=" text-primary-450 my-4 text-base">
          {hasAccount
            ? "Jump right back into it!"
            : "Create an account to get started"}
        </p>
        <form
          onSubmit={
            hasAccount
              ? (event) => handleSignin(event)
              : (event) => handleSignup(event)
          }
        >
          {!hasAccount && (
            <div className="mb-5 w-full">
              <Input
                label="Name"
                id="name"
                name="name"
                type="text"
                value={authData.name}
                onChange={handleChange}
                disabled={isLoading}
                placeholder="Emmanuel Stephen"
              />
              {errors.name && (
                <p className="text-xs text-red-600 mt-1 h-1">{errors.name}</p>
              )}
            </div>
          )}
          <div className="mb-5 w-full">
            <Input
              label="Email"
              id="email"
              name="email"
              type="text"
              value={authData.email}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="name@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1 h-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-5 w-full">
            <Input
              label="Password"
              id="password"
              type="password"
              value={authData.password}
              onChange={handleChange}
              disabled={isLoading}
              placeholder="••••••••••"
            />

            {errors.password && (
              <p className="text-xs text-red-600 mt-1 h-1">{errors.password}</p>
            )}
          </div>
          {hasAccount ? (
            <div className="mb-6 w-full flex justify-between">
              <div className="flex items-center">
                <Input className="mr-3" type="checkbox" />
                <span className=" text-base text-primary-450 whitespace-nowrap font-medium">
                  Remember me
                </span>
              </div>
              <button className=" text-primaryColor text-base font-medium">
                Forgot password?
              </button>
            </div>
          ) : (
            <div className="mb-6 w-full flex">
              <div className="mr-3 w-4 h-4 flex">
                <Input type="checkbox" />
              </div>
              <span className="text-xs text-primary-450 font-medium">
                By signing up, you are creating a creator’s account, and you
                agree to Agrogate’s{" "}
                <Link to={"/"} className="text-primaryColor">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link to={"/"} className="text-primaryColor">
                  Privacy Policy.
                </Link>
              </span>
            </div>
          )}

          <Button
            className="text-white"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {hasAccount ? "Sign in" : "Sign up"}
          </Button>
        </form>

        <div className="flex items-center w-full my-3">
          <hr className="my-6 border-customLightGrayTwo w-full" />
          <span className="mx-4 text-primary-450 text-base font-medium">
            Or
          </span>
          <hr className="my-6 border-customLightGrayTwo w-full" />
        </div>

        <div className="flex flex-col">
          {socialLogins.map((item, index) => (
            <SocialButton
              key={index}
              className="flex justify-center items-center mb-6 text-sm"
            >
              <img src={item.icon} className="h-5 mr-2" alt="" /> {item.text}
            </SocialButton>
          ))}
        </div>

        <div className="text-base whitespace-nowrap text-primary-450">
          {hasAccount
            ? "Don’t have an account yet? "
            : "Already have an account? "}

          {hasAccount ? (
            <Link
              to="/signup"
              className="text-primaryColor font-semibold text-base"
            >
              Sign up
            </Link>
          ) : (
            <Link
              to="/signin"
              className="text-primaryColor font-semibold text-base"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
