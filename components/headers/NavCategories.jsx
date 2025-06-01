"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function NavCategories({ styleClass = "" }) {
  const [activeDropdown, setActiveDropdown] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuItems = [
    {
      href: "/",
      iconClass: "icon-clothing fs-20",
      label: "Home",
    },
    {
      href: "/brand-store",
      label: "Brand Store",
      customIcon: (
        <svg
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0)">
            <mask
              id="mask0"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="20"
              height="20"
            >
              <path
                d="M19.5 19.5V0.5H0.5V19.5H19.5Z"
                fill="white"
                stroke="white"
              />
            </mask>
            <g mask="url(#mask0)">
              <path
                d="M17.5 11C17.5 15.6 13.7 19.4 9 19.4C4.4 19.4 0.6 15.6 0.6 11C0.6 6.3 4.4 2.5 9 2.5"
                stroke="black"
                strokeMiterlimit={10}
              />
              <path
                d="M10.3 11C10.3 11.7 9.8 12.2 9 12.2C8.3 12.2 7.8 11.7 7.8 11C7.8 10.2 8.3 9.7 9 9.7C9.8 9.7 10.3 10.2 10.3 11Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.6 11C14.6 7.8 12.2 5.4 9 5.4L9 0.6C14.6 0.6 19.4 4.9 19.4 11H14.6Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 11C12.5 12.9 11 14.4 9 14.4C7.1 14.4 5.6 12.9 5.6 11C5.6 9 7.1 7.5 9 7.5C11 7.5 12.5 9 12.5 11Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 16.6V17.3" stroke="black" strokeLinecap="round" />
              <path d="M2.6 11H3.4" stroke="black" strokeLinecap="round" />
              <path d="M4.5 15.3L5 14.8" stroke="black" strokeLinecap="round" />
              <path
                d="M13.1 14.8L13.6 15.3"
                stroke="black"
                strokeLinecap="round"
              />
              <path d="M5.2 6.9L4.6 6.3" stroke="black" strokeLinecap="round" />
            </g>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width={20} height={20} fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
    },
    {
      href: "/refurbished",
      iconClass: "icon-beauti fs-20",
      label: "Refurbish System",
    },
    {
      href: "/new-arrivals",
      iconClass: "icon-computer fs-20",
      label: "New Arrival",
    },
    {
      href: "/build-pc",
      iconClass: "icon-sofa fs-20",
      label: "Build Your PC",
    },
    {
      href: "/offers",
      iconClass: "icon-computer-wifi fs-20",
      label: "Offers",
    },
  ];

  return (
    <div ref={navRef} className={`nav-category-wrap ${styleClass}`}>
      <div
        onClick={() => setActiveDropdown((prev) => !prev)}
        className={`nav-title btn-active ${activeDropdown ? "active" : ""}`}
      >
        <i className="icon-menu-dots fs-20" />
        <h6 className="title fw-semibold">All Categories</h6>
      </div>
      <nav
        className={`category-menu active-item ${
          activeDropdown ? "active" : ""
        }`}
      >
        <div className="menu-category-menu-container">
          <ul id="primary-menu" className="megamenu">
            {menuItems.map((item, idx) => (
              <li key={idx} className="menu-item">
                <Link href={item.href} className="flex items-center gap-2">
                  {item.customIcon ? (
                    <span className="icon">{item.customIcon}</span>
                  ) : (
                    <i className={item.iconClass} />
                  )}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
