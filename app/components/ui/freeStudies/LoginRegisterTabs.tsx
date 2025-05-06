'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

type Props = {
  handleAuthSuccess: () => void;
};

const LoginRegisterTabs = ({ handleAuthSuccess }: Props) => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div className="px-4 lg:my-10 lg:px-16 h-fit w-full  ">
      {isRegistered ? (
        <LoginForm setIsRegistered={setIsRegistered} handleAuthSuccess={handleAuthSuccess} />
      ) : (
        <RegisterForm setIsRegistered={setIsRegistered} handleAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
};

export default LoginRegisterTabs;
