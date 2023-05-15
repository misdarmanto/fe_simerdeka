import { Outlet } from "react-router-dom";
import Navbar from "../layout/Navbar";
import SidebarStyle from "../layout/Sidebar";
import { RootContext } from "../utils/contextApi";
import { useState } from "react";

const Root = () => {
	const [role, setRole] = useState("mahasiswa");
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
