import { Select, TextInput } from "flowbite-react";
import { ReactElement, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { SemesterTypes } from "../../models/semester";
import { UserTypes } from "../../models/user";
import ModalStyle from "../../components/modal";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { useAppContext } from "../../context/app.context";

const MbkmProgramListView = () => {
	const navigate = useNavigate();
	const [listMbkmProgram, setListMbkmProgram] = useState<any>();
	const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([]);
	const [semesterId, setSemesterId] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);

	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<MbkmProgramTypes>();
	const { currentUser } = useAppContext();

	const user: UserTypes = currentUser;
	const httpService = new ServiceHttp();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: MbkmProgramTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteMbkmProgram = async () => {
		await httpService.remove({
			path: `/mbkm-programs?mbkm_program_id=${modalDeleteData?.mbkmProgramId}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthData = async () => {
		const filters: any = {};

		if (semesterId !== "all") {
			filters["semester_id"] = semesterId;
		}

		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/mbkm-programs",
			pagination: true,
			page: 0,
			size: 10,
			filters,
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

	const fecthSemester = async () => {
		const result = await httpService.get({
			path: "/semesters",
		});
		if (result) {
			setListOfSemester(result.items);
		}
	};

	useEffect(() => {
		fecthSemester();
		fecthData();
	}, [semesterId]);

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
			data: (data: MbkmProgramTypes, index: number): ReactElement => (
				<td key={index + "action"}>
					<div className="flex">
						<Link to={`/mbkm-programs/detail/${data.mbkmProgramId}`}>
							<ButtonStyle
								title="Detail"
								size="xs"
								color="light"
								className="mx-1"
							/>
						</Link>
						<ButtonStyle
							title="edit"
							size="xs"
							color="failure"
							className="mx-2"
							onClick={() => {
								handleModalDelete();
								handleModaDataSelected(data);
							}}
						/>
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.MbkmProgramIcon}
			/>

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
					{user.userRole === "lp3m" && (
						<ButtonStyle
							title="Create"
							color="light"
							onClick={() => navigate("/mbkm-programs/create")}
						/>
					)}

					<Select
						onChange={(e) => setSemesterId(e.target.value)}
						className="mx-2"
					>
						<option value={"all"}>semester saat ini</option>
						{listOfSemester.map((semester: any, index) => (
							<option key={index} value={semester.semesterId}>
								{semester.semester_name}
							</option>
						))}
					</Select>
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<TableStyle header={header} table={listMbkmProgram} />
			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus ${modalDeleteData?.mbkmProgramName}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteMbkmProgram}
				onOpen={handleModalDelete}
			/>
		</div>
	);
};

export default MbkmProgramListView;
