import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Stack, colors, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logos/bgw_simerdeka.jpeg";
import { RootContext } from "../utils/contextApi";
import { UserTypes } from "../models/user";
import React, { useContext, useState } from "react";
import NavbarItemGroup from "./navbar-item";
import { Logout } from "@mui/icons-material";
import {
	AcademicMenus,
	LP3MMenus,
	jurusanMenus,
	prodiMenus,
	studentMenus,
} from "./listMenu";
import { CONFIG } from "../configs";
import { LIST_USER } from "../data/users";
import { FaUser } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

const drawerWidth = 300;

type MyComponentProps = {
	windowObject?: () => Window;
};

const AppLayout: React.FC<MyComponentProps> = ({ windowObject }) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const { currentUser, role, setRole }: any = useContext(RootContext);

	const theme = useTheme();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [isLoading, setIsLoading] = useState(true);

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

	const drawer = (
		<div>
			<Toolbar />
			<NavbarItemGroup title="Menu Utama" items={MENUS?.persiapan || []} />
			<NavbarItemGroup title="Persiapan MBKM" items={MENUS?.pelaksanaan || []} />
			<NavbarItemGroup title="Laporan Kegiatan" items={MENUS?.akhir || []} />
		</div>
	);

	const container =
		windowObject !== undefined ? () => windowObject().document.body : undefined;

	return (
		<Box component="div" sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={0}>
				<Toolbar>
					<IconButton
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
						sx={{
							flexGrow: 1,
							[theme.breakpoints.down("sm")]: {
								display: "none",
							},
						}}
					>
						Semester Aktif: 2022/2023 Genap
					</Typography>
					<Stack direction={"row"} spacing={2}>
						<Button sx={{ color: "#FFF" }} startIcon={<FaUser />}>
							<Dropdown
								inline={true}
								label={currentUser?.userName}
								dismissOnClick={true}
							>
								{LIST_USER.map((user: UserTypes) => (
									<Dropdown.Item onClick={() => handleSelectRole(user)}>
										{user.userName}
									</Dropdown.Item>
								))}
							</Dropdown>
						</Button>

						<Button sx={{ color: "#FFF" }} startIcon={<Logout />}>
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
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
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
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default AppLayout;
