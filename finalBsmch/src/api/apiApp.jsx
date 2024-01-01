// AppApi.js

const axios = require('axios');

class AppApi {
  async doApi() {
    const options = {
      method: 'GET',
      url: 'https://dad-jokes.p.rapidapi.com/random/joke',
      headers: {
        'X-RapidAPI-Key': '2e31f82c0fmsh2895fa7730367d6p145e54jsnc7460532e442',
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

  }
}

module.exports = new AppApi();

