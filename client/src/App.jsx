import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Navbar } from "./components";
import { CampaignDetails, CreateCampaign, Home, Profile } from "./pages";
import LandingPage from "./pages/LandingPage";
import Background from "./assets/background.png";

const App = () => {
  const location = useLocation(); // Get the current path

  return (
    <div className="relative sm:-8 px-12 text-white max-w-screen font-outfit min-h-screen flex flex-row">
      {/* Show background image only on the "/" route */}
      {location.pathname === "/" && (
        <img
          src={Background}
          className="w-full h-full absolute top-0 left-0 opacity-5 -z-50"
          alt=""
        />
      )}

      <div className="sm:flex hidden mr-10 relative"></div>

      <div className="flex-1 max-sm:w-full max-w-screen mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/campaigns" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
