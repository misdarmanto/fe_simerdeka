import { Select, TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { RootContext } from "../../utils/contextApi";
import { SemesterTypes } from "../../models/semester";
import { UserTypes } from "../../models/auth";

const MbkmProgramListView = () => {
	const navigate = useNavigate();

	const [listMbkmProgram, setListMbkmProgram] = useState<any>();
	const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([]);
	const [semesterId, setSemesterId] = useState<string>("all");
	const [isLoading, setIsLoading] = useState(true);

	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;
	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const filters: any = {};

		if (semesterId !== "all") {
			filters["semester_id"] = semesterId;
		}

		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/mbkm-programs/all",
			pagination: true,
			page: 0,
			size: 10,
			filters,
		});

		setListMbkmProgram({
			link: "/mbkm-programs/all",
			data: result,
			page: 0,
			size: 10,
			filters,
		});

		console.log(result);

		setIsLoading(false);
	};

	const fecthSemester = async () => {
		const result = await httpService.get({
			path: "/semesters/all",
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
					{data.mbkm_program_name}
				</td>
			),
		},

		{
			title: "Jenis Program",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.mbkm_program_category.length > 10
						? data.mbkm_program_category.slice(0, 10) + "....."
						: data.mbkm_program_category}
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
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div className="flex">
						<Link to={`/mbkm-programs/detail/${data.mbkm_program_id}`}>
							<ButtonStyle title="Detail" color="light" className="mx-1" />
						</Link>

						{user.user_role === "study_program" && (
							<Link to={`/mbkm-programs/edit/${data.mbkm_program_id}`}>
								<ButtonStyle
									title="Edit"
									color="light"
									className="mx-1"
								/>
							</Link>
						)}
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
					{user.user_role === "lp3m" && (
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

export default MbkmProgramListView;
