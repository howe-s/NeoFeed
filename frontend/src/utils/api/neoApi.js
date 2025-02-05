import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000/api';

export const neoApi = {
    fetchNeoData: async (startDate, endDate) => {
        const response = await axios.post(`${BASE_URL}/neo`, {
            start_date: startDate,
            end_date: endDate
        });
        return response.data;
    },

    fetchNeoObject: async (identifier) => {
        const response = await axios.post(`${BASE_URL}/neoObject`, identifier);
        return response.data;
    },

    updateChart: async (date) => {
        const response = await axios.post(`${BASE_URL}/updatedChart`, {
            date: date
        });
        return response.data;
    }
}; 