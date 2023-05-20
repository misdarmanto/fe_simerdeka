export const CONFIG = {
	env: import.meta.env.NODE_ENV || "development",
	base_url_api: "http://localhost:8000",
	local_storage_key: "simerdeka",
	authorization: {
		username: import.meta.env.AUTHORIZATION_USERNAME || "simerdeka",
		passsword: import.meta.env.AUTHORIZATION_PASSWORD || "simerdeka2023",
	},
};
