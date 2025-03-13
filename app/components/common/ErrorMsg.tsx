// components/shared/ErrorMsg.tsx
import React from 'react';

const ErrorMsg = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="text-destructive text-sm mt-1  ">{message}</p>;
};

export default ErrorMsg;
