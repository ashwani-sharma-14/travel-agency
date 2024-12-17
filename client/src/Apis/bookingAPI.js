import axios from "axios";

export const bookingAPi = async ( id, formData) => {
  try {
    const result = await axios.post(
      `http://localhost:8080/packages/${id}/booking`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result.data;
  } catch (err) {
    console.error(`err:-`, err.message);
  }
};
