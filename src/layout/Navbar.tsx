import { Fragment, useContext, useState } from "react";

import { IoMdNotifications } from "react-icons/io";
import Drawer from "./Drawer";
import { Dropdown } from "flowbite-react";
import { RootContext } from "../utils/contextApi";
import { LIST_USER } from "../data/users";
import { UserCredentialTypes, UserTypes } from "../models/auth";
import { CONFIG } from "../configs";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logos/bgw_simerdeka.jpeg";

const Navbar = () => {
	const [openDrawer, setOpenDrawer] = useState(false);
	const { role, setRole, currentUser }: any = useContext(RootContext);
	const navigate = useNavigate();

	const handleSaveUserCredential = (userRole: string) => {
		const user = LIST_USER.find((user: UserTypes) => {
			return user.user_role === userRole;
		});
		localStorage.setItem(CONFIG.local_storage_key, JSON.stringify(user));
	};

	const handleSelectRole = (userRole: string) => {
		handleSaveUserCredential(userRole);
		setRole(userRole);
		navigate("/");
		window.location.reload();
	};

	return (
		<nav className="bg-white border-2 border-black-200  pr-10 rounded">
			<div className="container flex justify-between items-center mx-auto">
				<div className="flex items-center mx-auto">
					<img className="p-1 mx-2" src={Logo} alt="Logo" />
				</div>

				<div className="flex justify-end items-center pt-4 sm:mr-5">
					<IoMdNotifications
						onClick={() => setOpenDrawer(!openDrawer)}
						className="text-3xl mx-2 sm:mr-5 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full"
					/>
					<Dropdown inline={true} label={role} dismissOnClick={true}>
						<Dropdown.Item onClick={() => handleSelectRole("mahasiswa")}>
							Mahasiswa
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSelectRole("prodi")}>
							Prodi
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSelectRole("jurusan")}>
							Jurusan
						</Dropdown.Item>
						<Dropdown.Item onClick={() => handleSelectRole("akademik")}>
							Akadmik
						</Dropdown.Item>
					</Dropdown>

					<img
						className="p-1 w-12 h-12 mx-2 rounded-full cursor-pointer"
						src={
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU"
						}
						alt="avatar"
					/>
					{/* <UserPopUp name={session.adminName} email={session.email} photo={session.photo}>
						<img
							className="p-1 w-10 h-10 mx-2 rounded-full ring-2 ring-teal-500 cursor-pointer dark:ring-gray-500"
							src={session.photo}
							alt="avatar"
						/>
					</UserPopUp> */}
				</div>
				<Drawer isOpen={openDrawer} setIsOpen={setOpenDrawer}>
					{[1, 2, 3, 4, 5].map((data) => (
						<Card key={data} />
					))}
				</Drawer>
			</div>
		</nav>
	);
};

// function UserPopUp({ children, photo, email, name }: any) {
// 	return (
// 		<Popover className="relative">
// 			<Popover.Button>{children}</Popover.Button>
// 			<Transition
// 				as={Fragment}
// 				enter="transition ease-out duration-200"
// 				enterFrom="opacity-0 translate-y-1"
// 				enterTo="opacity-100 translate-y-0"
// 				leave="transition ease-in duration-150"
// 				leaveFrom="opacity-100 translate-y-0"
// 				leaveTo="opacity-0 translate-y-1"
// 			>
// 				<Popover.Panel className="absolute right-0 z-20 mt-2 w-64 max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
// 					<div className="w-full max-w-sm p-5 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
// 						<div className="flex flex-col items-center pb-10">
// 							<img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={photo} alt="Avatar" />
// 							<h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
// 							<span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
// 							<div className="flex mt-4 space-x-3 md:mt-6">
// 								<Popover.Button>
// 									<a
// 										href="#"
// 										className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-teal-500 rounded-lg hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
// 									>
// 										close
// 									</a>
// 								</Popover.Button>
// 								<Link to="/logout">
// 									<Button title="Logout" />
// 								</Link>
// 							</div>
// 						</div>
// 					</div>
// 				</Popover.Panel>
// 			</Transition>
// 		</Popover>
// 	);
// }

function Card() {
	return (
		<div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
			<div className="animate-pulse flex space-x-4">
				<div className="rounded-full bg-gray-400 h-12 w-12"></div>
				<div className="flex-1 space-y-4 py-1">
					<div className="h-4 bg-gray-400 rounded w-3/4"></div>
					<div className="space-y-2">
						<div className="h-4 bg-gray-400 rounded"></div>
						<div className="h-4 bg-gray-400 rounded w-5/6"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
