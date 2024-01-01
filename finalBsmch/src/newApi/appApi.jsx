
import axios from 'axios';

export const doApi = async (url) => {
  try {
    const response = await axios.get(url);

    // Axios automatically throws an error for non-2xx responses, so no need to check response.ok

    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error here, for example, display an error message to the user.
    throw error; // Re-throw the error to let the calling function handle it
  }
};

