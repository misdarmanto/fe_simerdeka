import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton, ListSubheader, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logos/bgw_simerdeka.jpeg";
import { RootContext } from "../utils/contextApi";
import { UserTypes } from "../models/user";
import React, { useContext, useEffect, useState } from "react";
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
import { ServiceHttp } from "../services/api";
import { FaUser } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";

const drawerWidth = 350;

type MyComponentProps = {
	windowObject?: () => Window;
};

const AppLayout: React.FC<MyComponentProps> = ({ windowObject }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const [role, setRole] = useState<string>();
	const [currentUser, setCurrentUser] = useState<UserTypes>();
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

	const fecthCurrentUser = async () => {
		const serviceHttp = new ServiceHttp();
		const result = await serviceHttp.get({
			path: "/users",
		});
		setCurrentUser(result);
	};

	const checkUserAuth = async () => {
		try {
			const userCredential = localStorage.getItem(CONFIG.local_storage_key);
			if (!userCredential) {
				localStorage.setItem(
					CONFIG.local_storage_key,
					JSON.stringify(LIST_USER[0])
				);
				setRole(LIST_USER[0].userRole);
				await fecthCurrentUser();
			} else {
				const user: UserTypes = JSON.parse(userCredential + "");
				setRole(user.userRole);
				await fecthCurrentUser();
			}
			setIsLoading(false);
		} catch (err: any) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		checkUserAuth();
		console.log("route load");
	}, [role]);

	if (isLoading) return <h1>Loading...</h1>;

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
		<RootContext.Provider value={{ role, setRole, currentUser }}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
				>
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
								<Dropdown
									inline={true}
									label={currentUser?.userName}
									dismissOnClick={true}
								>
									{LIST_USER.map((user: UserTypes) => (
										<Dropdown.Item
											onClick={() => handleSelectRole(user)}
										>
											{user.userName}
										</Dropdown.Item>
									))}
								</Dropdown>
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
		</RootContext.Provider>
	);
};

export default AppLayout;
