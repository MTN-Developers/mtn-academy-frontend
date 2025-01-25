// // app/components/AuthProvider.tsx
// 'use client';

// import { setCredentials } from "@/app/lib/redux/features/authSlice";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// export default function AuthProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const accessToken = localStorage.getItem('accessToken');
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (accessToken && refreshToken) {
//       dispatch(
//         setCredentials({
//           accessToken,
//           refreshToken,
//           user: null,
//         })
//       );
//     }
//   }, [dispatch]);

//   return <>{children}</>;
// }
