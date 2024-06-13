import { useToast } from "@/components/ui/use-toast";
import { QueryResponse } from "@/type";

type PropsFormSubmission = {
  isUpdate: boolean;
  itemId: string;
  initialState: any;
  reset: (initialState: any) => void;
  editFn: (itemId: string, data: any) => Promise<QueryResponse>;
  addFn: (data: any) => Promise<QueryResponse>;
};

const useFormSubmission = ({
  isUpdate,
  itemId,
  initialState,
  reset,
  editFn,
  addFn,
}: PropsFormSubmission) => {
  const { toast } = useToast();

  const handleFormSubmission = async (data: any) => {
    let response: QueryResponse | null = null;
    if (isUpdate && itemId) {
      response = await editFn(itemId, data);
    }
    if (!isUpdate) {
      response = await addFn(data);
    }

    if (!response) {
      toast({
        title: "Error",
        description: "Failed to submit item",
        variant: "destructive",
        className:
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
      });
    }

    if (response) {
      const { success, message } = response;
      if (!success) {
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
          className:
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        });
      } else {
        toast({
          title: "Success",
          description: message,
          className:
            "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4",
        });
        reset(initialState);
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    }
  };

  return { handleFormSubmission };
};

export default useFormSubmission;
