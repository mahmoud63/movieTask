import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";

function SignIn({
  error,
  isAuthenticated,
  isLoading,
  authRedirectPath,
  handleAuthentication,
  unsetError,
}) {
  const [formValues, setFormValues] = useState({});
  const handleChange = (e) => {
    //let value = e.target.name === "rememberme" ? e.target.checked : e.target.value;
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    unsetError();
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(formValues);
    handleAuthentication("login", formValues);
  };

  let errorMessage = null;
  if (error) {
    errorMessage = <p className="text-center text-error">{error.message}</p>;
  }

  let authRedirect = null;
  if (isAuthenticated) {
    authRedirect = <Redirect to={authRedirectPath} />;
  }

  return (
    <>
      {authRedirect}
      <div className="d-none d-lg-block col-md-3 imgContent"></div>

      <div className="col-12 col-lg-6 mainContent mb-5 px-0">
        <div className="wrapper">
          <div className="header">
            <p className="main text-truncate">movies</p>
          </div>

          <div className="form">
            <form onSubmit={submitHandler}>
              <div>
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ position: "relative", padding: "0" }}>
                <input
                  name="password"
                  type="password"
                  className="form-control auth-input"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 text-center">
                {!isLoading ? (
                  <input
                    type="submit"
                    value="LOGIN"
                    className="btn auth-login-btn"
                  />
                ) : (
                  <button className="btn auth-login-btn" type="button" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>{" "}
                    Loading...
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
