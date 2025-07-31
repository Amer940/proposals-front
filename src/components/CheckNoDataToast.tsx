"use client";

import { Payment } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type CheckNoDataToastProps = {
  data: Payment[] | [];
};

const CheckNoDataToast = ({ data }: CheckNoDataToastProps) => {
  const [showToast, setShowToast] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (data.length === 0) {
      setShowToast(true);
      setIsVisible(true);

      // Auto-hide after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Remove from DOM after animation completes
        setTimeout(() => setShowToast(false), 300);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
      setIsVisible(false);
    }
  }, [data.length]);

  if (!showToast) return null;

  return (
    <div
      className={`absolute top-[1.5rem] w-[25vw] mx-auto bg-(--background) border-(--input) border rounded-md p-4 ${
        isVisible ? "animate-appear" : "animate-disappear"
      }`}
    >
      <div className="flex items-center gap-1 flex-col">
        <span className="text-red-500 font-semibold text-2xl text-center w-full tracking-tight">
          Alert!
        </span>
        <span className="text-white/50 text-sm">
          Error happened while getting data for table!
        </span>
        <div className="absolute bottom-0 left-0 h-1 bg-red-500 animate-progress" />
      </div>
    </div>
  );
};

export default CheckNoDataToast;
