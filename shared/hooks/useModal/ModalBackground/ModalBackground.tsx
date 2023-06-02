import React, { MouseEventHandler, useCallback } from 'react';

export interface ModalBackgroundProps {
  className?: string;
  verticalAlign?: 'center' | 'flex-start' | 'flex-end';
  onBackgroundClick?: MouseEventHandler;
}

function ModalBackground({
  children,
  className,
  verticalAlign,
  onBackgroundClick,
}: React.PropsWithChildren<ModalBackgroundProps>) {
  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (onBackgroundClick) {
        onBackgroundClick(e);
      }
    },
    [onBackgroundClick],
  );

  return (
    <div
      className={`
        z-20 flex h-full w-full flex-col items-center justify-center bg-[#141414cc]
        ${className}
      `}
      onClick={handleBackgroundClick}
      style={{ justifyContent: verticalAlign }}
    >
      {children}
    </div>
  );
}

export default ModalBackground;
