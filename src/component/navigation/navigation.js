import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      <p
        onClick={() => onRouteChange("signOut")}
        className="f3 link dim white underline pointer pa3"
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
