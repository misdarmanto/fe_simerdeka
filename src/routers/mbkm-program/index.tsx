import { TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { RootContext } from "../../utils/contextApi";

const MbkmProgram = () => {
	const navigate = useNavigate();

	const [listProgram, setListProgram] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: any = useContext(RootContext);

	const fecthData = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/programs/all",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListProgram({
			link: "programs/all",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});

		console.log(result);

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
			title: "Name",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.program_name.length > 10
						? data.program_name.slice(0, 10) + "....."
						: data.program_name}
				</td>
			),
		},

		{
			title: "Program Type",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "programtype"} className="md:px-6 md:py-3 break-all">
					{data.program_type.length > 10
						? data.program_type.slice(0, 10) + "....."
						: data.program_type}
				</td>
			),
		},

		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div>
						<Link to={`/mbkm-programs/${data.program_id}`}>
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
						link: "/mbkm-programs",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs",
						title: "List",
					},
				]}
				icon={BASE_MENU_ICON.LoRIcon}
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
					{currentUser.user_role === "akademik" && (
						<ButtonStyle
							title="Create"
							color="light"
							onClick={() => navigate("/mbkm-programs/create")}
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

export default MbkmProgram;
