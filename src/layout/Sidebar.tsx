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
import { BsPersonVcard, BsQuestionCircle } from "react-icons/bs";
import { RootContext } from "../utils/contextApi";

const SidebarStyle = () => {
	const [openSideBar, setOpenSideBar] = useState(false);
	const location = useLocation();
	const { role }: any = useContext(RootContext);

	const handleOpenSideBar = () => {
		const STORAGE_KEY = "simerdeka-sidebar-config";
		const sidebarConfig = localStorage.getItem(STORAGE_KEY);

		if (sidebarConfig) {
			const isOpen = JSON.parse(sidebarConfig + "");
			setOpenSideBar(!isOpen);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(!openSideBar));
		} else {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(!openSideBar));
			setOpenSideBar(!openSideBar);
		}

		setOpenSideBar(!openSideBar);
	};

	const HomeMenu = { title: "Home", path: "/", icon: <AiOutlineHome /> };

	const RecomendationLetterMenu = {
		title: "Surat Rekomendasi",
		path: "/recomendation-letters",
		icon: <AiOutlineAudit />,
	};

	const MBKMProgramStudentMenu = {
		title: "My Program",
		path: "/mbkm-programs/students",
		icon: <AiOutlineFolderOpen />,
	};

	const MBKMProgramMenu = {
		title: "MBKM Program",
		path: "/mbkm-programs",
		icon: <AiOutlineFolderOpen />,
	};

	const ReportParticipationMenu = {
		title: "Lapor Keikutsertaan",
		path: "/report-participations",
		icon: <BsPersonVcard />,
	};

	const ProgramProposalMenu = {
		title: "Program Proposal",
		path: "/program-proposal",
		icon: <AiOutlineFile />,
	};

	const StudentMenu = {
		title: "Mahasiswa",
		path: "/students",
		icon: <FaUserGraduate />,
	};

	const StudyProgramMenu = {
		title: "Study Program",
		path: "/study-programs",
		icon: <AiOutlineFundProjectionScreen />,
	};

	const SemesterMenu = {
		title: "Semester",
		path: "/semesters",
		icon: <FaRegListAlt />,
	};

	const MBKMLogBookMenu = {
		title: "Log book",
		path: "/log-books",
		icon: <FiFileText />,
	};

	const ManageUserMenu = {
		title: "Manage User",
		path: "/manage-users",
		icon: <BiUser />,
	};

	const LogActivityMenu = {
		title: "Log Activity",
		path: "/log-activities",
		icon: <AiOutlineSearch />,
	};

	const FaQMenu = { title: "FaQ", path: "/FaQ", icon: <BsQuestionCircle /> };

	const studentMenus = [
		HomeMenu,
		RecomendationLetterMenu,
		MBKMProgramStudentMenu,
		ReportParticipationMenu,
		// ProgramProposalMenu,
		MBKMLogBookMenu,
		FaQMenu,
	];

	const prodiMenus = [
		HomeMenu,
		StudentMenu,
		RecomendationLetterMenu,
		MBKMProgramMenu,
		ReportParticipationMenu,
		// ProgramProposalMenu,
		MBKMLogBookMenu,
		FaQMenu,
	];

	const jurusanMenus = [
		HomeMenu,
		StudentMenu,
		RecomendationLetterMenu,
		MBKMProgramMenu,
		ReportParticipationMenu,
		StudyProgramMenu,
		MBKMLogBookMenu,
		FaQMenu,
	];

	const LP3MMenus = [
		HomeMenu,
		StudentMenu,
		SemesterMenu,
		MBKMProgramMenu,
		ReportParticipationMenu,
		RecomendationLetterMenu,
		StudyProgramMenu,
		MBKMLogBookMenu,
		// ManageUserMenu,
		LogActivityMenu,
		FaQMenu,
	];

	const AcademicMenus = [
		HomeMenu,
		StudentMenu,
		MBKMProgramMenu,
		ReportParticipationMenu,
		RecomendationLetterMenu,
		LogActivityMenu,
		FaQMenu,
	];

	type MenuTypes = {
		title: string;
		path: string;
		icon: any;
	};

	let MENUS: MenuTypes[] = [];

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
		<div className="border-2 border-black-200">
			<ul
				className={`${
					openSideBar ? "w-60" : "w-fit"
				} sm:block relative min-h-screen duration-100 p-2 border-gray-200`}
			>
				<li
					onClick={handleOpenSideBar}
					className={`flex items-center gap-x-6 p-2 my-1 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200`}
				>
					{openSideBar ? (
						<>
							<RiCloseLine className="text-3xl text-gray-500" />
							<small>Close</small>
						</>
					) : (
						<BiMenu
							onClick={handleOpenSideBar}
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
								className={`flex items-center text-gray-600 my-1 gap-x-2 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-gray-200
                        ${isActive && "bg-yellow-100 text-gray-900 font-bold"}`}
							>
								<span className="text-xl">{menu.icon}</span>
								<span
									className={`${
										!openSideBar && "hidden"
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
