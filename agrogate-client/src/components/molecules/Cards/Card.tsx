import React from "react";
import PropTypes from "prop-types";

interface CardProps {
  className: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return <div className={`w-full rounded-lg p-6 ${className}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
