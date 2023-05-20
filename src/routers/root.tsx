import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import SidebarStyle from "../layout/Sidebar";
import { RootContext } from "../utils/contextApi";
import { useEffect, useState } from "react";
import { ServiceHttp } from "../services/api";
import { CONFIG } from "../configs";
import { UserCredentialTypes, UserTypes } from "../models/auth";
import { LIST_USER } from "../data/users";

const Root = () => {
	const [role, setRole] = useState<string>();
	const [currentUser, setCurrentUser] = useState<UserTypes>();
	const [isLoading, setIsLoading] = useState(true);

	const fecthCurrentUser = async (userId: string) => {
		const serviceHttp = new ServiceHttp();
		const result = await serviceHttp.get({
			path: "/users/me/" + userId,
		});
		setCurrentUser(result);
		console.log(result);
	};

	const checkUserAuth = async () => {
		const userCredential = localStorage.getItem(CONFIG.local_storage_key);
		if (!userCredential) {
			localStorage.setItem(CONFIG.local_storage_key, JSON.stringify(LIST_USER[0]));
			setRole(LIST_USER[0].role);
			await fecthCurrentUser(LIST_USER[0].userId);
		} else {
			const user: UserCredentialTypes = JSON.parse(userCredential + "");
			setRole(user.role);
			await fecthCurrentUser(user.userId);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		checkUserAuth();
	}, [role]);

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<RootContext.Provider value={{ role, setRole, currentUser }}>
			<div className="flex flex-auto">
				<SidebarStyle />
				<div className="grow bg-gray-100">
					<Navbar />
					<div className="m-5">
						<Outlet />
					</div>
				</div>
			</div>
		</RootContext.Provider>
	);
};

export default Root;
