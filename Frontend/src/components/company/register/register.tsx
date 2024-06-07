import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/navigators/navbar';

import CompanyRegisterStep1 from "./registerStep1";
import CompanyRegisterStep2 from "./registerStep2";
import CompanyRegisterStep3 from "./registerStep3";

const RegistrationFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (data: { [key: string]: string }) => {
    setFormData({ ...formData, ...data });
  };

  console.log(formData)

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <NavBar />
      <div className="bg-red-100 opacity-60 w-[1300px] h-[1300px] absolute rounded-full -top-48 -left-48 -z-10"></div>
      <div className="w-4/5 h-full mx-auto bg-blue-100 flex">
        <div className="flex-[0.5]"></div>
        <form className="flex-[0.5]">
          <div className="w-4/5">
            <h2 className="text-3xl text-secondary font-">
              Falta pouco para você começar a vender conosco!
            </h2>
            <AnimatePresence mode='wait'>
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyRegisterStep1 onNext={handleNextStep} onChange={handleFormDataChange} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyRegisterStep2 onNext={handleNextStep} onChange={handleFormDataChange} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <CompanyRegisterStep3 onPreviuos={handlePreviousStep} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationFlow;
