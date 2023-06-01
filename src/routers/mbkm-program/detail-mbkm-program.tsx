import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import ListItemStyle from "../../components/list";
import { Label } from "flowbite-react";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";

const MbkmProgramDetailView = () => {
	const [listOfStudyProgramRegistered, setListOfStudyProgramRegistered] =
		useState<any>();
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

	const fecthStudyPrograms = async () => {
		const httpService = new ServiceHttp();
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + `/study-programs?registered=true`,
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListOfStudyProgramRegistered({
			link: "/study-programs?registered=1",
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
					{data.study_program_name}
				</td>
			),
		},

		{
			title: "email",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "email"} className="md:px-6 md:py-3 break-all">
					{data.study_program_email}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.study_program_department_name}
				</td>
			),
		},
	];

	const fecthData = async () => {
		await fecthDetailMbkmProgram();
		await fecthStudyPrograms();
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
				<div className="mb-2 block">
					<Label value="Daftar Prodi" />
				</div>
				<TableStyle header={header} table={listOfStudyProgramRegistered} />
			</div>
		</div>
	);
};

export default MbkmProgramDetailView;
