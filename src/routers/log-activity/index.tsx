import { Button, Pagination, Table } from "flowbite-react";

const LogActivity = () => {
	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="w-96">
				<h1 className="text-center mb-4">Login</h1>
				<Table>
					<Table.Head>
						<Table.Row>
							<Table.HeadCell>Nama</Table.HeadCell>
							<Table.HeadCell>Nim</Table.HeadCell>
							<Table.HeadCell>Prodi</Table.HeadCell>
							<Table.HeadCell>Action</Table.HeadCell>
						</Table.Row>
					</Table.Head>
					<Table.Body>{/* Add table rows here */}</Table.Body>
				</Table>
				<Pagination
					totalPages={5} // Replace with the actual number of pages
					currentPage={1} // Replace with the current page number
					onPageChange={(pageNumber) => console.log(pageNumber)} // Replace with your own logic
					className="mt-4"
				/>
				<Button onClick={() => null} className="mt-4">
					Add
				</Button>
			</div>
		</div>
	);
};

export default LogActivity;
