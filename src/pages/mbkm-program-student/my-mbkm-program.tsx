import { ReactElement, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import ListItemStyle from "../../components/list";
import { StudentTypes } from "../../models/student";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Alert, Label, TextInput } from "flowbite-react";
import { FiAlertTriangle } from "react-icons/fi";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { CONFIG } from "../../configs";
import { TranskripTypes } from "../../models/transkrip";
import { MataKuliahTypes } from "../../models/mata-kuliah";
import { RootContext } from "../../utils/contextApi";

const MbkmProgramStudentMyProgramView = () => {
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: any = useContext(RootContext);
	const studentId = currentUser.userId;

	console.log("student_________________id");
	console.log(studentId);
	const [studentDetails, setStudentDetails] = useState<StudentTypes>();
	const httpService = new ServiceHttp();
	const [listOfMataKuliahTranskrip, setListOfMataKuliahTranskrip] = useState<any>();
	const [openModalAddMataKuliah, setOpenModalAddMataKuliah] = useState(false);
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<MataKuliahTypes>();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: any) => {
		setModalDeleteData(item);
	};

	const fecthMataKuliahTranskrip = async () => {
		try {
			const result = await httpService.getTableData({
				url: CONFIG.base_url_api + `/transkrip`,
				pagination: true,
				page: 0,
				size: 10,
				filters: {
					search: "",
				},
			});

			setListOfMataKuliahTranskrip({
				link: `/transkrip`,
				data: result,
				page: 0,
				size: 10,
				filter: {
					search: "",
				},
			});
		} catch (error: any) {
			console.log(error.message);
		}
	};

	const fecthDetailStudent = async () => {
		const result = await httpService.get({
			path: `/students/detail/${studentId}`,
		});
		setStudentDetails(result);
		console.log(result);
	};

	const fecthData = async () => {
		await fecthDetailStudent();
		await fecthMataKuliahTranskrip();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <h1>loading...</h1>;

	return <div>work</div>;

	// const tableHeaderMataKuliah: TableHeader[] = [
	// 	{
	// 		title: "No",
	// 		data: (data: TranskripTypes, index: number): ReactElement => (
	// 			<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
	// 				{index + 1}
	// 			</td>
	// 		),
	// 	},

	// 	{
	// 		title: "Nama",
	// 		data: (data: TranskripTypes, index: number): ReactElement => (
	// 			<td key={index + "name"} className="md:px-6 md:py-3 break-all">
	// 				{data.mataKuliah.mataKuliahName}
	// 			</td>
	// 		),
	// 	},

	// 	{
	// 		title: "total sks",
	// 		data: (data: TranskripTypes, index: number): ReactElement => (
	// 			<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
	// 				{data.mataKuliah.mataKuliahSksTotal}
	// 			</td>
	// 		),
	// 	},

	// 	{
	// 		title: "Nilai",
	// 		data: (data: TranskripTypes, index: number): ReactElement => (
	// 			<td key={index + "nilai"} className="md:px-6 md:py-3 break-all">
	// 				{data.transkripMataKuliahGrade || "T"}
	// 			</td>
	// 		),
	// 	},
	// ];

	// return (
	// 	<div className="m-5">
	// 		<BreadcrumbStyle
	// 			listPath={[
	// 				{
	// 					link: "/students",
	// 					title: "Mahasiswa",
	// 				},
	// 				{
	// 					link: "/students/" + studentId,
	// 					title: "Detail",
	// 				},
	// 			]}
	// 			icon={BASE_MENU_ICON.ReportParicipationIcon}
	// 		/>

	// 		<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
	// 			<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
	// 				<ListItemStyle
	// 					title="Nama"
	// 					description={studentDetails?.studentName}
	// 				/>
	// 				<ListItemStyle title="NIM" description={studentDetails?.studentNim} />
	// 				<ListItemStyle
	// 					title="Prodi"
	// 					description={studentDetails?.studentStudyProgramName}
	// 				/>
	// 				<ListItemStyle
	// 					title="Jurusan"
	// 					description={studentDetails?.studentDepartmentName}
	// 				/>
	// 				<ListItemStyle
	// 					title="Program MBKM"
	// 					description={studentDetails?.mbkmProgram?.mbkmProgramName}
	// 				/>
	// 				<ListItemStyle
	// 					title="Kategori Program MBKM"
	// 					description={studentDetails?.mbkmProgram?.mbkmProgramCategory}
	// 				/>
	// 				<ListItemStyle
	// 					title="Total Konversi SKS"
	// 					description={studentDetails?.studentSksTotal + "" || "_"}
	// 				/>
	// 				<ListItemStyle
	// 					title="Silabus"
	// 					url={studentDetails?.mbkmProgram?.mbkmProgramSyllabus}
	// 				/>
	// 			</dl>
	// 		</div>

	// 		<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
	// 			<div className="mb-2 block">
	// 				<Label value="Transkrip Mata Kuliah" />
	// 			</div>
	// 			<div className="flex flex-col md:flex-row justify-between md:px-0">
	// 				<div className="flex items-center justify-between">
	// 					<div className="mr-2 flex flex-row justify-between md:justify-start">
	// 						<select
	// 							name="size"
	// 							defaultValue={10}
	// 							className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
	// 						>
	// 							<option value="2">2</option>
	// 							<option value="5">5</option>
	// 							<option value="10">10</option>
	// 							<option value="50">50</option>
	// 							<option value="100">100</option>
	// 						</select>
	// 					</div>
	// 					<ButtonStyle
	// 						title="Download"
	// 						color="light"
	// 						// onClick={}
	// 					/>
	// 				</div>
	// 				<div className="mt-1 w-full md:w-1/5">
	// 					<TextInput type="text" placeholder="search..." />
	// 				</div>
	// 			</div>

	// 			<TableStyle
	// 				header={tableHeaderMataKuliah}
	// 				table={listOfMataKuliahTranskrip}
	// 			/>
	// 		</div>
	// 	</div>
	// );
};

export default MbkmProgramStudentMyProgramView;
