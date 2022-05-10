import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/logo.svg";

export const Logo = ({ className, href, ...props }) => {
  return (
    <Link to="/" className={className ? className : "logo"} {...props}>
      <img src={logo} alt="logo" className="logo__pic" width={60} />
    </Link>
  );
};

export default Logo;
