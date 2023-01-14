"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function Sidebar({ ...props }) {

  const menuList = [
    { label: "Products", route: "products" },
    { label: "Carts", route: "carts" },
  ];

  return (
    <div className="bg-gray-300 h-full">
      <ul className="flex flex-col gap-2 my-6">
        {menuList.map((x, i) => {
          return (
            <li
              className={"p-3 cursor-pointer w-52"}
              onClick={() => props.setCurrentMenu(x.route)}
            >
              <div
                className={
                  props.currentMenu === x.route
                    ? "border-l-8 border-l-purple-500"
                    : "border-l-8 border-transparent"
                }
              >
                <span className="ml-3">{x.label}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
