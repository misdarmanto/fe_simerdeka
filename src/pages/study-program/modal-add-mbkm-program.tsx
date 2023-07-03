import { ReactElement, useEffect, useState } from "react";
import { ButtonStyle } from "../../components";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Modal, TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import {
	MbkmProgramProdiCreateRequestTypes,
	MbkmProgramProdiSelected,
} from "../../models/mbkm-program-prodi";
import { StudyProgramTypes } from "../../models/study-program";
import { useHttp } from "../../hooks/useHttp";

interface ModalSelectMbkmProgramTypes {
	onOpen: (item: boolean) => void;
	isOpen: boolean;
	studyProgram?: StudyProgramTypes;
}

const ModalSelectMbkmProgram = ({
	onOpen,
	isOpen,
	studyProgram,
}: ModalSelectMbkmProgramTypes) => {
	const [listMbkmProgram, setListMbkmProgram] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const [mbkmProgramSelected, setMbkmProgramSelected] = useState<
		MbkmProgramProdiSelected[]
	>([]);
	const { handlePostRequest, handleGetTableDataRequest } = useHttp();

	const handleSubmit = async () => {
		if (mbkmProgramSelected) {
			handlePostRequest({
				path: `/mbkm-programs/prodi`,
				body: mbkmProgramSelected,
			});
		}
		onOpen(false);
		window.location.reload();
	};

	const handleSelectMbkmProgram = (mbkmProgram: MbkmProgramTypes) => {
		const check = mbkmProgramSelected.find((item) => {
			return item.mbkmProgramProdiProgramId === mbkmProgram.mbkmProgramId;
		});

		if (check) {
			const newData = mbkmProgramSelected.filter((item) => {
				return item.mbkmProgramProdiProgramId !== mbkmProgram.mbkmProgramId;
			});
			setMbkmProgramSelected(newData);
		} else {
			const data: MbkmProgramProdiCreateRequestTypes = {
				mbkmProgramProdiProgramId: mbkmProgram.mbkmProgramId,
				mbkmProgramProdiStudyProgramId: studyProgram?.studyProgramId + "",
				mbkmProgramProdiStudyProgramName: studyProgram?.studyProgramName + "",
				mbkmProgramProdiDepartmentId: studyProgram?.studyProgramDepartmentId + "",
				mbkmProgramProdiDepartmentName:
					studyProgram?.studyProgramDepartmentName + "",
			};

			setMbkmProgramSelected([...mbkmProgramSelected, data]);
		}
	};

	const fecthMbkmPrograms = async () => {
		const filters: any = {};
		const result = await handleGetTableDataRequest({
			path: "/mbkm-programs",
		});
		setListMbkmProgram({
			link: "/mbkm-programs",
			data: result,
			page: 0,
			size: 10,
			filters,
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fecthMbkmPrograms();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: MbkmProgramTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama Program",
			data: (data: MbkmProgramTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgramName}
				</td>
			),
		},

		{
			title: "Jenis Program",
			data: (data: MbkmProgramTypes, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgramCategory.length > 10
						? data.mbkmProgramCategory.slice(0, 10) + "....."
						: data.mbkmProgramCategory}
				</td>
			),
		},

		{
			title: "Silabus",
			data: (data: MbkmProgramTypes, index: number): ReactElement => (
				<td key={index + "silabus"} className="md:px-6 md:py-3 break-all">
					<a href={data.mbkmProgramSyllabus} target="blank">
						<ButtonStyle color="light" title={`Lihat file`} />
					</a>
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: MbkmProgramTypes, index: number): ReactElement => {
				const isButtonActive = mbkmProgramSelected.find(
					(item: MbkmProgramProdiSelected) => {
						return item.mbkmProgramProdiProgramId === data.mbkmProgramId;
					}
				);

				return (
					<td key={index + "action"}>
						<div>
							<ButtonStyle
								title="pilih"
								color={isButtonActive ? "dark" : "light"}
								onClick={() => {
									handleSelectMbkmProgram(data);
								}}
							/>
						</div>
					</td>
				);
			},
		},
	];

	if (isLoading) return <p>loading...</p>;

	return (
		<Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
			<Modal.Header>Daftar MBKM Program</Modal.Header>
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
				<TableStyle header={header} table={listMbkmProgram} />
				<div className="flex justify-end">
					<ButtonStyle
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

export default ModalSelectMbkmProgram;
