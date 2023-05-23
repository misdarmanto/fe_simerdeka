import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import SidebarStyle from "../layout/Sidebar";
import { RootContext } from "../utils/contextApi";
import { useEffect, useState } from "react";
import { CONFIG } from "../configs";
import { UserTypes } from "../models/auth";
import { LIST_USER } from "../data/users";
import { Footer } from "flowbite-react";

const Root = () => {
	const [role, setRole] = useState<string>();
	const [currentUser, setCurrentUser] = useState<UserTypes>();
	const [isLoading, setIsLoading] = useState(true);

	// const fecthCurrentUser = async (userId: string) => {
	// 	const serviceHttp = new ServiceHttp();
	// 	const result = await serviceHttp.get({
	// 		path: "/users/me/" + userId,
	// 	});
	// 	setCurrentUser(result);
	// 	console.log(result);
	// };

	const checkUserAuth = async () => {
		const userCredential = localStorage.getItem(CONFIG.local_storage_key);
		if (!userCredential) {
			localStorage.setItem(CONFIG.local_storage_key, JSON.stringify(LIST_USER[0]));
			setRole(LIST_USER[0].user_role);
			setCurrentUser(LIST_USER[0]);
		} else {
			const user: UserTypes = JSON.parse(userCredential + "");
			setRole(user.user_role);
			setCurrentUser(user);
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
					<div className="m-5 h-screen">
						<Outlet />
					</div>
					<Footer container={true}>
						<div className="w-full text-center">
							<Footer.Copyright by="simerdeka™" year={2023} />
						</div>
					</Footer>
				</div>
			</div>
		</RootContext.Provider>
	);
};

export default Root;
