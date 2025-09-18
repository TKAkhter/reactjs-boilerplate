import React from "react";
import LogoLight from "../assets/logo.jpeg";

export const Logo = () => {
  return (
    <>
      <img src={LogoLight} alt="Logo" className="w-50 dark:hidden" />
      <img src={LogoLight} alt="Logo Dark" className="w-50 dark:block hidden" />
    </>
  );
};
