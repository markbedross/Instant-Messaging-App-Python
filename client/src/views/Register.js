import {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth/AuthContext";

function Register() {

    const {register} = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [firstPassword, setFirstPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        register(email, username, firstPassword, secondPassword)
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
                    Sign Up
                  </h5>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      onChange={e=>setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      onChange={e=>setUsername(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example17"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      onChange={e=>setFirstPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form2Example27"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      onChange={e=>setSecondPassword(e.target.value)}
                    />
                  </div>
                  <div className="pt-1 mb-4">
                    <button
                      className="btn btn-dark btn-lg btn-block"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                  <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#393f81" }}>
                      Login
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

export default Register;
