import axios from "axios";
import { Breadcrumb, Button, Pagination, Table } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoRTypes } from "../../models/request-LoR";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceApi } from "../../services/api";
import { CONFIG } from "../../configs";
import { toMoney } from "../../utils";
import { TableHeader, TableStyle } from "../../components/table/Table";

const RegistrationLoR = () => {
	const navigate = useNavigate();

	const [listLoR, setListLoR] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);

	const fecthData = async () => {
		const httpService = new ServiceApi();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/registration-LoR/all",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListLoR({
			link: "registration-LoR/all",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});

		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "-name"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Name",
			data: (data: any, index: number): ReactElement => (
				<td key={index} className="md:px-6 md:py-3 break-all">
					{data.student_name.length > 10
						? data.student_name.slice(0, 10) + "....."
						: data.student_name}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: any, index: number): ReactElement => (
				<td key={index} className="md:px-6 md:py-3 break-all">
					{data.student_nim.length > 10
						? data.student_nim.slice(0, 10) + "..."
						: data.student_nim}
				</td>
			),
		},

		{
			title: "Status",
			data: (data: any, index: number): ReactElement => (
				<td key={index} className="md:px-6 md:py-3 break-all">
					{data.registration_status}
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "-action"} className="md:px-6 md:py-3">
					<div>
						<Link to={`/registration-LoR/detail/${data.registration_lor_id}`}>
							<ButtonStyle title="Detail" color="light" />
						</Link>
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/registration-LoR",
						title: "Registration LoR",
					},
					{
						link: "/registration-LoR",
						title: "List",
					},
				]}
				icon={BASE_MENU_ICON.LoRIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between mb-1 md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start">
						<select
							name="size"
							defaultValue={10}
							className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						>
							<option value="2">2</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
					<ButtonStyle
						title="Create"
						color="light"
						onClick={() => navigate("/registration-LoR/create")}
					/>
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<input
						defaultValue={""}
						name="search"
						className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`}
						placeholder="Search..."
						type="text"
					/>
				</div>
			</div>

			<TableStyle header={header} table={listLoR} />
		</div>
	);
};

export default RegistrationLoR;

{
	/* <div className="bg-white border border-gray-200 rounded-lg py-2">
				<div className="flex justify-between items-center px-2">
					<ButtonStyle
						title="Buat"
						color="dark"
						onClick={() => navigate("/request-LoR/create")}
					/>

					<div className="relative">
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
							id="simple-search"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search"
							required
						/>
					</div>
				</div>

				<Table hoverable={true} className="shadow-none">
					<Table.Head>
						<Table.HeadCell>No</Table.HeadCell>
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>NIM</Table.HeadCell>
						<Table.HeadCell>Status</Table.HeadCell>
						<Table.HeadCell>Program</Table.HeadCell>
						<Table.HeadCell>Action</Table.HeadCell>
					</Table.Head>
					<Table.Body className="divide-y shadow-none">
						{listLoR.map((item, index) => (
							<Table.Row
								key={index}
								className="bg-white dark:border-gray-700 dark:bg-gray-800"
							>
								<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
									{index + 1}
								</Table.Cell>
								<Table.Cell>{item.student_name}</Table.Cell>
								<Table.Cell>{item.student_nim}</Table.Cell>
								<Table.Cell>{item.registration_status}</Table.Cell>
								<Table.Cell>{item.program_name}</Table.Cell>
								<Table.Cell>
									<ButtonStyle
										title="Detail"
										color="light"
										onClick={() =>
											navigate(
												`/request-LoR/detail/${item.registration_lor_id}`
											)
										}
									/>
								</Table.Cell>
							</Table.Row>
						))}
					</Table.Body>
				</Table>
				<Pagination currentPage={1} totalPages={100} onPageChange={() => {}} />
			</div> */
}
