'use client';

import * as React from 'react';
import { ReactNode } from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { IconCancel } from '@/public/svgs';

const { Root } = DialogPrimitive;

const { Trigger } = DialogPrimitive;

const Portal = ({
  className,
  children,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-end">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
Portal.displayName = DialogPrimitive.Portal.displayName;

const BottomSheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-all duration-100',
      className,
    )}
    {...props}
  />
));
BottomSheetOverlay.displayName = DialogPrimitive.Overlay.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <BottomSheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bg-background animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-50 grid gap-4 rounded-b-lg shadow-lg sm:max-w-lg sm:rounded-lg',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ring-offset-background data-[state=open]:text-muted-foreground 2 absolute right-[12px] top-[12px] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent">
        <IconCancel className="h-[20px] w-[20px] stroke-gray-50" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </Portal>
));
Content.displayName = DialogPrimitive.Content.displayName;

interface BottomSheetUiProps {
  children: ReactNode;
}
const BottomSheetUi = ({ children }: BottomSheetUiProps) => {
  return (
    <div className="flex w-screen flex-col items-center rounded-[10px] bg-white ">
      {children}
    </div>
  );
};

interface BottomSheetProps {
  trigger: ReactNode;
  children: ReactNode;
}

/**
 *
 * @example
  <BottomSheet trigger={<Button>trigger</Button>}>
    <p className="text-black">프로필 설정</p>
    <p className="text-black">텍스트를 입력하세요</p>
    <p className="text-black">텍스트를 입력하세요</p>
    <p className="text-black">텍스트를 입력하세요</p>
  </BottomSheet>
 */
const BottomSheet = ({ trigger, children }: BottomSheetProps) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Content>
        <BottomSheetUi>{children}</BottomSheetUi>
      </Content>
    </Root>
  );
};

export { BottomSheet };
