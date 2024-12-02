import React from "react";
import BannerDark from "../assets/banner-dark.png";
import Logo from "../assets/logo.png";
import { useLogin } from "../hooks/useLogin";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const { register, handleSubmit, onSubmit, errors } = useLogin();
  const history = useHistory();

  return (
    <section className="h-svh bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 mx-auto">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap pt-10 md:pt-0">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img className="mx-auto w-48" src={Logo} alt="logo" />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">Welcome!</h4>
                    </div>
                    <div className="login-container">
                      <h1>Login</h1>
                      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
                        <div>
                          <label>Email:</label>
                          <input {...register("email")} placeholder="Email" />
                          {errors.email && <p className="error">{errors.email.message}</p>}
                        </div>

                        <div>
                          <label>Password:</label>
                          <input {...register("password")} type="password" placeholder="Password" />
                          {errors.password && <p className="error">{errors.password.message}</p>}
                        </div>

                        <button type="submit">Login</button>
                      </form>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Dont have an account?</p>
                        <button
                          onClick={() => history.push("/register")}
                          type="button"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{ backgroundImage: `url(${BannerDark})` }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
