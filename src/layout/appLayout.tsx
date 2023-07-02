import Logo from "../assets/logos/bgw_simerdeka.jpeg";
import { UserTypes } from "../models/user";
import React, { useState } from "react";
import NavbarItemGroup from "./navbar-item";
import {
	AcademicMenus,
	LP3MMenus,
	departmentMenus,
	studentMenus,
	studyProgramMenus,
} from "./listMenu";
import { CONFIG } from "../configs";
import { LIST_USER } from "../data/users";
import { Outlet, useNavigate } from "react-router-dom";
import { Alert, Dropdown } from "flowbite-react";
import { FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { BiMenu } from "react-icons/bi";
import { AppContextTypes, useAppContext } from "../context/app.context";
import { HiInformationCircle } from "react-icons/hi";

const AppLayout: React.FC = () => {
	const {
		currentUser,
		appRole,
		setAppRole,
		errorMessage,
		setErrorMessage,
	}: AppContextTypes = useAppContext();

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
		setAppRole(user.userRole);
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

	switch (appRole) {
		case "student":
			MENUS = studentMenus;
			break;
		case "studyProgram":
			MENUS = studyProgramMenus;
			break;
		case "department":
			MENUS = departmentMenus;
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
		<div className="max-w-full">
			<div className="flex items-center mx-auto">
				<img className="p-1 mx-2" src={Logo} alt="Logo" />
			</div>

			<div className="h-12 bg-yellow-400 flex items-center px-5 gap-5">
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
						{LIST_USER.map((user: UserTypes, index) => (
							<Dropdown.Item
								key={index}
								onClick={() => handleSelectRole(user)}
							>
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
			<div className="flex gap-5 p-5">
				<div
					className={`${
						openSideBar ? "absolute w-1/3 z-50" : "hidden"
					} sm:block min-h-screen duration-100`}
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
				</div>
				<div className="grow">
					{errorMessage.isError && (
						<Alert
							color="failure"
							icon={HiInformationCircle}
							onDismiss={() =>
								setErrorMessage({ isError: false, message: "" })
							}
							className="mb-5"
						>
							<span>
								<p>
									<span className="font-medium"></span>
									{errorMessage.message}
								</p>
							</span>
						</Alert>
					)}
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default AppLayout;
