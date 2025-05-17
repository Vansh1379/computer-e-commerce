"use client";
import React from "react";
import Link from "next/link";
import { blogMenuItems, shopDetailsPages, shopPages } from "@/data/menu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  const isMenuParentActive2 = (menu) => {
    return menu.some((elm) => isMenuParentActive(elm.items));
  };

  return (
    <>
      <a href="#" className="item-link link body-md-2 fw-semibold">
        <span>Home</span>
      </a>

      <li
        className={`nav-item ${isMenuParentActive2(shopPages) ? "active" : ""}`}
      >
        <a href="#" className="item-link body-md-2 fw-semibold">
          <span>Shop</span>
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu-container mega-menu text-nowrap">
          <div className="wrapper-sub-menu">
            {shopPages.map((menu) => (
              <div key={menu.id} className="mega-menu-item">
                <p className="menu-heading body-small">{menu.heading}</p>
                <ul className="menu-list">
                  {menu.items.map((item) => (
                    <li
                      key={item.id}
                      className={` ${isMenuActive(item) ? "active" : ""}`}
                    >
                      <Link href={item.href} className="body-md-2 link">
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </li>
      <li
        className={`nav-item ${
          isMenuParentActive2(shopDetailsPages) ? "active" : ""
        }`}
      >
        <a href="#" className="item-link body-md-2 fw-semibold">
          <span>Product</span>
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu-container mega-menu text-nowrap">
          <div className="wrapper-sub-menu">
            {shopDetailsPages.map((menu) => (
              <div key={menu.id} className="mega-menu-item">
                <p className="menu-heading body-small">{menu.heading}</p>
                <ul className="menu-list">
                  {menu.items.map((item) => (
                    <li
                      key={item.id}
                      className={` ${isMenuActive(item) ? "active" : ""}`}
                    >
                      <Link href={item.href} className="body-md-2 link">
                        <span>{item.text}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </li>
      <li
        className={`nav-item ${
          isMenuParentActive(blogMenuItems) ? "active" : ""
        }`}
      >
        <a href="#" className="item-link body-md-2 fw-semibold">
          <span>Blog</span>
          <i className="icon icon-arrow-down" />
        </a>
        <div className="sub-menu-container">
          <ul className="sub-menu-list">
            {blogMenuItems.map((item) => (
              <li
                key={item.id}
                className={` ${isMenuActive(item) ? "active" : ""}`}
              >
                <Link href={item.href} className="body-md-2 link">
                  <span>{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>

      <a href="#" className="item-link body-md-2 fw-semibold ">
        <span className="--bs-gray-700">Build Your PC</span>
      </a>
    </>
  );
}
