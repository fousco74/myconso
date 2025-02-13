import React from "react";
import { ProgressBarProps } from "@/types";


const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = "h-2",
}) => {
  
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`${height} bg-progressBar rounded-full transition-all duration-300`}
        style={{ width: `${clampedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;