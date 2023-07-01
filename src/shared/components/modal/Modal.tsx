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
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
Portal.displayName = DialogPrimitive.Portal.displayName;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
      className,
    )}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

const Content = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <Portal>
    <ModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'bg-background fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 rounded-b-lg shadow-lg data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:max-w-lg sm:rounded-lg sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="ring-offset-background  data-[state=open]:text-muted-foreground 2 absolute right-[20px] top-[25px] rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent">
        <IconCancel className=" h-[20px] w-[20px] stroke-gray-50" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </Portal>
));
Content.displayName = DialogPrimitive.Content.displayName;

type ModalUiProps = {
  children: ReactNode;
};
const ModalUi = ({ children }: ModalUiProps) => {
  return (
    <div className="flex w-[300px] flex-col items-center rounded-[10px] bg-white px-[20px] py-[20px]">
      {children}
    </div>
  );
};

type ModalProps = {
  trigger: ReactNode;
  children: ReactNode;
};

/**
 * 
 * @example
    <Modal trigger={<Button>Edit Profile</Button>}>
      <div className="flex flex-col items-center px-[5px]">
        <div className="font-title-medium-md flex items-center justify-center text-black">
          <p>챌린지 성공</p>
        </div>
        <spacing height={20} />
        <div className="flex flex-col items-center">
          <IconJaringobi />
          <spacing height={20} />
          <p className="font-body-regular-lg text-gray-60">
            배달비 10만원 이하로 쓰기에
          </p>
          <p className="font-body-regular-lg text-gray-60">
            성공해서 자린고비가 레벨업했어요!
          </p>
          <spacing height={20} />
          <div className="font-body-regular-lg flex items-center justify-center">
            <p className="text-primary">
              {convertNumberToCurrency(37000, '원')}
            </p>
            <p className="text-gray-60">
              &nbsp;/ {convertNumberToCurrency(100000, '원')}
            </p>
          </div>
        </div>
        <spacing height={56} />
        <Button size="md">비슷한 챌린지 둘러보기</Button>
        <Button size="md" variant="label">
          자린고비 확인하기
        </Button>
      </div>
    </Modal>
 */
const Modal = ({ trigger, children }: ModalProps) => {
  return (
    <Root>
      <Trigger asChild>{trigger}</Trigger>
      <Content>
        <ModalUi>{children}</ModalUi>
      </Content>
    </Root>
  );
};

export { Modal };
