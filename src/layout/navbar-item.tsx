import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
} from "@mui/material";
import { Link } from "react-router-dom";

type MenuItems = { title: string; path: string; icon: any };

interface NavbarItemGroupTypes {
	title: String;
	items: MenuItems[];
}

const NavbarItemGroup = ({ title, items }: NavbarItemGroupTypes) => {
	return (
		<List
			sx={{
				border: 1,
				borderColor: "#DDDDDD",
				mx: 1,
				mt: 2,
				mb: 5,
				p: 0,
				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.010)",
			}}
			subheader={
				<ListSubheader
					component="h1"
					sx={{
						backgroundColor: "#F1F1F1",
						fontSize: 12,
						height: "38px",
						color: "#4B5563",
					}}
				>
					{title}
				</ListSubheader>
			}
		>
			{items.map((item: MenuItems, index) => (
				<Link to={item.path}>
					<ListItem
						key={index}
						sx={{
							color: "#4B5563",
							border: 1,
							borderColor: "#DDDDDD",
							height: "38px",
						}}
						disablePadding
					>
						<ListItemButton>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText
								primary={item.title}
								primaryTypographyProps={{ style: { fontSize: "12px" } }}
							/>
						</ListItemButton>
					</ListItem>
				</Link>
			))}
		</List>
	);
};

export default NavbarItemGroup;
