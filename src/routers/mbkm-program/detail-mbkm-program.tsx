import { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import ListItemStyle from "../../components/list";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { UserTypes } from "../../models/auth";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";

const MbkmProgramDetail = () => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramTypes>();
	const [isLoading, setIsLoading] = useState(true);
	const { mbkmProgramId } = useParams();
	const httpService = new ServiceHttp();

	const fecthDetailMbkmProgram = async () => {
		const result = await httpService.get({
			path: `/mbkm-programs/detail/${mbkmProgramId}`,
		});
		setMbkmProgram(result);
	};

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
	};

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
						<ButtonStyle title="pilih" color="light" />
					</div>
				</td>
			),
		},
	];

	const fecthData = async () => {
		await fecthDetailMbkmProgram();
		await fecthStudents();
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	if (isLoading) return <p>loading...</p>;
	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "My Programs",
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
						description={mbkmProgram?.mbkm_program_name}
					/>
					<ListItemStyle
						title="kategori program"
						description={mbkmProgram?.mbkm_program_category}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={mbkmProgram?.mbkm_program_syllabus}
					/>
				</dl>
			</div>

			<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="sks" value="Konversi SKS" />
					</div>
					<TextInput id="sks" required type="number" />
				</div>

				<div className="mb-2 block">
					<Label value="Daftar Mahasiswa" />
				</div>
				<TableStyle header={header} table={listOfStudent} />
				<div className="flex justify-end">
					<ButtonStyle title="Submit" type="submit" color="dark" />
				</div>
			</div>
		</div>
	);
};

export default MbkmProgramDetail;
