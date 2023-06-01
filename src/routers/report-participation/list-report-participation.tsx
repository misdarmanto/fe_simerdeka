import { Badge, TextInput } from "flowbite-react";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import { ReactElement, useContext, useEffect, useState } from "react";
import { CONFIG } from "../../configs";
import { RootContext } from "../../utils/contextApi";
import { ServiceHttp } from "../../services/api";

const ReportParticipationListView = () => {
	const [listProgram, setListProgram] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();
	const { currentUser }: any = useContext(RootContext);

	const fecthData = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/report-participations",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		console.log(result);

		setListProgram({
			link: "report-participations",
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
		fecthData();
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
					{data.student.student_name}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "NIM"} className="md:px-6 md:py-3 break-all">
					{data.student.student_nim}
				</td>
			),
		},

		{
			title: "Prodi",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.student.student_study_program_name}
				</td>
			),
		},

		{
			title: "Jurusan",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.student.student_department_name}
				</td>
			),
		},

		{
			title: "Status",
			data: (data: any, index: number): ReactElement => {
				if (data.report_participation_status === "rejected") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="failure" className="w-20 text-center">
								ditolak
							</Badge>
						</td>
					);
				}
				if (data.report_participation_status === "accepted") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="success" className="w-20 text-center">
								selesai
							</Badge>
						</td>
					);
				}
				return (
					<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
						<Badge color="warning" className="w-20 text-center">
							menunggu
						</Badge>
					</td>
				);
			},
		},

		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div>
						<Link
							to={`/report-participations/detail/${data.report_participation_id}`}
						>
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
						link: "/report-participation",
						title: "Lapor Keikut sertaan",
					},
					{
						link: "/report-participation",
						title: "List",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
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

			<TableStyle header={header} table={listProgram} />
		</div>
	);
};

export default ReportParticipationListView;
