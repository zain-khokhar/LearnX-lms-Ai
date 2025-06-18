'use client';

import { AuthProvider } from "./context/AuthContext";
import RouteLoaderProvider from "./uicomponents/RouteLoaderProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <RouteLoaderProvider>{children}</RouteLoaderProvider>
    </AuthProvider>
  );
}
