import { toast } from "react-toastify";

export const handleToastNotification = (navigate, message, type, path = "/") => {
    // Display toast based on the type
    if (type === "success") {
      toast.success(message, { position: "top-center" });
    } else if (type === "error") {
      toast.error(message, { position: "top-center" });
    }
  
    // Navigate after a delay (only if it's a success)
     if(type=='success'){
         setTimeout(() => {
           navigate(path); // Default path is root
         }, 1000);
     }
  };
  