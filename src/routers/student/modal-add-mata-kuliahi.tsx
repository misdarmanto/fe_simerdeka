import { ReactElement, useEffect, useState } from "react";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Modal, TextInput } from "flowbite-react";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { StudyProgramTypes } from "../../models/study-program";
import { MbkmProgramProdiCreateRequestTypes } from "../../models/mbkm-program-prodi";
import { MataKuliahTypes } from "../../models/mata-kuliah";

interface ModalAddMataKuliahTypes {
	onOpen: (item: boolean) => void;
	isOpen: boolean;
	mbkmProgram?: MbkmProgramTypes;
}

const ModalAddMataKuliah = ({ onOpen, isOpen, mbkmProgram }: ModalAddMataKuliahTypes) => {
	const [listOfMataKuliah, setListOfMataKuliah] = useState<any>();

	const [mataKuliahSelected, setMataKuliahSelected] = useState<MataKuliahTypes[]>([]);

	const [isLoading, setIsLoading] = useState(true);
	const httpService = new ServiceHttp();

	const handleSelectStudyProgram = (studyProgram: StudyProgramTypes) => {
		// const check = mataKuliahSelected.find((item) => {
		// 	return (
		// 		item.mbkm_program_prodi_study_program_id === studyProgram.study_program_id
		// 	);
		// });
		// if (check) {
		// 	const newData = mataKuliahSelected.filter((item) => {
		// 		return (
		// 			item.mbkm_program_prodi_study_program_id !==
		// 			studyProgram.study_program_id
		// 		);
		// 	});
		// 	setMataKuliahSelected(newData);
		// } else {
		// 	const data: MbkmProgramProdiCreateRequestTypes = {
		// 		mbkm_program_prodi_program_id: mbkmProgram?.mbkm_program_id,
		// 		mbkm_program_prodi_program_name: mbkmProgram?.mbkm_program_name,
		// 		mbkm_program_prodi_study_program_id: studyProgram.study_program_id,
		// 		mbkm_program_prodi_study_program_name: studyProgram.study_program_name,
		// 		mbkm_program_prodi_department_id:
		// 			studyProgram.study_program_department_id,
		// 		mbkm_program_prodi_department_name:
		// 			studyProgram.study_program_department_name,
		// 		mbkm_program_prodi_semester_id: mbkmProgram?.mbkm_program_semester_id,
		// 	};
		// 	setMataKuliahSelected([...mataKuliahSelected, data]);
		// }
	};

	const handleSubmit = async () => {
		if (mataKuliahSelected.length !== 0) {
			await httpService.post({
				path: `/mbkm-programs/participations/study-programs`,
				body: mataKuliahSelected,
			});
		}
		onOpen(false);
		window.location.reload();
	};

	const fecthMataKuliah = async () => {
		try {
			const result = await httpService.getTableData({
				url: CONFIG.base_url_api + `/mata-kuliah`,
				pagination: true,
				page: 0,
				size: 10,
				filters: {
					search: "",
				},
			});

			console.log(result);

			setListOfMataKuliah({
				link: `/mata-kuliah`,
				data: result,
				page: 0,
				size: 10,
				filter: {
					search: "",
				},
			});
		} catch (error: any) {
			alert(error.message);
		}
	};

	const tableHeaderMataKuliah: TableHeader[] = [
		{
			title: "No",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mataKuliahName}
				</td>
			),
		},

		{
			title: "total sks",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
					{data.mataKuliahSksTotal}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<ButtonStyle
						title="pilih"
						color={"light"}
						onClick={() => {
							handleSelectStudyProgram(data);
						}}
					/>
				</td>
			),
		},
	];

	const fecthData = async () => {
		await fecthMataKuliah();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;

	return (
		<Modal dismissible show={isOpen} onClose={() => onOpen(false)}>
			<Modal.Header>Daftar Prodi</Modal.Header>
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
				<TableStyle header={tableHeaderMataKuliah} table={listOfMataKuliah} />
				<div className="flex justify-end">
					<ButtonStyle
						title="Buat"
						type="submit"
						color="dark"
						onClick={handleSubmit}
					/>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default ModalAddMataKuliah;
