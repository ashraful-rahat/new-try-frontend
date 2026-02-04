// app/(main)/layout.tsx
import { ReactNode } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
