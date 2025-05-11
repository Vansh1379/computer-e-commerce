import React from "react";

export default function Topbar1({ parentClass = "tf-topbar line-bt" }) {
  return (
    <div className={parentClass}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-12">
            <div className="topbar-left justify-content-xl-start h-100">
              <p className="body-small text-main-2">
                <i className="icon-headphone" /> Call us for free:{" "}
                <a
                  href="tel:+18001234567"
                  className="text-primary link-secondary fw-semibold"
                >
                  +1(800) 123 4567
                </a>
              </p>
              <p className="body-small text-main-2">
                Free Shipping on Orders{" "}
                <span className="fw-semibold text-main">₹ 9999+</span>
              </p>
            </div>
          </div>
          <div className="col-xl-6 d-none d-xl-block">
            <div className="tf-cur justify-content-end bar-lang">
              <a
                href="#log"
                data-bs-toggle="modal"
                className="tf-cur-item link"
              >
                <i className="icon-user-3" />
                <span className="body-small">My account:</span>
                <i className="icon-arrow-down" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
