import axios from "axios";

const aniAPI = axios.create({
	baseURL: "https://api.aniapi.com/",
	headers: {
		Authorization: `Bearer ${process.env.REACT_APP_ANI_API_KEY}`,
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default aniAPI;
