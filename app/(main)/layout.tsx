import Navbar from "./components/Navbar";

// app/(main)/layout.tsx
export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      {/* <Footer /> */}
    </>
  );
}
