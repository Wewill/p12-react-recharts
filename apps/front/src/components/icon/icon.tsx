import React from "react";

interface IconProps {
  iconType: string;
  variant?: "warning" | "info" | "notice" | "danger" | undefined;
  size?: number;
  elClass?: string;
}

const variantColors = {
  warning: {
    textColor: "text-red-500",
    bgColor: "bg-red-100",
  },
  info: {
    textColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  notice: {
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  danger: {
    textColor: "text-pink-500",
    bgColor: "bg-pink-100",
  },
};

const Icon = ({ iconType, variant, size = 42, elClass = "p-2" }: IconProps) => {
  return (
    <i
      className={`rounded-sm ${elClass} ${
        variant ? variantColors[variant].bgColor : "bg-white"
      }`}
    >
      <img
        src={`/${iconType}-icon.svg`}
        width={size}
        height={size}
        className={variant ? variantColors[variant].textColor : "text-red-500"}
      />
    </i>
  );
};

export default Icon;
