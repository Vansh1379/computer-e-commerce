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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signupBackendCall();
  };

  const signupBackendCall = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://unique.rightinfoservice.com/api/auth/register",
        signupInputs
      );

      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);

        // Close the modal first
        const modal = document.getElementById("register");
        if (modal) {
          // If using Bootstrap modal
          const bootstrapModal = window.bootstrap?.Modal?.getInstance(modal);
          if (bootstrapModal) {
            bootstrapModal.hide();
          } else {
            // Fallback: remove modal manually
            modal.style.display = "none";
            modal.classList.remove("show");
            document.body.classList.remove("modal-open");

            // Remove backdrop if it exists
            const backdrop = document.querySelector(".modal-backdrop");
            if (backdrop) {
              backdrop.remove();
            }
          }
        }

        // Show success message
        alert("Signed up successfully!");

        // Add a small delay to ensure modal is closed before navigation
        setTimeout(() => {
          router.push("/");
          // Force a page refresh to ensure the app state is updated
          window.location.href = "/";
        }, 100);
      }
    } catch (error) {
      console.error("Signup error:", error);

      // More detailed error handling
      if (error.response?.data?.message) {
        alert(`Signup failed: ${error.response.data.message}`);
      } else if (error.response?.status === 400) {
        alert("Invalid data provided. Please check all fields.");
      } else if (error.response?.status === 409) {
        alert(
          "Email already exists. Please use a different email or try logging in."
        );
      } else if (error.response?.status >= 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("Signup failed. Please check your information and try again.");
      }
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
            <form onSubmit={handleSubmit} className="form-log">
              <div className="form-content">
                <fieldset>
                  <label className="fw-semibold body-md-2">Name *</label>
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={handleChange("name")}
                    value={signupInputs.name}
                    required
                    disabled={isLoading}
                  />
                </fieldset>

                <fieldset>
                  <label className="fw-semibold body-md-2">Email *</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange("email")}
                    value={signupInputs.email}
                    required
                    disabled={isLoading}
                  />
                </fieldset>

                <fieldset>
                  <label className="fw-semibold body-md-2">Password *</label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleChange("password")}
                    value={signupInputs.password}
                    required
                    disabled={isLoading}
                    minLength="6"
                  />
                </fieldset>

                <fieldset>
                  <label className="fw-semibold body-md-2">
                    Phone number *
                  </label>
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    onChange={handleChange("phone")}
                    value={signupInputs.phone}
                    required
                    disabled={isLoading}
                  />
                </fieldset>

                <fieldset>
                  <label className="fw-semibold body-md-2">Address</label>
                  <textarea
                    placeholder="Enter your address"
                    onChange={handleChange("address")}
                    value={signupInputs.address}
                    disabled={isLoading}
                    rows="3"
                  />
                </fieldset>
              </div>

              <button
                type="submit"
                className="tf-btn w-100 text-white"
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
