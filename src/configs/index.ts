export const CONFIG = {
	env: import.meta.env.NODE_ENV || "development",
	authorization: {
		username: import.meta.env.AUTHORIZATION_USERNAME || "mbadok",
		passsword: import.meta.env.AUTHORIZATION_PASSWORD || "mbadok_secret",
	},
	base_url_api: "http://localhost:8000",
};
