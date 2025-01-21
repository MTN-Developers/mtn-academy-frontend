// app/hooks/usePermissions.ts
import { useSelector } from "react-redux";
import { RootState } from "../lib/redux/store";

export const usePermissions = () => {
  const permissions = useSelector(
    (state: RootState) => state.auth.user?.permissions || []
  );

  const hasPermission = (permission: string) => {
    return permissions.includes(permission);
  };

  return {
    permissions,
    hasPermission,
  };
};
