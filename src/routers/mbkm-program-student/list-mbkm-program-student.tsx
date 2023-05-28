import { Label, Select, TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { RootContext } from "../../utils/contextApi";
import { SemesterTypes } from "../../models/semester";
import { UserTypes } from "../../models/auth";
import { converDateTimeFromDB } from "../../utils/convert";

const MbkmProgramStudentList = () => {
	const navigate = useNavigate();

	const [listMbkmProgram, setListMbkmProgram] = useState<any>();
	const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([]);
	const [semesterId, setSemesterId] = useState<string>("");
	const [isLoading, setIsLoading] = useState(true);

	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;
	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const filters: any = { search: "" };

		if (semesterId !== "all") {
			filters["semester_id"] = semesterId;
		}

		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/mbkm-programs/students/all",
			pagination: true,
			page: 0,
			size: 10,
			filters,
		});

		console.log(result);

		setListMbkmProgram({
			link: "/mbkm-programs/students/all",
			data: result,
			page: 0,
			size: 10,
			...filters,
		});

		setIsLoading(false);
	};

	const fecthSemester = async () => {
		const result = await httpService.get({
			path: "/semesters/all",
		});
		console.log(result.items);
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
			data: (data: any, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama Program",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.mbkm_program.mbkm_program_name}
				</td>
			),
		},

		{
			title: "Jenis Program",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.mbkm_program.mbkm_program_category.length > 10
						? data.mbkm_program.mbkm_program_category.slice(0, 10) + "....."
						: data.mbkm_program.mbkm_program_category}
				</td>
			),
		},

		{
			title: "Semester",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "semester"} className="md:px-6 md:py-3 break-all">
					{data.semester.semester_name}
				</td>
			),
		},
		{
			title: "Konversi SKS",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "sks"} className="md:px-6 md:py-3 break-all">
					{data.mbkm_program_student_sks}
				</td>
			),
		},
		{
			title: "Dibuat Pada",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "created-on"} className="md:px-6 md:py-3 break-all">
					{converDateTimeFromDB(data.created_on)}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div>
						<Link to={`/mbkm-programs/detail/${data.mbkm_program_id}`}>
							<ButtonStyle title="Detail" color="light" />
						</Link>
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs/student",
						title: "My MBKM Program",
					},
					{
						link: "/mbkm-programs/student",
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
					{/* {user.user_role === "study_program" && (
						<ButtonStyle
							title="Create"
							color="light"
							onClick={() => navigate("/mbkm-programs/create")}
						/>
					)} */}

					<Select
						onChange={(e) => setSemesterId(e.target.value)}
						className="mx-2"
					>
						<option value={"all"}>semua semester</option>
						{listOfSemester.map((semester: any, index) => (
							<option key={index} value={semester.semester_id}>
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
		</div>
	);
};

export default MbkmProgramStudentList;
