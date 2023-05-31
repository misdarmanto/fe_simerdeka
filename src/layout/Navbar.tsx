import { useContext, useState } from "react";
import { Dropdown } from "flowbite-react";
import { RootContext } from "../utils/contextApi";
import { LIST_USER } from "../data/users";
import { UserTypes } from "../models/auth";
import { CONFIG } from "../configs";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logos/bgw_simerdeka.jpeg";

const Navbar = () => {
	const { role, setRole, currentUser }: any = useContext(RootContext);
	const navigate = useNavigate();

	const handleSaveUserCredential = (selectedUser: UserTypes) => {
		const user = LIST_USER.find((user: UserTypes) => {
			return user.user_id === selectedUser.user_id;
		});
		localStorage.setItem(CONFIG.local_storage_key, JSON.stringify(user));
	};

	const handleSelectRole = (user: UserTypes) => {
		handleSaveUserCredential(user);
		setRole(user.user_role);
		navigate("/");
		window.location.reload();
	};

	return (
		<nav className="bg-white border-2 border-black-200 sm:pr-10 rounded">
			<div className="container flex justify-between items-center mx-auto">
				<div className="flex items-center mx-auto">
					<img className="p-1 mx-2" src={Logo} alt="Logo" />
				</div>

				<div className="flex justify-end items-center pt-4 sm:mr-5">
					<Dropdown
						inline={true}
						label={currentUser.user_name}
						dismissOnClick={true}
					>
						{LIST_USER.map((user: UserTypes) => (
							<Dropdown.Item onClick={() => handleSelectRole(user)}>
								{user.user_name}
							</Dropdown.Item>
						))}
					</Dropdown>

					<img
						className="p-1 sm:w-12 h-12 sm:mx-2 rounded-full cursor-pointer"
						src={
							"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjYmlp9JDeNMaFZzw9S3G1dVztGqF_2vq9nA&usqp=CAU"
						}
						alt="avatar"
					/>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
