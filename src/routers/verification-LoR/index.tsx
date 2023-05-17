import { Table } from "flowbite-react";

const VerificationLoR = () => {
	const students = [
		{ nama: "Budi", NIM: 120334444, prodi: "ilmu komputer" },
		{ nama: "Budi", NIM: 120334444, prodi: "ilmu komputer" },
		{ nama: "Budi", NIM: 120334444, prodi: "ilmu komputer" },
		{ nama: "Budi", NIM: 120334444, prodi: "ilmu komputer" },
		{ nama: "Budi", NIM: 120334444, prodi: "ilmu komputer" },
	];
	return (
		<div>
			<Table hoverable={true}>
				<Table.Head>
					<Table.HeadCell>No</Table.HeadCell>
					<Table.HeadCell>Nama</Table.HeadCell>
					<Table.HeadCell>Nim</Table.HeadCell>
					<Table.HeadCell>Prodi</Table.HeadCell>
					<Table.HeadCell>Action</Table.HeadCell>
				</Table.Head>
				<Table.Body className="divide-y">
					{students.map((item, index) => (
						<Table.Row
							key={index}
							className="bg-white dark:border-gray-700 dark:bg-gray-800"
						>
							<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
								{index + 1}
							</Table.Cell>
							<Table.Cell>{item.nama}</Table.Cell>
							<Table.Cell>{item.NIM}</Table.Cell>
							<Table.Cell>{item.prodi}</Table.Cell>
							<Table.Cell>
								<a className="font-medium text-blue-600 hover:underline dark:text-blue-500">
									Detail
								</a>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
				{/* <Pagination
					currentPage={1}
					onPageChange={() => null}
					showIcons={true}
					totalPages={100}
				/> */}
			</Table>
		</div>
	);
};

export default VerificationLoR;
