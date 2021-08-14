import React from "react";

const Signin = ({ onRouteChange }) => {
  return (
    <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <form className="measure">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0 white">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6 white-70" htmlFor="email-address">
              Email
            </label>
            <input
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
            onClick={() => onRouteChange("home")}
            className="b ph3 pv2 input-reset ba white bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="lh-copy pointer mt3">
          <p onClick={() => onRouteChange("register")} className="f6 link dim db gray">
            Register
          </p>
        </div>
      </form>
    </article>
  );
};

export default Signin;
