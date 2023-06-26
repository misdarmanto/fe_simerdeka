import { RootContext } from "./utils/contextApi";
import AppRouters from "./routers";
import { themeConfig } from "./configs/themeConfig";
import { UserTypes } from "./models/user";
import { useEffect, useState } from "react";
import { ServiceHttp } from "./services/api";
import { CONFIG } from "./configs";
import { LIST_USER } from "./data/users";
import { ThemeProvider, makeStyles } from "@mui/material/styles";
import { Backdrop, CircularProgress } from "@mui/material";

export default function App() {
	const [role, setRole] = useState<string>();
	const [currentUser, setCurrentUser] = useState<UserTypes>();
	const [isLoading, setIsLoading] = useState(true);

	const fecthCurrentUser = async () => {
		const serviceHttp = new ServiceHttp();
		const result = await serviceHttp.get({
			path: "/users",
		});

		console.log("5 fecth user");
		console.log(result);
		setCurrentUser(result);
	};

	const checkUserAuth = async () => {
		try {
			const userCredential = localStorage.getItem(CONFIG.local_storage_key);
			console.log("1");
			console.log(userCredential);
			if (!userCredential) {
				localStorage.setItem(
					CONFIG.local_storage_key,
					JSON.stringify(LIST_USER[0])
				);
				console.log("2");
				setRole(LIST_USER[0].userRole);
				await fecthCurrentUser();
			} else {
				const user: UserTypes = JSON.parse(userCredential + "");
				setRole(user.userRole);
				console.log("3");
				console.log(user);
				await fecthCurrentUser();
			}
			setIsLoading(false);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		checkUserAuth();
		console.log("route load");
	}, [role]);

	if (isLoading) return <LoadingComponent />;

	return (
		<ThemeProvider theme={themeConfig}>
			<RootContext.Provider value={{ role, setRole, currentUser }}>
				<AppRouters />
			</RootContext.Provider>
		</ThemeProvider>
	);
}

const LoadingComponent = () => {
	return (
		<Backdrop
			sx={{
				zIndex: 1,
				backgroundColor: "#f3f3f3",
			}}
			open={true}
		>
			<CircularProgress color="primary" />
		</Backdrop>
	);
};
