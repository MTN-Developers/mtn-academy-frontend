// src/app/[locale]/(dashboard)/layout.tsx

import Navbar from "@/app/components/common/Navbar/Navbar";
import { ProtectedRoute } from "@/app/components/common/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Navbar />
      {children}
    </ProtectedRoute>
  );
}
