import axios from "axios";
import queryString from "query-string";
import { HttpParam } from "../types";
import { CONFIG } from "../configs";

const CancelToken = axios.CancelToken;
let cancel: () => void | null;

export const Http = async (
	params: HttpParam,
	progress?: number | null,
	setProgress?: (any: any) => void
) => {
	const baseURL = CONFIG.base_url_api;
	const localStorageKey = "simerdeka";
	try {
		let percentCompleted;
		params.showMessage = params.showMessage !== undefined ? params.showMessage : true;
		let auth = params.token ? params.token : localStorage.getItem(localStorageKey);
		let query = params.query
			? "?" + queryString.stringify(params.query, { arrayFormat: "bracket" })
			: "";
		let config: any = {
			method: params.method ? params.method : "GET",
			baseURL: baseURL,
			url: params.path + (query || ""),
			data: params.data ? params.data : {},
			timeout: 1000 * 1200, //600 second / 10minutes
			headers: {
				Authorization: "Bearer " + (auth ? auth : ""),
				"Content-Type": params.content_type ? params.content_type : "application/json",
			},
			onUploadProgress: function (progressEvent: any) {
				if (progress !== undefined && setProgress !== undefined) {
					percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);
					if (progress || progress === 0) {
						setProgress(percentCompleted);
					}
				}
			},
			responseType: params.responseType || "",
		};

		let { data } = await axios(config, {
			cancelToken: new CancelToken(function executor(c) {
				// An executor function receives a cancel function as a parameter
				cancel = c;
			}),
		});

		return data;
	} catch (err: any) {
		if (err.response) {
			if (typeof cancel === "function") {
				cancel();
			}

			if (err.response.status === 401 || err.response.status === 403) {
				localStorage.removeItem(localStorageKey);
				window.location.href = "/login";
			}

			console.log(err.response);
			return err.response.data;
		}
	}
};
