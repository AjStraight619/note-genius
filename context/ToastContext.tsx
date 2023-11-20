"use client";
import { Toast, ToastProps } from "@/app/components/ui/toast/Toast";
import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
  showToast: (props: ToastProps) => void;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toastProps, setToastProps] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToastProps(props);
    setTimeout(() => setToastProps(null), 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastProps && <Toast {...toastProps} />}
    </ToastContext.Provider>
  );
};
