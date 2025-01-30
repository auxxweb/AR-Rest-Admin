// export const PUBLIC_USER_FRONTEND_URL = "http://localhost:3000"
// export const PUBLIC_USER_FRONTEND_URL = "https://gedexoquiz.auxxweb.in"
export const PUBLIC_USER_FRONTEND_URL =
  process.env.REACT_APP_PUBLIC_USER_FRONTEND_URL;

export const getUserCredential = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUserCredStr = window.localStorage.getItem("userCredential");
  if (storedUserCredStr) {
    try {
      return JSON.parse(storedUserCredStr);
    } catch (error) {
      console.error("Error parsing user credential:", error);
    }
  }
  return null;
};

export const publicRoutes = ["/login", "/forgotPassword", "/changePassword"];

const formatOptions = {
  day: "2-digit",
  month: "short",
  year: "2-digit"
};

const dateAndTimeFormatOptions = {
  day: "2-digit",
  month: "short",
  year: "2-digit",
  hour: "numeric",
  minute: "numeric"
};

const timeFormatOptions = {
  hour: "numeric",
  minute: "numeric"
};

export const dateFormater = (date) => {
  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, "0"); // Get day and pad with '0' if needed
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Get month and pad with '0' (months are zero-indexed)
  const year = newDate.getFullYear(); // Get year

  return `${day}-${month}-${year}`; // Return formatted date in DD-MM-YYYY format
};

export const dateAndTimeFormater = (date) => {
  const formatedDate = new Date(date).toLocaleString(
    "en-IN",
    dateAndTimeFormatOptions
  );
  return formatedDate;
};

export const timeFormater = (date) => {
  const formatedTime = new Date(date).toLocaleString(
    "en-IN",
    timeFormatOptions
  );
  return formatedTime;
};


export const getTextDirection = (text) => {
  return /^[\u0600-\u06FF\s]+$/.test(text) ? "rtl" : "ltr";
};