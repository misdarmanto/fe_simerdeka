import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Button, IconButton, ListSubheader, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logos/bgw_simerdeka.jpeg";
import { RootContext } from "../utils/contextApi";
import { UserTypes } from "../models/user";
import React, { useContext, useState } from "react";
import {
	AiOutlineAudit,
	AiOutlineFile,
	AiOutlineFolderOpen,
	AiOutlineFundProjectionScreen,
	AiOutlineHome,
	AiOutlineSearch,
} from "react-icons/ai";
import { BiBookOpen, BiMenu, BiUser } from "react-icons/bi";
import { FaRegListAlt, FaUser, FaUserGraduate } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { BsPersonVcard, BsQuestionCircle } from "react-icons/bs";
import NavbarItemGroup from "./navbar-item";
import { Logout } from "@mui/icons-material";

const drawerWidth = 350;

type MyComponentProps = {
	children: React.ReactNode;
	window?: () => Window;
};

const AppLayout: React.FC<MyComponentProps> = ({ children, window }) => {
	const { role }: any = useContext(RootContext);

	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;

	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const HomeMenu = {
		title: "Beranda",
		path: "/",
		icon: <AiOutlineHome fontSize={20} />,
	};

	const RecomendationLetterMenu = {
		title: "Surat Rekomendasi",
		path: "/recomendation-letters",
		icon: <AiOutlineAudit fontSize={20} />,
	};

	const MBKMProgramStudentMenu = {
		title: "Program Saya",
		path: `/mbkm-programs/students/${user.userId}`,
		icon: <AiOutlineFolderOpen fontSize={20} />,
	};

	const MBKMProgramMenu = {
		title: "Program MBKM",
		path: "/mbkm-programs",
		icon: <AiOutlineFolderOpen fontSize={20} />,
		child: [
			{
				title: "Program MBKM",
				path: "/mbkm-programs",
				icon: <AiOutlineFolderOpen fontSize={20} />,
			},
		],
	};

	const MBKMProgramProdiMenu = {
		title: "Program MBKM",
		path: "/mbkm-programs/prodi",
		icon: <AiOutlineFolderOpen fontSize={20} />,
	};

	const ReportParticipationMenu = {
		title: "Lapor Keikutsertaan",
		path: "/report-participations",
		icon: <BsPersonVcard fontSize={20} />,
	};

	const ProgramProposalMenu = {
		title: "Program Proposal",
		path: "/program-proposal",
		icon: <AiOutlineFile fontSize={20} />,
	};

	const StudentMenu = {
		title: "Mahasiswa",
		path: "/students",
		icon: <FaUserGraduate fontSize={20} />,
	};

	const StudyProgramMenu = {
		title: "Program Studi",
		path: "/study-programs",
		icon: <AiOutlineFundProjectionScreen fontSize={20} />,
	};

	const SemesterMenu = {
		title: "Semester",
		path: "/semesters",
		icon: <FaRegListAlt fontSize={20} />,
	};

	const MBKMLogBookMenu = {
		title: "Log book",
		path: "/log-books",
		icon: <FiFileText fontSize={20} />,
	};

	const MataKuliahMenu = {
		title: "Mata Kuliah",
		path: "/mata-kuliah",
		icon: <BiBookOpen fontSize={20} />,
	};

	const ManageUserMenu = {
		title: "Manage User",
		path: "/manage-users",
		icon: <BiUser fontSize={20} />,
	};

	const LogActivityMenu = {
		title: "Log aktifitas",
		path: "/log-activities",
		icon: <AiOutlineSearch fontSize={20} />,
	};

	const FaQMenu = {
		title: "FaQ",
		path: "/FaQ",
		icon: <BsQuestionCircle fontSize={20} />,
	};

	const studentMenus = {
		persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
		pelaksanaan: [MBKMProgramStudentMenu],
		akhir: [MBKMLogBookMenu, FaQMenu],
	};

	const prodiMenus = {
		persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
		pelaksanaan: [StudentMenu, MBKMProgramProdiMenu, MataKuliahMenu],
		akhir: [MBKMLogBookMenu, FaQMenu],
	};

	const jurusanMenus = {
		persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
		pelaksanaan: [StudentMenu, StudyProgramMenu, MBKMProgramMenu],
		akhir: [MBKMLogBookMenu, FaQMenu],
	};

	const LP3MMenus = {
		persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
		pelaksanaan: [StudentMenu, StudyProgramMenu, SemesterMenu, MBKMProgramMenu],
		akhir: [MBKMLogBookMenu, LogActivityMenu, FaQMenu],
	};

	const AcademicMenus = {
		persiapan: [HomeMenu, ReportParticipationMenu, RecomendationLetterMenu],
		pelaksanaan: [StudentMenu, StudyProgramMenu, SemesterMenu, MBKMProgramMenu],
		akhir: [MBKMLogBookMenu, LogActivityMenu, FaQMenu],
	};

	type MenuItems = { title: string; path: string; icon: any };
	type MenuTypes = {
		persiapan: MenuItems[];
		pelaksanaan: MenuItems[];
		akhir: MenuItems[];
	};

	let MENUS: MenuTypes | null = null;

	console.log(role);

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

	const drawer = (
		<div>
			<Toolbar />
			<NavbarItemGroup title="Menu Utama" items={MENUS?.persiapan || []} />
			<NavbarItemGroup title="Persiapan MBKM" items={MENUS?.pelaksanaan || []} />
			<NavbarItemGroup title="Laporan Kegiatan" items={MENUS?.akhir || []} />
		</div>
	);

	const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="body2"
						noWrap
						component="div"
						color={"#FFF"}
						sx={{ flexGrow: 1 }}
					>
						Semester Aktif: 2022/2023 Genap
					</Typography>
					<Stack direction={"row"} spacing={2}>
						<Button color="inherit" startIcon={<FaUser />}>
							User
						</Button>
						<Button color="inherit" startIcon={<Logout />}>
							Logout
						</Button>
					</Stack>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							border: "none",
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

export default AppLayout;
