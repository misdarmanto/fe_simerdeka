import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import SidebarStyle from "../layout/Sidebar";
import { RootContext } from "../utils/contextApi";
import { useEffect, useState } from "react";
import { ServiceApi } from "../services/api";

const Root = () => {
	const [role, setRole] = useState("mahasiswa");
	const users = [
		{ user_id: "8cd17bb9-d727-4578-99c5-a223296d55b8", role: "mahasiswa" },
	];

	const fecthCurrentUser = async () => {
		const serviceHttp = new ServiceApi();
		const result = await serviceHttp.get({
			path: "/users/me/8cd17bb9-d727-4578-99c5-a223296d55b8",
		});
		console.log(result);
	};

	useEffect(() => {
		fecthCurrentUser();
	}, []);

	return (
		<RootContext.Provider value={{ role, setRole }}>
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
