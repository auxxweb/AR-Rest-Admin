import axios from "axios";
import { getUserCredential } from "../common/utils";
import { toast } from "sonner";

//  const BE_API_KEY = "http://localhost:5000";
const BE_API_KEY = process.env.REACT_APP_BE_API_KEY

const customApiHandler =
  () =>
  async ({ url, method, body, params, headers }) => {
    try {
      axios.interceptors.request.use(
        (config) => {
          const userData = getUserCredential();
          if (userData) {
            config.headers.Authorization = `Bearer ${userData}`;
          }
          return config;
        },
        (error) => {
          Promise.reject(error);
        }
      );
      let payload = {
        url: BE_API_KEY + url,
        method,
        data: body,
        params,
      };
      if (headers) payload = { ...payload, headers, formData: true };
      const result = await axios(payload);
      //  successCode &&
      //  successMessage(successCode && isNumber(successCode) ? successCode : result?.data?.message);
      return { data: result.data };
    } catch (error) {
      toast.error(error?.response?.data?.message,{
        position: "top-right",
        duration: 2000,  
        style: {
          backgroundColor: "#fb0909", // Custom green color for success
          color: "#FFFFFF", // Text color
        },
        dismissible: true,  
      });

      //  needError && errorMessage(needError && isNumber(needError) ? needError : showError);

      return { data: error?.response?.data };
    }
  };
export default customApiHandler;
