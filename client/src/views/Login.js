import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

function Login(props) {

    const {login} = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()

        const email = e.target.email.value
        const password = e.target.password.value

        email.length > 0 && login(email, password)

        console.log(email, password)
    }

  return (
    <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <h5
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: 1 }}
                  >
                    Login
                  </h5>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="emailform"
                      className="form-control form-control-lg"
                      name="email"
                    />
                    <label className="form-label" htmlFor="emailform">
                      Email address
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="passwordform"
                      className="form-control form-control-lg"
                      name="password"
                    />
                    <label className="form-label" htmlFor="passwordform">
                      Password
                    </label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <a className="small text-muted" href="#!">
                    Forgot password?
                  </a>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Don't have an account?&nbsp;
                    <Link to="/register" style={{ color: "#393f81" }}>
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
