import { Badge, TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { RootContext } from "../../utils/contextApi";

const RecomendationLetterList = () => {
	const navigate = useNavigate();

	const [listOfRecomendationLetter, setListOfRecomendationLetter] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: any = useContext(RootContext);

	const fecthData = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/recomendation-letter/all",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		console.log(result);
		setListOfRecomendationLetter({
			link: "recomendation-letter/all",
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
			title: "Nama Mahasiswa",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.student.student_name}
				</td>
			),
		},

		{
			title: "NIM",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "nim"} className="md:px-6 md:py-3 break-all">
					{data.student.student_nim.length > 10
						? data.student.student_nim.slice(0, 10) + "..."
						: data.student.student_nim}
				</td>
			),
		},

		{
			title: "Jurusan",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.student.major_name}
				</td>
			),
		},

		{
			title: "Prodi",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.student.study_program_name}
				</td>
			),
		},

		{
			title: "Nama Program",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "program-name"} className="md:px-6 md:py-3 break-all">
					{data.recomendation_letter_program_name.length > 10
						? data.recomendation_letter_program_name.slice(0, 10) + "....."
						: data.recomendation_letter_program_name}
				</td>
			),
		},

		{
			title: "Status",
			data: (data: any, index: number): ReactElement => {
				if (data.recomendation_letter_status === "rejected") {
					return (
						<td key={index + "status"} className="md:px-6 md:py-3 break-all ">
							<Badge color="failure" className="w-20 text-center">
								ditolak
							</Badge>
						</td>
					);
				}
				if (data.recomendation_letter_status === "accepted") {
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
			title: "di teruskan ke",
			data: (data: any, index: number): ReactElement => {
				if (data.recomendation_letter_assign_to_academic) {
					return (
						<td key={index + "s"} className="md:px-6 md:py-3 break-all ">
							<Badge color="info" className="w-20 text-center">
								akademik
							</Badge>
						</td>
					);
				}

				if (data.recomendation_letter_assign_to_lp3m) {
					return (
						<td key={index + "d"} className="md:px-6 md:py-3 break-all ">
							<Badge color="info" className="w-20 text-center">
								LP3M
							</Badge>
						</td>
					);
				}

				if (data.recomendation_letter_assign_to_major) {
					return (
						<td key={index + "s"} className="md:px-6 md:py-3 break-all ">
							<Badge color="info" className="w-20 text-center">
								jurusan
							</Badge>
						</td>
					);
				}

				if (data.recomendation_letter_assign_to_study_program) {
					return (
						<td key={index + "ss"} className="md:px-6 md:py-3 break-all ">
							<Badge color="info" className="w-20 text-center">
								prodi
							</Badge>
						</td>
					);
				}

				return (
					<td key={index + "s"} className="md:px-6 md:py-3 break-all">
						<Badge color="warning" className="w-20">
							{data.recomendation_letter_status}
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
							to={`/recomendation-letter/detail/${data.recomendation_letter_id}`}
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
						link: "/recomendation-letter",
						title: "Surat Rekomendasi",
					},
					{
						link: "/recomendation-letter",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.RecomendationLetterIcon}
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
							title="Buat"
							color="light"
							onClick={() => navigate("/recomendation-letter/create")}
						/>
					)}
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<TableStyle header={header} table={listOfRecomendationLetter} />
		</div>
	);
};

export default RecomendationLetterList;
