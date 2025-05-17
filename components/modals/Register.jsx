"use client";

import axios from "axios";
import React, { useState } from "react";

export default function Register() {
  const [signupInputs, setSignupInputs] = useState({
    name: "",
    email: "",
    password: "",
    PhoneNumber: "",
    Address: "",
  });

  const handleNameChanges = (event) => {
    setSignupInputs({ ...signupInputs, name: event.target.value });
  };
  const handleEmailChanges = (event) => {
    setSignupInputs({ ...signupInputs, email: event.target.value });
  };
  const handlePasswordChanges = (event) => {
    setSignupInputs({ ...signupInputs, password: event.target.value });
  };
  const handlePhoneNumber = (event) => {
    setSignupInputs({ ...setSignupInputs, PhoneNumber: event.target.value });
  };
  const handleAddressChanges = (event) => {
    setSignupInputs({ ...setSignupInputs, Address: event.target.value });
  };

  const signupBackendCall = async () => {
    try {
      const response = await axios.post(
        "https://uniqinfotech.rightinfoservice.com/api/auth/register",
        {
          name: signupInputs.name,
          email: signupInputs.email,
          password: signupInputs.password,
          phone: signupInputs.PhoneNumber,
          address: signupInputs.address,
        }
      );
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      console.error(`Error during signup ${error}`);
    }
  };
  return (
    <div className="modal modalCentered fade modal-log" id="register">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon icon-close btn-hide-popup"
            data-bs-dismiss="modal"
          />
          <div className="modal-log-wrap list-file-delete">
            <h5 className="title fw-semibold">Sign Up</h5>
            <form action="#" className="form-log">
              <div className="form-content">
                <label className="fw-semibold body-md-2"> Name * </label>
                <input
                  type="text"
                  placeholder="Name "
                  onChange={handleNameChanges}
                />
                <label className="fw-semibold body-md-2"> Email * </label>
                <input
                  type="email"
                  placeholder="Enter Email "
                  onChange={handleEmailChanges}
                />
                <label className="fw-semibold body-md-2"> Password * </label>
                <input
                  type="password"
                  placeholder="Enter Password "
                  onChange={handlePasswordChanges}
                />
                <label className="fw-semibold body-md-2">
                  {" "}
                  Phone number *{" "}
                </label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  onChange={handlePhoneNumber}
                />
                <label className="fw-semibold body-md-2">Address:</label>
                <textarea
                  placeholder="Enter your address"
                  onChange={handleAddressChanges}
                ></textarea>
              </div>
              <button
                type="submit"
                className="tf-btn w-100 text-white"
                onClick={signupBackendCall}
              >
                Sign Up
              </button>
              <p className="body-text-3 text-center">
                Already have an account?
                <a href="#log" data-bs-toggle="modal" className="text-primary">
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
