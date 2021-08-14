import React from "react";
import Tilt from "react-tilt";

import brain from './brain.png'
import './logo.css'

const Logo = () => {
  return (
    <div className="ma3 mt0">
      <Tilt
        className="Tilt br2 pointer shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3"> <img style={{padding:'5px'}} alt="logo" src={brain}/> </div>
      </Tilt>
    </div>
  );
};

export default Logo;