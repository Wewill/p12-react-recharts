import React from "react";

interface IconProps {
  iconType: string;
  variant: "warning" | "info" | "notice" | "danger" | undefined;
}

const variantColors = {
  warning: {
    textColor: "text-orange-500",
    bgColor: "bg-orange-200",
  },
  info: {
    textColor: "text-blue-500",
    bgColor: "bg-blue-200",
  },
  notice: {
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-200",
  },
  danger: {
    textColor: "text-pink-500",
    bgColor: "bg-pink-200",
  },
};

const sizes = {
  sm: {
    size: 42,
  },
  lg: {
    size: 42,
  },
};

const Icon = ({ iconType, variant }: IconProps) => {
  return (
    <i className="icon">
      <img
        src={`/${iconType}-icon.svg`}
        width={sizes.lg.size}
        height={sizes.lg.size}
        className={variant ? variantColors[variant].textColor : "text-red-500"}
      />
    </i>
  );
};

export default Icon;
