'use client';

import * as React from 'react';
import { ReactNode } from 'react';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';
import { IconPolygonDown } from '@/public/svgs';

const { Provider } = TooltipPrimitive;

const { Root } = TooltipPrimitive;

const { Trigger } = TooltipPrimitive;

const Content = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'bg-popover text-popover-foreground animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1 z-50 overflow-hidden rounded-md px-3 py-1.5 text-sm',
      className,
    )}
    {...props}
  />
));
Content.displayName = TooltipPrimitive.Content.displayName;

interface TooltipUiProps {
  label: string;
}

const TooltipUi = ({ label }: TooltipUiProps) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="font-body-regular-sm flex max-w-[335px] justify-center truncate rounded-[100px] bg-white px-[20px] py-[10px] text-black">
        {label}
      </div>
      <IconPolygonDown className="absolute top-[39px] h-[8px] w-[10px]" />
    </div>
  );
};

interface TooltipProps {
  trigger: ReactNode;
  label: string;
}

const Tooltip = ({ trigger, label }: TooltipProps) => {
  return (
    <Provider delayDuration={0}>
      <Root>
        <Trigger>{trigger}</Trigger>
        <Content>
          <TooltipUi label={label} />
        </Content>
      </Root>
    </Provider>
  );
};

export { Tooltip };
