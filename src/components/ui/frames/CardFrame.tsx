import React, { type ReactNode } from 'react';

interface CardFrameProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const CardFrame = (props: CardFrameProps) => {
  const { className, children, onClick } = props;

  return (
    <div
      className={`card rounded-3 shadow-sm border-0 ${className ?? ''}`}
      {...(onClick && { onClick })}>
      {children}
    </div>
  );
};

export default CardFrame;
