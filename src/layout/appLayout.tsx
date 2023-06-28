import Logo from "../assets/logos/bgw_simerdeka.jpeg";
import { RootContext } from "../utils/contextApi";
import { UserTypes } from "../models/user";
import React, { useContext, useState } from "react";
import NavbarItemGroup from "./navbar-item";
import {
	AcademicMenus,
	LP3MMenus,
	jurusanMenus,
	prodiMenus,
	studentMenus,
} from "./listMenu";
import { CONFIG } from "../configs";
import { LIST_USER } from "../data/users";
import { Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";

const AppLayout: React.FC = () => {
	const { currentUser, role, setRole }: any = useContext(RootContext);
	const [openSideBar, setOpenSideBar] = useState(false);

	const handleOpenSideBar = () => {
		setOpenSideBar(!openSideBar);
	};

	const navigate = useNavigate();

	const handleSaveUserCredential = (selectedUser: UserTypes) => {
		const user = LIST_USER.find((user: UserTypes) => {
			return user.userId === selectedUser.userId;
		});
		localStorage.setItem(CONFIG.local_storage_key, JSON.stringify(user));
	};

	const handleSelectRole = (user: UserTypes) => {
		handleSaveUserCredential(user);
		setRole(user.userRole);
		navigate("/");
		window.location.reload();
	};

	type MenuItems = { title: string; path: string; icon: any };

	type MenuTypes = {
		persiapan: MenuItems[];
		pelaksanaan: MenuItems[];
		akhir: MenuItems[];
	};

	let MENUS: MenuTypes | null = null;

	switch (role) {
		case "student":
			MENUS = studentMenus;
			break;
		case "study_program":
			MENUS = prodiMenus;
			break;
		case "department":
			MENUS = jurusanMenus;
			break;
		case "lp3m":
			MENUS = LP3MMenus;
			break;
		case "academic":
			MENUS = AcademicMenus;
			break;
		default:
			break;
	}

	return (
		<div>
			<div className="flex items-center mx-auto">
				<img className="p-1 mx-2" src={Logo} alt="Logo" />
			</div>

			<div className="h-12 w-full bg-yellow-400 flex items-center px-5 gap-5">
				<div className="text-white text-sm flex-grow">
					<div className="flex items-center gap-2">
						<div className="sm:hidden">
							<BiMenu size={"30px"} onClick={handleOpenSideBar} />
						</div>
						<p className="text-white text-sm hidden sm:block">
							Semester Aktif: 2022/2023 Genap
						</p>
					</div>
				</div>
				<div className="flex items-center gap-2 text-white">
					<FaUser style={{ color: "#fff" }} />
					<Dropdown
						inline={true}
						label={currentUser.userName}
						dismissOnClick={true}
					>
						{LIST_USER.map((user: UserTypes) => (
							<Dropdown.Item onClick={() => handleSelectRole(user)}>
								{user.userName}
							</Dropdown.Item>
						))}
					</Dropdown>
				</div>
				<div className="flex items-center gap-2">
					<FiLogOut style={{ color: "#fff" }} />
					<p className="text-white text-sm flex-grow">Logout</p>
				</div>
			</div>
			<div className="flex w-full">
				<ul
					className={`${
						openSideBar ? "w-1/3" : "hidden"
					} sm:block min-h-screen duration-100 p-2 z-5`}
				>
					<NavbarItemGroup title="Menu Utama" items={MENUS?.persiapan || []} />
					<NavbarItemGroup
						title="Persiapan MBKM"
						items={MENUS?.pelaksanaan || []}
					/>
					<NavbarItemGroup
						title="Laporan Kegiatan"
						items={MENUS?.akhir || []}
					/>
				</ul>
				<div className="grow ">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
