"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/sidebar";
import Tabel from "@/components/table";

export default function Home() {
  const [currentMenu, setCurrentMenu] = useState("products");

  return (
    <main>
      <div className="lg:grid lg:grid-cols-[300px_1fr] gap-5">
        <Sidebar setCurrentMenu={setCurrentMenu} currentMenu={currentMenu} />

        <Tabel currentMenu={currentMenu}/>
      </div>
    </main>
  );
}
