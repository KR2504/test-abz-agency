import axios from "axios";
import getBaseURL from "./baseApi";

const getToken = async() => (
    (await getBaseURL.get('/token')).data.token
);

const axiosAuth = async() => {
    const token = await getToken();

    return axios.create({
        baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',
        headers: { Token: token },
    })
};

export default axiosAuth;