import React, { Component } from "react";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    };
  }
  onChangeEmail = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ signInPassword: event.target.value });
  };
  onSubmit = () => {
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((res) => res.json())
      .then(user => {
        if(user.id){ // does the user exist? Did we receive a user with a property of id?
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
  };
  render() {
    const { onRouteChange } = this.props;
    const { onSubmit, onChangeEmail, onChangePassword } = this;
    return (
      <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6 white-70"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                onChange={onChangeEmail}
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white-70" htmlFor="password">
                Password
              </label>
              <input
                onChange={onChangePassword}
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"></label>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmit}
              className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign in"
            />
          </div>
          <div className="lh-copy pointer mt3">
            <p
              onClick={() => onRouteChange("register")}
              className="f6 link dim db gray"
            >
              Register
            </p>
          </div>
        </div>
      </article>
    );
  }
}

export default Signin;
