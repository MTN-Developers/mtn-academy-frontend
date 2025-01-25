// "use client"

// // src/components/common/ProtectedRoute.tsx
// import { useAuth } from "@/app/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredPermission?: string;
// }

// export const ProtectedRoute = ({
//   children,
//   requiredPermission,
// }: ProtectedRouteProps) => {
//   const router = useRouter();


//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.push("/login");
//       return;
//     }

//     if (requiredPermission && !hasPermission(requiredPermission)) {
//       router.push("/unauthorized");
//     }
//   }, [isAuthenticated, requiredPermission, hasPermission, router]);

//   return <>{children}</>;
// };
