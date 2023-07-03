import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import ListItemStyle from "../../components/list";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { StudyProgramTypes } from "../../models/study-program";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import ModalStyle from "../../components/modal";
import { Label } from "flowbite-react";
import { MbkmProgramProdiTypes } from "../../models/mbkm-program-prodi";
import ModalSelectMbkmProgram from "./modal-add-mbkm-program";
import { useHttp } from "../../hooks/useHttp";

const StudyProgramDetailView = () => {
	const [detailStudyProgram, setDetailStudyProgram] = useState<StudyProgramTypes>();
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<MbkmProgramProdiTypes>();
	const [mbkmPrograms, setMbkmPrograms] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { studyProgramId } = useParams();
	const { currentUser }: AppContextTypes = useAppContext();
	const [openModalAddMbkmProgram, setOpenModalAddMbkmProgram] = useState(false);
	const { handleGetRequest, handleRemoveRequest } = useHttp();

	const handleOpenModalAddMbkmProgram = () => {
		setOpenModalAddMbkmProgram(!openModalAddMbkmProgram);
	};

	const fecthMbkmProdi = async () => {
		const result = await handleGetRequest({
			path: `/mbkm-programs/prodi?mbkmProgramProdiStudyProgramId=${studyProgramId}`,
		});

		result["page"] = 0;
		result["size"] = 100;

		setMbkmPrograms({
			link: "",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
	};

	const fecthDetailStudyProgram = async () => {
		const result = await handleGetRequest({
			path: `/study-programs/detail/${studyProgramId}`,
		});
		setDetailStudyProgram(result);
	};

	const fecthData = async () => {
		await fecthMbkmProdi();
		await fecthDetailStudyProgram();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: MbkmProgramProdiTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteMbkmProdiPrgram = async () => {
		await handleRemoveRequest({
			path: `/mbkm-programs/prodi?id=${modalDeleteData?.mbkmPrograms.mbkmProgramId}`,
		});
		window.location.reload();
		setOpenModalDelete(false);
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
			title: "Nama Program",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mbkmPrograms?.mbkmProgramName}
				</td>
			),
		},

		{
			title: "Jenis Program",
			data: (data: MbkmProgramProdiTypes, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.mbkmPrograms?.mbkmProgramCategory.length > 10
						? data.mbkmPrograms?.mbkmProgramCategory.slice(0, 10) + "....."
						: data.mbkmPrograms?.mbkmProgramCategory}
				</td>
			),
		},
	];

	if (currentUser.userRole === "lp3m") {
		header.push({
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
		});
	}

	if (isLoading) return <p>loading...</p>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/study-programs",
						title: "Program Studi",
					},
					{
						link: "/study-programs/detail/" + studyProgramId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.StudyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-8">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={detailStudyProgram?.studyProgramName}
					/>
					<ListItemStyle
						title="E-mail"
						description={detailStudyProgram?.studyProgramEmail}
					/>
					<ListItemStyle
						title="Jurusan"
						description={detailStudyProgram?.studyProgramDepartmentName}
					/>
				</dl>
			</div>

			<div className="flex flex-col gap-2 bg-white border border-2 border-gray-200 rounded-lg p-8 my-5">
				<div className="mb-2 block">
					<Label value="Daftar program MBKM yang diikuti" />
				</div>
				{currentUser.userRole === "lp3m" && (
					<ButtonStyle
						title="Tambah Program"
						color="light"
						onClick={handleOpenModalAddMbkmProgram}
						className="flex-start w-36"
					/>
				)}
				<TableStyle header={header} table={mbkmPrograms} />
			</div>
			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.mbkmPrograms?.mbkmProgramName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteMbkmProdiPrgram}
				onOpen={handleModalDelete}
			/>

			<ModalSelectMbkmProgram
				isOpen={openModalAddMbkmProgram}
				onOpen={handleOpenModalAddMbkmProgram}
				studyProgram={detailStudyProgram}
			/>
		</div>
	);
};

export default StudyProgramDetailView;
