"use client";
import dynamic from "next/dynamic";
const Header = dynamic(() => import("../dashboard/header/page"), { ssr: false });
export default Header;
