import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useStateContext } from "../context";
import { CustomButton } from "./";
import { search, thirdweb } from "../assets";
import Logo from "../assets/bee.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();
  const location = useLocation();

  return (
    <div className="flex flex-wrap items-center justify-between mb-8 gap-6 py-4 lg:flex-col">
      {/* Logo and Buttons Container */}
      <div className="flex w-full justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-4 cursor-pointer">
          <img
            src={Logo}
            alt="logo"
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
          />
          <h3 className="text-xl md:text-2xl font-semibold hidden sm:block">
            <span className="text-primary">Bee</span>The
            <span className="text-primary">Change</span>
          </h3>
        </Link>

        <div className="flex items-center gap-4">
          <CustomButton
            btnType="button"
            title={address ? "Create a campaign" : "Connect"}
            styles="bg-primary max-w-[180px] w-full overflow-hidden"
            handleClick={() => {
              if (address) navigate("create-campaign");
              else connect();
            }}
          />
          <Link to="/profile">
            <div className="hidden sm:flex w-[52px] h-[52px] rounded-full bg-[#2c2f32] justify-center items-center cursor-pointer">
              <img
                src={thirdweb}
                alt="user"
                className="w-[60%] h-[60%] object-contain"
              />
            </div>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`flex items-center gap-2 w-full py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] ${
          location.pathname === "/" ||
          location.pathname.includes("campaign-details")
            ? "hidden"
            : ""
        }`}
      >
        <input
          type="text"
          placeholder="Search for campaigns"
          className="w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-primary flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
