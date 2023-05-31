import { TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ReactElement, useContext, useEffect, useState } from "react";
import { CONFIG } from "../../configs";
import { RootContext } from "../../utils/contextApi";
import { ServiceHttp } from "../../services/api";

const StudentListView = () => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { currentUser }: any = useContext(RootContext);

	const fecthStudents = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/users/students/registered",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListOfStudent({
			link: "/users/students/registered",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fecthStudents();
	}, []);

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
			title: "Nama",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.user_name}
				</td>
			),
		},

		{
			title: "email",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "email"} className="md:px-6 md:py-3 break-all">
					{data.user_email}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div>
						<Link to={`/students/detail/${data.user_id}`}>
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
						link: "/students",
						title: "Mahasiswa",
					},
					{
						link: "/students",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.StudenIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start">
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

					{currentUser.user_role === "student" && (
						<ButtonStyle
							title="Create"
							color="light"
							onClick={() => navigate("/report-participations/create")}
						/>
					)}
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<TableStyle header={header} table={listOfStudent} />
		</div>
	);
};

export default StudentListView;
