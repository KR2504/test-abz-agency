import axios from 'axios';

const getBaseURL = axios.create({
    baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
});

export default getBaseURL;