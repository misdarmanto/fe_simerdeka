import axios from "axios";
import { Button, Pagination, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoRTypes } from "../../models/request-LoR";

const VerificationLoR = () => {
	const navigate = useNavigate();

	const [listLoR, setListLoR] = useState<LoRTypes[]>([]);

	const fecthData = async () => {
		const result = await axios.get("http://localhost:8000/registration-LoR/all");
		setListLoR(result.data.data.items);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="bg-white border border-gray-200 rounded-lg py-2">
			<div className="flex justify-between items-center px-2">
				<Button
					onClick={() => navigate("/request-LoR/create")}
					className="bg-yellow-400 hover:bg-yellow-500 my-2"
				>
					Create
				</Button>

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
					<Table.HeadCell>Nama</Table.HeadCell>
					<Table.HeadCell>Nim</Table.HeadCell>
					<Table.HeadCell>Status</Table.HeadCell>
					<Table.HeadCell>Nama Program</Table.HeadCell>
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
								<a
									onClick={() =>
										navigate(`/request-LoR/detail/${item.registration_lor_id}`)
									}
									className="font-medium text-yellow-400 hover:underline cursor-pointer"
								>
									Detail
								</a>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
			<Pagination currentPage={1} totalPages={100} onPageChange={() => {}} />
		</div>
	);
};

export default VerificationLoR;
