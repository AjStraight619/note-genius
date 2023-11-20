"use client";
import { Toast, ToastProps } from "@/app/components/ui/toast/Toast";
import React, { ReactNode, createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => useContext(ToastContext)!;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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
