import "./App.css";

import { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./component/navigation/navigation";
import Logo from "./component/logo/logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import Signin from "./component/Signin/Signin";
import Register from "./component/Register/Register";

const app = new Clarifai.App({
  apiKey: "1db330cbe0ca437ba06880f192c7a63c",
});

const particlesOption = {
  particles: {
    number: {
      value: 75,
      destiny: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      image: "",
      box: "",
      route: "signin",
      isSignedIn: false,
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const face = document.getElementById("face");
    const width = Number(face.width);
    const height = Number(face.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onButtonSubmit = () => {
    this.setState({ image: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((res) =>
        this.displayFaceBox(this.calculateFaceLocation(res)).catch((err) =>
          console.log(err)
        )
      );
  };
  onRouteChange = (route) => {
    if (route === "signOut") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { route, isSignedIn, image, box } = this.state;
    const { onRouteChange, onInputChange, onButtonSubmit } = this;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <div className="header">
          <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          <Logo />
        </div>
        {route === "home" ? (
          <>
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} image={image} />
          </>
        ) : route === "signin" ? (
          <Signin onRouteChange={onRouteChange} />
        ) : (
          <Register onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
