import axios from "axios";
export const homeAPI = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/packages`||`https://travel-agency-website-ujh8.onrender.com/packages`);
    return response.data;
  } catch (err) {
    console.error("error while requesting API", err);
  }
};
