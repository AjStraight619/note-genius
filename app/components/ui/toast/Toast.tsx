import * as ToastPrimitive from "@radix-ui/react-toast";

export type ToastProps = ToastPrimitive.ToastProps & {
  title: string;
  content: string;
  children?: React.ReactNode;
};

export const Toast = ({ title, content, children, ...props }: ToastProps) => {
  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        {...props}
        className="p-4 rounded-lg shadow-md max-w-md mx-auto"
      >
        {title && (
          <ToastPrimitive.Title className="text-lg font-bold mb-2">
            {title}
          </ToastPrimitive.Title>
        )}
        <ToastPrimitive.Description className="text-md text-gray-700">
          {content}
        </ToastPrimitive.Description>
        {children && (
          <ToastPrimitive.Action asChild altText="">
            {children}
          </ToastPrimitive.Action>
        )}
        <ToastPrimitive.Close
          aria-label="Close"
          className="absolute top-2 right-2"
        >
          <span aria-hidden>×</span>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className="fixed bottom-10 right-10" />
    </ToastPrimitive.Provider>
  );
};
