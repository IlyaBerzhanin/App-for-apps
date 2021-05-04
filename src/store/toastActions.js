import { useToast } from "vue-toastification";

const toast = useToast();

export default {
  showLogAndRegErrors(arrayOfErrors) {
    arrayOfErrors.forEach((error) => {
      toast.error(`${error.$propertyPath}: ${error.$message}`);
    });
  },

  showSuccessMessage(textOfMessage) {
    toast.success(textOfMessage);
  },

  showErrorMessage(textOfMessage) {
    toast.error(textOfMessage);
  },

  showInfoMessage(textOfMessage) {
    toast.info(textOfMessage);
  },
};
