import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
	AiOutlineAudit,
	AiOutlineFile,
	AiOutlineFolderOpen,
	AiOutlineFundProjectionScreen,
	AiOutlineHome,
	AiOutlineSearch,
} from "react-icons/ai";
import { BiMenu, BiUser } from "react-icons/bi";
import {
	FaCarSide,
	FaQuestion,
	FaRegListAlt,
	FaStamp,
	FaUserGraduate,
	FaUsers,
} from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { FiActivity, FiFileText } from "react-icons/fi";
import { BsQuestion, BsQuestionCircle } from "react-icons/bs";
import { RootContext } from "../utils/contextApi";

const SidebarStyle = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const { role }: any = useContext(RootContext);

	console.log(role);

	const studentMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{ title: "Request LoR", path: "/request-LoR", icon: <AiOutlineAudit /> },
		{ title: "My Program", path: "/my-programs", icon: <AiOutlineFolderOpen /> },
		{ title: "Program Proposal", path: "/program-proposal", icon: <AiOutlineFile /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const prodiMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{ title: "Verification LoR", path: "/verification-LoR", icon: <AiOutlineAudit /> },
		{ title: "MBKM Program", path: "/mbkm-programs", icon: <AiOutlineFolderOpen /> },
		{ title: "Student", path: "/students", icon: <FaUserGraduate /> },
		{ title: "Program Proposal", path: "/program-proposal", icon: <AiOutlineFile /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const jurusanMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{ title: "Verification LoR", path: "/verification-LoR", icon: <AiOutlineAudit /> },
		{ title: "MBKM Program", path: "/mbkm-programs", icon: <AiOutlineFolderOpen /> },
		{
			title: "Study Program",
			path: "/study-programs",
			icon: <AiOutlineFundProjectionScreen />,
		},
		{ title: "Summary MBKM", path: "/mbkm-summaries", icon: <FiFileText /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const mbkmTimMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{ title: "Manage User", path: "/manage-users", icon: <BiUser /> },
		{ title: "Semester", path: "/semesters", icon: <FaRegListAlt /> },
		{ title: "MBKM Program", path: "/mbkm-programs", icon: <AiOutlineFolderOpen /> },
		{ title: "Verification LoR", path: "/verification-LoR", icon: <AiOutlineAudit /> },
		{
			title: "Verification Program",
			path: "/verification-programs",
			icon: <AiOutlineFundProjectionScreen />,
		},
		{
			title: "Study Program",
			path: "/study-programs",
			icon: <AiOutlineFile />,
		},
		{ title: "Summary MBKM", path: "/mbkm-summaries", icon: <FiFileText /> },
		{ title: "Log Activity", path: "/log-activities", icon: <AiOutlineSearch /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	type MenuTypes = {
		title: string;
		path: string;
		icon: any;
	};

	let MENUS: MenuTypes[] = [];

	const ROLE: string = role;

	switch (ROLE) {
		case "mahasiswa":
			MENUS = studentMenus;
			break;
		case "prodi":
			MENUS = prodiMenus;
			break;
		case "jurusan":
			MENUS = jurusanMenus;
			break;
		case "mbkmTim":
			MENUS = mbkmTimMenus;
			break;
		default:
			break;
	}

	// if (session.role === "super admin") {
	// 	Menus.push({ title: "Admin", path: "/admin", icon: <MdVpnKey /> });
	// 	Menus.push({ title: "Settings", path: "/settings", icon: <AiTwotoneSetting /> });
	// }
	return (
		<>
			<div
				className={`${
					open ? "w-60" : "w-fit"
				} sm:block relative h-screen duration-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
			>
				<li
					className={`flex items-center gap-x-6 p-2 my-1 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}
				>
					{open ? (
						<>
							<RiCloseLine
								className="text-3xl text-gray-500"
								onClick={() => setOpen(!open)}
							/>
							<small>Close</small>
						</>
					) : (
						<BiMenu onClick={() => setOpen(!open)} className="text-3xl text-gray-500" />
					)}
				</li>

				<ul className="pt-1">
					{MENUS.map((menu, index) => {
						const currentPath = menu.path;
						const isActive = location.pathname === currentPath;
						return (
							<Link to={menu.path} key={index}>
								<li
									className={`flex items-center text-gray-500 gap-x-6 p-3 my-1 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${isActive && "bg-gray-100 dark:bg-gray-700 text-teal-500"}`}
								>
									<span className="text-2xl">{menu.icon}</span>
									<span
										className={`${
											!open && "hidden"
										} origin-left duration-100 text-sm hover:block`}
									>
										{menu.title}
									</span>
								</li>
							</Link>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default SidebarStyle;
