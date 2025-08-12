"use client";

import { useEffect, useState } from "react";

type CheckNoDataToastProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

const CheckNoDataToast = ({
  show,
  message,
  onClose,
}: CheckNoDataToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!show) return;

    setIsVisible(true);

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Remove from DOM after animation completes
      setTimeout(() => onClose(), 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className={`fixed z-[9999] left-1/2 -translate-x-1/2 top-[1.5rem] w-[25vw] mx-auto bg-(--background) border-(--input) border rounded-md p-4 ${
        isVisible ? "animate-appear" : "animate-disappear"
      }`}
      onClick={() => setIsVisible(false)}
    >
      <div className="flex items-center gap-1 flex-col">
        <span className="text-red-500 font-semibold text-2xl text-center w-full tracking-tight">
          Alert!
        </span>
        <span className="text-white/50 text-sm">{message}</span>
        <div className="absolute bottom-0 left-0 h-1 bg-red-500 animate-progress" />
      </div>
    </div>
  );
};

export default CheckNoDataToast;
