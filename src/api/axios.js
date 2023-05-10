import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.REACT_APP_TEST_SERVER_URL;

const instance = axios.create({
    baseURL: API_URL,
});

const token = Cookies.get("access");
// console.log(token);
if (token) {
    instance.defaults.headers.common["authorization"] = `Bearer ${token}`;
}

export default instance;
