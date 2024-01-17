import { doApi } from './doApiFunc';

export const fetchCountryNames = async () => {
    try {
        let url = 'https://restcountries.com/v3.1/all?fields=name';
        let data = await doApi(url);
        return data.map((item) => item.name.common);
        countries = data.map((item) => item.name.common);
    } catch (error) {
        console.error('Error in fetchCountryNames:', error);
        countries = [];
    }
};