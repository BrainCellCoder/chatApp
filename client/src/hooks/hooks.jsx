import { useEffect } from "react";
import toast from "react-hot-toast";

export const useErrors = (errors = []) => {
  useEffect(() => {
    errors.forEach(({ isError, error, fallBack }) => {
      if (isError) {
        if (fallBack) fallBack();
        else toast.error(error?.data?.message || "Something went wrong");
      }
    });
  }, [errors]);
};
