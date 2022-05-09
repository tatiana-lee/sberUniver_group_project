import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/assets/logo.png";

export const Logo = ({ className, href, ...props }) => {
  return (
    <Link to="/" className={className ? className : "logo"} {...props}>
      <img src={logo} alt="logo" className="logo__pic" />
    </Link>
  );
};

export default Logo;
