'use client';

import React, { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Box from '@mui/material/Box';

// import GroupPaymentForm from '@/components/dashboard/payment/GroupPaymentForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';
import { FreeStudyCourse } from '@/app/types/freeStudy';
import FreeStudyPaymentForm from './FreeStudyPaymentForm';
import LoginRegisterTabs from './LoginRegisterTabs';

const steps = ['تسجيل الدخول / إنشاء حساب', 'إتمام الدفع'];

type Props = {
  freeStudy: FreeStudyCourse; // pass the group so the payment form works
};

export default function StepperAuth({ freeStudy }: Props) {
  //   const { isAuthenticated } = useAuth();
  const { user } = useSelector((state: RootState) => state.auth);
  const isAuthenticated = user?.email;

  /** initialise: if already signed-in skip straight to payment */
  const [activeStep, setActiveStep] = useState(isAuthenticated ? 1 : 0);

  /** whenever auth state changes, update the step */
  useEffect(() => {
    if (isAuthenticated) setActiveStep(1);
  }, [isAuthenticated]);

  /* ───────────────── handlers ───────────────── */

  // called by the auth component when login/registration succeeds
  const handleAuthSuccess = () => setActiveStep(1);

  /* ───────────────── UI ───────────────── */
  return (
    <Box sx={{ width: '100%', direction: 'ltr' }}>
      {/* top stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* step content */}
      {activeStep === 0 && <LoginRegisterTabs handleAuthSuccess={handleAuthSuccess} />}

      {activeStep === 1 && <FreeStudyPaymentForm freeStudy={freeStudy} />}
    </Box>
  );
}
