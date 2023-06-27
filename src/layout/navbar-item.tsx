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

import { CustomFlowbiteTheme, Flowbite, ListGroup } from "flowbite-react";

const NavbarItemGroup = ({ title, items }: NavbarItemGroupTypes) => {
	const customTheme: CustomFlowbiteTheme["listGroup"] = {
		root: {
			base: "list-none rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-left",
		},
		item: {
			base: "[&>*]:first:rounded-t-lg [&>*]:last:rounded-b-lg [&>*]:last:border-b-0",
			link: {
				base: "flex w-full border-b border-gray-200 py-2 px-4 dark:border-gray-600",
				active: {
					off: "hover:bg-gray-100 hover:text-gray-700 focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-gray-500",
					on: "bg-gray-700 text-white dark:bg-gray-800",
				},
				href: {
					off: "",
					on: "",
				},
				icon: "mr-2 h-4 w-4 fill-current",
			},
		},
	};

	return (
		<ListGroup theme={customTheme} className="m-3 mb-8 w-80 hover:color-gray">
			<ListGroup.Item className="bg-gray-200">
				<p>{title}</p>
			</ListGroup.Item>
			{items.map((item: MenuItems, index) => (
				<ListGroup.Item className="hover:bg-yellow-100" key={index}>
					<Link to={item.path} className="w-100">
						<div className="flex gap-5">
							{item.icon}
							{item.title}
						</div>
					</Link>
				</ListGroup.Item>
			))}
		</ListGroup>
	);
};

// const NavbarItemGroup = ({ title, items }: NavbarItemGroupTypes) => {
// 	return (
// 		<List
// 			sx={{
// 				border: 1,
// 				borderColor: "#DDDDDD",
// 				mx: 1,
// 				mt: 3,
// 				mb: 5,
// 				p: 0,
// 				boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.010)",
// 			}}
// 			subheader={
// 				<ListSubheader
// 					component="h1"
// 					sx={{
// 						backgroundColor: "#F7FAFC",
// 						fontSize: 12,

// 						color: "#4B5563",
// 					}}
// 				>
// 					{title}
// 				</ListSubheader>
// 			}
// 		>
// 			{items.map((item: MenuItems, index) => (
// 				<Link to={item.path}>
// 					<ListItem
// 						key={index}
// 						sx={{
// 							color: "#4B5563",
// 							border: 1,
// 							borderColor: "#DDDDDD",
// 							height: "38px",
// 						}}
// 						disablePadding
// 					>
// 						<ListItemButton>
// 							<ListItemIcon>{item.icon}</ListItemIcon>
// 							<ListItemText
// 								primary={item.title}
// 								primaryTypographyProps={{ style: { fontSize: "12px" } }}
// 							/>
// 						</ListItemButton>
// 					</ListItem>
// 				</Link>
// 			))}
// 		</List>
// 	);
// };

export default NavbarItemGroup;
