import "./App.css";

import { Component } from "react";
import Particles from "react-particles-js";

import Navigation from "./component/navigation/navigation";
import Logo from "./component/logo/logo";
import ImageLinkForm from "./component/ImageLinkForm/ImageLinkForm";
import Rank from "./component/Rank/Rank";
import FaceRecognition from "./component/FaceRecognition/FaceRecognition";
import Signin from "./component/Signin/Signin";
import Register from "./component/Register/Register";

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
      user: {
        id: "",
        name: "",
        password: "",
        email: "",
        entries: 0,
        joined: "",
      },
    };
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };
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
    if (this.state.image !== "") {
      fetch("https://the-first-server-api-face.herokuapp.com/imageUrl", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: this.state.input,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            fetch("https://the-first-server-api-face.herokuapp.com/image", {
              method: "put",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: this.state.user.id,
              }),
            })
              .then((resp) => resp.json())
              .then((count) => {
                this.setState(
                  Object.assign(this.state.user, { entries: count })
                );
              });
          }
          this.displayFaceBox(this.calculateFaceLocation(res));
        });
    }
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
    // const {name, entries}=this.state.user;
    const { onRouteChange, onInputChange, onButtonSubmit, loadUser } = this;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOption} />
        <div className="header">
          <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
          <Logo />
        </div>
        {route === "home" ? (
          <>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} image={image} />
          </>
        ) : route === "signin" ? (
          <Signin loadUser={loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
