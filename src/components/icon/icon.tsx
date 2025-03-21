import React from "react";

interface IconProps {
  iconType: string;
}

const Icon = ({ iconType }: IconProps) => {
  return (
    <i className="icon">
      <img
        src={`/${iconType}-icon.svg`}
        width={42}
        height={42}
        className="icon_image"
      />
    </i>
  );
};

export default Icon;
