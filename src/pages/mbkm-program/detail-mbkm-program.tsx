import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import ListItemStyle from "../../components/list";
import { Label, TextInput } from "flowbite-react";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import ModalSelectStudyProgram from "./modal-add-study-program";
import { MbkmProgramProdiTypes } from "../../models/mbkm-program-prodi";
import ModalStyle from "../../components/modal";

const MbkmProgramDetailView = () => {
	const [listOfStudyProgramRegistered, setListOfStudyProgramRegistered] =
		useState<any>();
	const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramTypes>();

	const [openModalSelectStudyProgram, setOpenModalSelectStudyProgram] = useState(false);

	const [isLoading, setIsLoading] = useState(true);
	const { mbkmProgramId } = useParams();
	const httpService = new ServiceHttp();

	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<MbkmProgramProdiTypes>();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: MbkmProgramProdiTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteMbkmProgramParticipation = async () => {
		console.log(modalDeleteData);
		await httpService.remove({
			path: `/mbkm-programs/prodi?id=${modalDeleteData?.mbkmProgramProdiId}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthDetailMbkmProgram = async () => {
		const result = await httpService.get({
			path: `/mbkm-programs/detail/${mbkmProgramId}`,
		});
		setMbkmProgram(result);
	};

	const fecthStudyPrograms = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url:
				CONFIG.base_url_api +
				`/mbkm-programs/prodi?program_id=${mbkmProgramId}&&`,
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		console.log(result);

		setListOfStudyProgramRegistered({
			link: `/mbkm-programs/prodi?program_id=${mbkmProgramId}&&`,
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
	};

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgramProdiProgramName}
				</td>
			),
		},

		{
			title: "Prodi",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgramProdiStudyProgramName}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.mbkmProgramProdiDepartmentName}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "action"}>
					<ButtonStyle
						title="Hapus"
						size="xs"
						color="failure"
						className="mx-2"
						onClick={() => {
							handleModalDelete();
							handleModaDataSelected(data);
						}}
					/>
				</td>
			),
		},
	];

	const fecthData = async () => {
		await fecthDetailMbkmProgram();
		await fecthStudyPrograms();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "Program MBKM",
					},
					{
						link: "/mbkm-programs/detail/" + mbkmProgramId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={mbkmProgram?.mbkmProgramName}
					/>
					<ListItemStyle
						title="kategori program"
						description={mbkmProgram?.mbkmProgramCategory}
					/>
					<ListItemStyle
						title="Semester"
						description={mbkmProgram?.semester.semesterName}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={mbkmProgram?.mbkmProgramSyllabus}
					/>
				</dl>
			</div>

			<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
				<div className="mb-2 block">
					<Label value="Daftar Prodi" />
				</div>
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
						<ButtonStyle
							title="Tambah Prodi"
							color="light"
							onClick={() => setOpenModalSelectStudyProgram(true)}
						/>
					</div>
					<div className="mt-1 w-full md:w-1/5">
						<TextInput type="text" placeholder="search..." />
					</div>
				</div>

				<TableStyle header={header} table={listOfStudyProgramRegistered} />
			</div>

			<ModalSelectStudyProgram
				mbkmProgram={mbkmProgram}
				isOpen={openModalSelectStudyProgram}
				onOpen={setOpenModalSelectStudyProgram}
			/>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.mbkmProgramProdiStudyProgramName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteMbkmProgramParticipation}
				onOpen={handleModalDelete}
			/>
		</div>
	);
};
export default MbkmProgramDetailView;
