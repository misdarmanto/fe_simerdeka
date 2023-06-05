import { ReactElement, useEffect, useState } from "react";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Modal, TextInput } from "flowbite-react";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { StudentTypes } from "../../models/student";
import { MbkmProgramProdiTypes } from "../../models/mbkm-program-prodi";

interface ModalAddStudentTypes {
	onOpen: (item: boolean) => void;
	isOpen: boolean;
	mbkmProgram?: MbkmProgramProdiTypes;
}

const ModalAddStudent = ({ onOpen, isOpen, mbkmProgram }: ModalAddStudentTypes) => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [studentSelected, setStudentSelected] = useState<StudentTypes>();

	const [isLoading, setIsLoading] = useState(true);
	const httpService = new ServiceHttp();

	const handleSelectStudent = (student: StudentTypes) => {
		if (student.student_id === studentSelected?.student_id) {
			setStudentSelected({});
			return;
		}
		const newData: StudentTypes = {
			student_id: student.student_id,
			student_mbkm_program_id: mbkmProgram?.mbkm_program.mbkm_program_id,
		};
		setStudentSelected(newData);
	};

	const handleSubmit = async () => {
		if (studentSelected) {
			await httpService.patch({
				path: `/students`,
				body: studentSelected,
			});
		}
		onOpen(false);
		window.location.reload();
	};

	const fecthStudents = async () => {
		try {
			const result = await httpService.getTableData({
				url: CONFIG.base_url_api + `/students`,
				pagination: true,
				page: 0,
				size: 10,
				filters: {
					search: "",
					mbkm_program_id: null,
				},
			});

			setListOfStudent({
				link: `/students`,
				data: result,
				page: 0,
				size: 10,
				filter: {
					search: "",
					mbkm_program_id: null,
				},
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const tableHeaderStudent: TableHeader[] = [
		{
			title: "No",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.student_name}
				</td>
			),
		},

		{
			title: "total sks",
			data: (data: StudentTypes, index: number): ReactElement => (
				<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
					{data.student_email}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: StudentTypes, index: number): ReactElement => {
				const isActive = data.student_id === studentSelected?.student_id;
				console.log(isActive);
				return (
					<td key={index + "action"}>
						<ButtonStyle
							title="pilih"
							size="xs"
							color={isActive ? "dark" : "light"}
							className="mx-2"
							onClick={() => {
								handleSelectStudent(data);
							}}
						/>
					</td>
				);
			},
		},
	];

	const fecthData = async () => {
		await fecthStudents();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;

	return (
		<Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
			<Modal.Header>Daftar Mahasiswa</Modal.Header>
			<Modal.Body>
				<div className="flex flex-col md:flex-row justify-between md:px-0">
					<div className="flex items-center justify-between">
						<div className="mr-2 flex flex-row justify-between md:justify-start">
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
					</div>
					<div className="mt-1 w-full md:w-1/5">
						<TextInput type="text" placeholder="search..." />
					</div>
				</div>
				<TableStyle header={tableHeaderStudent} table={listOfStudent} />
				<div className="flex justify-end">
					<ButtonStyle
						disabled={!studentSelected}
						title="Tambahkan"
						type="submit"
						color="dark"
						onClick={handleSubmit}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalAddStudent;
