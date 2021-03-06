import React from "react";

import "./navigation.css"

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav className='white pa3' style={{ display: "flex", justifycontent: "flex-end", alignItems:"center"}}>
      <p className='mdl2-contact dim ma2 pointer'/>
      <p
        onClick={() => onRouteChange("signOut")}
        className="f3 link dim underline pointer"
      >
        Sign Out
      </p>
    </nav>
  ) : (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange("signin")}
        className="f3 link dim white underline pointer pa3"
      >
        Sign In
      </p>
      <p
        onClick={() => onRouteChange("register")}
        className="f3 link dim white underline pointer pa3"
      >
        Register
      </p>
    </nav>
  );
};
export default Navigation;
