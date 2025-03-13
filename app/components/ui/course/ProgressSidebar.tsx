import { Button } from '@/components/ui/button';
import React from 'react';

const ProgressSidebar = () => {
  return (
    <>
      {/* Progress Card */}
      <div className="bg-white p-4 md:p-6 rounded-lg my-4 shadow-sm flex flex-col gap-4 items-center">
        <div className="w-full text-center">
          <h3 className="text-lg font-semibold text-[#353535] mb-4">You Completed</h3>

          {/* Circular Progress */}
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="45"
                className="stroke-current text-gray-200"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45"
                className="stroke-current  text-[#10B981]"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="283"
                strokeDashoffset={(283 * (1 - 0.75)).toFixed(2)} // 75% progress
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-[#10B981]">75%</span>
            </div>
          </div>

          <p className="text-sm text-[#454545] mb-4">Enjoy your learning</p>

          <Button className="w-full bg-[#07519c] hover:bg-[#07529cc3] h-12 text-lg text-white" variant="default">
            Continue learning
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProgressSidebar;
