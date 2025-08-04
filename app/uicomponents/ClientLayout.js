// app/uicomponents/ClientLayout.js
"use client";
import LoaderOverlay from "./LoaderOverlay";

export default function ClientLayout({ children }) {
  return <LoaderOverlay>{children}</LoaderOverlay>;
}
