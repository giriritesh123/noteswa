import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [credentials, setCredentials] = useState({
    name: "",
    
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (password === cpassword && json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authToken);
      navigate("/home");
    } else {
      alert("Please confirm your password");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container w-50">
        <form
          style={{
            marginTop: "100px",
          }}
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label className="mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              name="name"
              onChange={onChange}
              autoComplete="off"
              aria-describedby="emailHelp"
              placeholder="Name"
              required
            />
          </div>
          <div className="form-group">
            <label className="mb-1" htmlFor="email">
              Email address
            </label>
            <input
              type="email"
              className="form-control mb-2"
              id="email"
              name="email"
              onChange={onChange}
              autoComplete="off"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control mb-2"
              id="password"
              name="password"
              onChange={onChange}
              aria-describedby="emailHelp"
              placeholder="Password"
              autoComplete="off"
              minLength={7}
              required
            />
          </div>
          <div className="form-group">
            <label className="mb-1" htmlFor="cpassword">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control mb-2"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              autoComplete="off"
              placeholder="Password"
              minLength={7}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary my-2"
            style={{
              backgroundColor: "#0081a5",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
