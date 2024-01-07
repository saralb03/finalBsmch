import axios from "axios";

const baseUrl = "http://localhost:3001/";

export const apiService = () => {

    const postData = async (url, body) => {
        try {
            console.log(`${baseUrl}${url}`);
            const response = await axios.post(`${baseUrl}${url}`, body);
            console.log(response);
            return response.data;
        }
        catch (err) {
            if (err.response) {
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                console.error('No response received from the server', err.request);
            } else {
                console.error('Error setting up the request', err.message);
            }

            console.error(`error in postData ${err}`);
        }
    }

    const postAuthenticatedData = async (url, body, token) => {
        try {
            const response = await axios({
                url: `${baseUrl}${url}`,
                method: 'post',
                data: body,
                headers: {
                    'x-api-key': token,
                    //   'Content-Type':'application-json',
                },
            });
            // console.log(response.dada);
            return response.data;
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received from the server', err.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up the request', err.message);
            }

            console.error(`error in postData ${err}`);

        }
    };


    const getData = async (url) => {
        try {
            console.log(`${baseUrl}${url}`);
            return await axios.get(`${baseUrl}${url}`);
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    const getAuthenticatedData = async (url, token) => {
        try {
            const response = await axios({
                url: `${baseUrl}${url}`,
                method: 'get',
                headers: {
                    'x-api-key': token,
                    // 'Content-Type': 'application-json', // If needed, add Content-Type header for specific cases
                },
            });

            return response.data;
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received from the server', err.request);
            } else {
                // Something happened in setting up the request
                console.error('Error setting up the request', err.message);
            }

            console.error(`Error in getAuthenticatedData ${ err }`);
        }
    };

    const updateData = async (url, params, body) => {
        try {
            console.log(`${baseUrl}${url}/${params}`);
            console.log(body);

            const res = await axios.put(`${baseUrl}${url}/${params}`, body);

            console.log(res);

            return res.data;
        } catch (err) {
            if (err.response) {
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                console.error('No response received from the server', err.request);
            } else {
                console.error('Error setting up the request', err.message);
            }

            console.error(`Error in updateData: ${err.message}`);
            throw err;
        }
    };

    const updateAuthenticatedData = async (url, params, body, token) => {
        console.log(`${baseUrl}${url}/${params}`);
        console.log(body);

        try {
            const headers = {
                'x-api-key': token,
            };

            const res = await axios.put(`${baseUrl}${url}/${params}`, body, { headers });

            console.log(res);

            return res.data;
        } catch (err) {
            if (err.response) {
                console.error(`Server responded with error: ${err.response.status}`, err.response.data);
            } else if (err.request) {
                console.error('No response received from the server', err.request);
            } else {
                console.error('Error setting up the request', err.message);
            }

            console.error(`Error in updateAuthenticatedData: ${err.message}`);
            throw err;
        }
    };



    const deleteAuthenticatedData = async (url, params, token) => {
        try {
            console.log(url);
            const headers = {
                'x-api-key': token,
            };
            const res = await axios.delete(`${baseUrl}${url}/${params}`, { headers });
            console.log(res);
            return res
        }
        catch (err) {
            console.error(`error ${err}`);
        }
    };

    return { getData, postData, postAuthenticatedData, updateData, updateAuthenticatedData, deleteAuthenticatedData, getAuthenticatedData }
}