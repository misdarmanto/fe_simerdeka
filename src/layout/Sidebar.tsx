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
import { FaRegListAlt, FaUserGraduate } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { RootContext } from "../utils/contextApi";

const SidebarStyle = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	const { role }: any = useContext(RootContext);

	const studentMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{
			title: "Surat Rekomendasi",
			path: "/recomendation-letter",
			icon: <AiOutlineAudit />,
		},
		{ title: "My Program", path: "/my-programs", icon: <AiOutlineFolderOpen /> },
		{ title: "Program Proposal", path: "/program-proposal", icon: <AiOutlineFile /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const prodiMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{
			title: "Surat Rekomendasi",
			path: "/recomendation-letter",
			icon: <AiOutlineAudit />,
		},
		{ title: "MBKM Program", path: "/mbkm-programs", icon: <AiOutlineFolderOpen /> },
		{ title: "Student", path: "/students", icon: <FaUserGraduate /> },
		{ title: "Program Proposal", path: "/program-proposal", icon: <AiOutlineFile /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const jurusanMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{
			title: "Surat Rekomendasi",
			path: "/recomendation-letter",
			icon: <AiOutlineAudit />,
		},
		{ title: "MBKM Program", path: "/mbkm-programs", icon: <AiOutlineFolderOpen /> },
		{
			title: "Study Program",
			path: "/study-programs",
			icon: <AiOutlineFundProjectionScreen />,
		},
		{ title: "Summary MBKM", path: "/mbkm-summaries", icon: <FiFileText /> },
		{ title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> },
	];

	const akademikMenus = [
		{ title: "Home", path: "/", icon: <AiOutlineHome /> },
		{ title: "Manage User", path: "/manage-users", icon: <BiUser /> },
		{ title: "Semester", path: "/semesters", icon: <FaRegListAlt /> },
		{
			title: "MBKM Program",
			path: "/mbkm-programs/academic",
			icon: <AiOutlineFolderOpen />,
		},
		{
			title: "Surat Rekomendasi",
			path: "/recomendation-letter",
			icon: <AiOutlineAudit />,
		},
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
		case "akademik":
			MENUS = akademikMenus;
			break;
		default:
			break;
	}

	return (
		<div className="border-2 border-black-200">
			<ul
				className={`${
					open ? "w-60" : "w-fit"
				} sm:block relative h-screen duration-100 p-2 border-gray-200`}
			>
				<li
					onClick={() => setOpen(!open)}
					className={`flex items-center gap-x-6 p-2 my-1 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200`}
				>
					{open ? (
						<>
							<RiCloseLine className="text-3xl text-gray-500" />
							<small>Close</small>
						</>
					) : (
						<BiMenu
							onClick={() => setOpen(!open)}
							className="text-3xl text-gray-500"
						/>
					)}
				</li>
				{MENUS.map((menu, index) => {
					const currentPath = menu.path;
					const isActive = location.pathname === currentPath;
					return (
						<Link to={menu.path} key={index}>
							<li
								className={`flex items-center text-gray-500 my-1 gap-x-2 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200
                        ${isActive && "bg-yellow-100 text-gray"}`}
							>
								<span className="text-xl">{menu.icon}</span>
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
	);
};

export default SidebarStyle;
