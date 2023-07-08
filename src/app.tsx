import AppRouters from "./routers";
import { UserTypes } from "./models/user";
import { useEffect, useState } from "react";
import { CONFIG } from "./configs";
import { LIST_USER } from "./data/users";
import { useAppContext } from "./context/app.context";
import { useHttp } from "./hooks/useHttp";

export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const { handleGetRequest } = useHttp();

	const { appRole, setAppRole, setCurrentUser, setCurrentStudent } = useAppContext();

	const fecthCurrentUser = async () => {
		const result = await handleGetRequest({
			path: "/users",
		});
		console.log("_______users");
		console.log(result);
		setCurrentUser(result);
	};

	const checkUserAuth = async () => {
		try {
			const userCredential = localStorage.getItem(CONFIG.local_storage_key);
			if (!userCredential) {
				localStorage.setItem(
					CONFIG.local_storage_key,
					JSON.stringify(LIST_USER[0])
				);
				setAppRole(LIST_USER[0].userRole);
				await fecthCurrentUser();
			} else {
				const user: UserTypes = JSON.parse(userCredential + "");
				setAppRole(user.userRole);
				await fecthCurrentUser();
			}
			setIsLoading(false);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		checkUserAuth();
	}, [appRole]);

	if (isLoading) return <p>Loading</p>;

	return <AppRouters />;
}
