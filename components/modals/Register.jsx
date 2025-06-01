"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [signupInputs, setSignupInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setSignupInputs({ ...signupInputs, [field]: e.target.value });
  };

  const signupBackendCall = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://unique.rightinfoservice.com/api/auth/register",
        signupInputs
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        alert("Signed up successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
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
            <form onSubmit={(e) => e.preventDefault()} className="form-log">
              <div className="form-content">
                <label className="fw-semibold body-md-2">Name *</label>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={handleChange("name")}
                  value={signupInputs.name}
                  required
                />

                <label className="fw-semibold body-md-2">Email *</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleChange("email")}
                  value={signupInputs.email}
                  required
                />

                <label className="fw-semibold body-md-2">Password *</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  onChange={handleChange("password")}
                  value={signupInputs.password}
                  required
                />

                <label className="fw-semibold body-md-2">Phone number *</label>
                <input
                  type="number"
                  placeholder="Mobile Number"
                  onChange={handleChange("phone")}
                  value={signupInputs.phone}
                  required
                />

                <label className="fw-semibold body-md-2">Address</label>
                <textarea
                  placeholder="Enter your address"
                  onChange={handleChange("address")}
                  value={signupInputs.address}
                  required
                />
              </div>

              <button
                type="button"
                className="tf-btn w-100 text-white"
                onClick={signupBackendCall}
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              <p className="body-text-3 text-center">
                Already have an account?{" "}
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
