import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RegistrationLoR } from "../../models/request-LoR";

const RequestLoR = () => {
	const navigate = useNavigate();

	const [listRoL, setListRoL] = useState<RegistrationLoR[]>([]);

	const fecthData = async () => {
		const result = await axios.get("http://localhost:8000/registration-LoR/all");
		setListRoL(result.data.data.items);
		console.log(result.data.data.items);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow m-5 p-8">
			{/* <div className="flex items-center justify-center w-full">
				<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<AiOutlineFileAdd
							fontSize={40}
							color="gray"
							onClick={() => navigate("/request-LoR/create")}
						/>
					</div>
				</label>
			</div> */}

			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>No</Table.HeadCell>
					<Table.HeadCell>Nama</Table.HeadCell>
					<Table.HeadCell>Nim</Table.HeadCell>
					<Table.HeadCell>Prodi</Table.HeadCell>
					<Table.HeadCell>Action</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{listRoL.map((item, index) => (
						<Table.Row
							key={index}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{index + 1}
							</Table.Cell>
							<Table.Cell>{item.student_name}</Table.Cell>
							<Table.Cell>{item.student_nim}</Table.Cell>
							<Table.Cell>{item.program_name}</Table.Cell>
							<Table.Cell>
								<a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
									Detail
								</a>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		</div>
	);
};

export default RequestLoR;
