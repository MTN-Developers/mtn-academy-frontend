// src/app/[locale]/(dashboard)/layout.tsx

import Navbar from "@/app/components/common/Navbar/Navbar";
import { Footer } from "@/app/components/ui/home/Footer";
// import { ProtectedRoute } from "@/app/components/common/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* // <ProtectedRoute> */}
      <div className="relative lg:z-50">
        <Navbar />
      </div>

      {children}
      <Footer />
      {/* // </ProtectedRoute> */}
    </>
  );
}
