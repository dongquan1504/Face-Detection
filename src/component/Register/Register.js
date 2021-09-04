import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }
  onChangeName = (event) => {
    this.setState({ registerName: event.target.value });
  };
  onChangeEmail = (event) => {
    this.setState({ registerEmail: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ registerPassword: event.target.value });
  };
  onSubmit = () => {
    fetch("https://the-first-server-api-face.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      });
  };
  render() {
    const { onChangeName, onChangeEmail, onChangePassword, onSubmit } = this;
    return (
      <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0 white">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6 white-70" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onChangeName}
              />
            </div>
            <div className="mt3">
              <label
                className="db fw6 lh-copy f6 white-70"
                htmlFor="email-address"
              >
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onChangeEmail}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6 white-70" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={onChangePassword}
              />
            </div>
            <label className="pa0 ma0 lh-copy f6 pointer"></label>
          </fieldset>
          <div className="">
            <input
              onClick={onSubmit}
              className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </article>
    );
  }
}

export default Register;
