import axios from "axios";
import Cookies from "js-cookie";

const getBoardList = async () => {
    const getToken = Cookies.get("access");

    const config = {
        headers: {
            authorization: `Bearer ${getToken}`,
        },
    };
    const response = await axios.get(
        `${process.env.REACT_APP_TEST_SERVER_URL}/boards`,
        config
    );
    return response;
};

export { getBoardList };
