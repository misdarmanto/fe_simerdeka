import axios from "axios";
import { CONFIG } from "../configs";

export class ServiceApi {
	private baseUrl: string;

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	public async get(path: string) {
		try {
			const result = await axios.get(this.baseUrl + path, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
			});
			return result.data.data;
		} catch (error: any) {
			throw error;
		}
	}

	public async post(path: string, body: any) {
		try {
			const result = await axios.post(this.baseUrl + path, body, {
				auth: {
					username: CONFIG.authorization.username,
					password: CONFIG.authorization.passsword,
				},
			});
			return result.data;
		} catch (error: any) {
			throw error;
		}
	}
}
