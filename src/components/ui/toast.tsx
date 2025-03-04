import { toast as RhtToast, Toaster as RhtToaster } from "react-hot-toast";

export const Toaster = () => {
  return (
    <RhtToaster
      toastOptions={{
        position: "bottom-center",
        style: {
          fontWeight: 600,
        },
      }}
    />
  );
};

export const toast = RhtToast;
