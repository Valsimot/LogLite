import React, { useState, useRef } from 'react';
import { cn } from "@/lib/utils";

interface RecordButtonProps {
  onRecord: (duration: number) => void;
}

export const RecordButton = ({ onRecord }: RecordButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const startTimeRef = useRef<number>(0);
  const [animating, setAnimating] = useState(false);

  const handleStart = () => {
    setIsPressed(true);
    setAnimating(true);
    startTimeRef.current = Date.now();
  };

  const handleEnd = () => {
    if (isPressed) {
      const duration = Date.now() - startTimeRef.current;
      onRecord(duration);
      setIsPressed(false);
      setTimeout(() => setAnimating(false), 300);
    }
  };

  return (
    <button
      className={cn(
        "w-32 h-32 rounded-full focus:outline-none transition-all duration-300",
        "bg-accent hover:bg-accent-hover shadow-lg",
        "relative after:absolute after:inset-0 after:rounded-full after:shadow-[0_0_0_0_rgba(255,107,107,0.7)]",
        isPressed && [
          "bg-accent-hover scale-95",
          "after:animate-[pulse_2s_infinite]"
        ],
        animating && "animate-button-press"
      )}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onMouseLeave={handleEnd}
      aria-label="Record event"
    >
      <span className="sr-only">Record Event</span>
      <div className={cn(
        "w-full h-full rounded-full flex items-center justify-center",
        "text-white font-medium text-lg",
        isPressed && "animate-pulse"
      )}>
        {isPressed ? "Recording..." : "Press"}
      </div>
    </button>
  );
};