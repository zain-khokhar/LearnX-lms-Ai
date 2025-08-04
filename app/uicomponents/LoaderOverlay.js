// LoaderOverlay.js
"use client";
import { useRouteLoader } from "./RouteLoaderProvider";
import LmsLoader from "./loader/page";
import AppHeader from "./AppHeader";

export default function LoaderOverlay({ children }) {
  const { loading } = useRouteLoader();
  return (
    <>
      <AppHeader />
      {loading && <LmsLoader />}
      {children}
    </>
  );
}
