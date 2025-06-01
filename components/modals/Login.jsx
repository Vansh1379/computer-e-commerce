"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setInputs({ ...inputs, [field]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://unique.rightinfoservice.com/api/auth/login",
        inputs
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Signed in successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modalCentered fade modal-log" id="log">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            <h5 className="title fw-semibold">Log In</h5>
            <form onSubmit={handleLogin} className="form-log">
              <div className="form-content">
                <fieldset>
                  <label className="fw-semibold body-md-2"> Email * </label>
                  <input
                    type="text"
                    placeholder="Your email"
                    onChange={handleChange("email")}
                    value={inputs.email}
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="fw-semibold body-md-2"> Password * </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChange("password")}
                    value={inputs.password}
                    required
                  />
                </fieldset>
                <a href="#" className="link text-end body-text-3">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="tf-btn w-100 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
              <p className="body-text-3 text-center">
                Don't you have an account?
                <a
                  href="#register"
                  data-bs-toggle="modal"
                  className="text-light-blue"
                >
                  Register
                </a>
              </p>
            </form>
            <div className="orther-log text-center">
              <span className="br-line bg-gray-5" />
              <p className="caption text-main-2">Or login with</p>
            </div>
            <ul className="list-log">
              <li>
                <a href="#" className="tf-btn btn-line w-100">
                  <i className="icon icon-google" />
                  <span className="body-md-2 fw-semibold">Google</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
