import { useEffect, useState } from "react";
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

export const useAsyncMutation = (mutationHook) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  const [mutate] = mutationHook();

  const executeMutation = async (toastMessage, ...args) => {
    setIsLoading(true);
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      const res = await mutate(...args);
      if (res.data) {
        toast.success(res.data.message || "Updated data successfully", {
          id: toastId,
        });
        setData(res.data);
      } else {
        toast.error(res?.error?.data?.message || "Something went wrong", {
          id: toastId,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return [executeMutation, isLoading, data];
};
