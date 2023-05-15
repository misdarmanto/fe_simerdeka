import Typography from "../components/typography";
import CardStyle from "../components/card";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuTypes } from "../types";
import { ServiceApi } from "../services/api";
import { CONFIG } from "../configs";

const Menu = () => {
	const [listMenu, setListMenu] = useState<MenuTypes[]>([]);
	const [serchResult, setSerachResult] = useState<MenuTypes[]>([]);

	const fecthData = async () => {
		const serviceApi = new ServiceApi(CONFIG.base_url_api);
		const menus = await serviceApi.get("/menu/list");
		setListMenu(menus.items);
		setSerachResult(menus.items);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
		if (event.target.value === "") {
			setSerachResult(listMenu);
			return;
		}
		const result = listMenu.filter((item: MenuTypes) => {
			if (item.title.toUpperCase().search(event.target.value.toUpperCase()) !== -1) return item;
		});
		setSerachResult(result);
	};

	return (
		<div>
			<Typography variant="h2" className="text-center mb-10">
				All Menu
			</Typography>

			<form className="flex items-center mb-20">
				<label className="sr-only">Search</label>
				<div className="relative w-full">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
								clip-rule="evenodd"
							></path>
						</svg>
					</div>
					<input
						type="text"
						onChange={handleSearch}
						id="simple-search"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 p-2.5"
						placeholder="Search"
						required
					/>
				</div>
			</form>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				{serchResult.length === 0 && (
					<div className="flex items-center justify-center">
						<Typography variant="h5">Opss!... Menu tidak ada</Typography>
					</div>
				)}
				{serchResult.map((item: MenuTypes) => (
					<Link to={`/menu/detail/${item.id}`}>
						<CardStyle
							key={item.id}
							className="w-full sm:w-64"
							title={item.title}
							price={item.price}
							image={item.image}
							stars={item.stars}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Menu;
