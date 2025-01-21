// src/app/[locale]/(dashboard)/layout.tsx

import { ProtectedRoute } from "@/app/components/common/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
