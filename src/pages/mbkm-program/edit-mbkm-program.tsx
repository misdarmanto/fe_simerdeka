import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import ListItemStyle from "../../components/list";
import { Label, TextInput } from "flowbite-react";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { SksConvertionCreateTypes } from "../../models/sks-convertion";

const MbkmProgramEditView = () => {
	const [listOfStudent, setListOfStudent] = useState<any>();
	const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramTypes>();
	const [sksConvertionTotal, setSksConvertionTotal] = useState<number>();
	const [listSksConvertionSelected, setListSksConvertionSelected] = useState<
		SksConvertionCreateTypes[]
	>([]);

	const [isLoading, setIsLoading] = useState(true);
	const { mbkmProgramId } = useParams();
	const httpService = new ServiceHttp();
	const navigation = useNavigate();

	const handleSubmit = async () => {
		await httpService.post({
			path: `/sks-convertions`,
			body: listSksConvertionSelected,
		});
		navigation("/mbkm-programs");
	};

	const handleSelectSksConvertion = ({ studentId }: { studentId: string }) => {
		const studentCheck = listSksConvertionSelected.find((item) => {
			return item.sksConvertionStudentId === studentId;
		});

		if (studentCheck) {
			const newListSksConvertion = listSksConvertionSelected.filter((item) => {
				return item.sksConvertionStudentId !== studentId;
			});
			setListSksConvertionSelected(newListSksConvertion);
		} else {
			setListSksConvertionSelected([
				...listSksConvertionSelected,
				{
					sksConvertionTotal: sksConvertionTotal!,
					sksConvertionMbkmProgramId: mbkmProgram?.mbkmProgramId!,
					sksConvertionStudentId: studentId,
				},
			]);
		}
	};

	console.log(listSksConvertionSelected);

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
			data: (data: any, index: number): ReactElement => {
				const isButtonActive = listSksConvertionSelected.find((item) => {
					return item.sksConvertionStudentId === data.user_id;
				});

				return (
					<td key={index + "action"}>
						<div>
							<ButtonStyle
								title="pilih"
								color={isButtonActive ? "dark" : "light"}
								onClick={() => {
									handleSelectSksConvertion({
										studentId: data.user_id,
									});
								}}
							/>
						</div>
					</td>
				);
			},
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
		<div>
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
						description={mbkmProgram?.mbkmProgramName}
					/>
					<ListItemStyle
						title="kategori program"
						description={mbkmProgram?.mbkmProgramCategory}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={mbkmProgram?.mbkmProgramSyllabus}
					/>
				</dl>
			</div>

			<div className="flex flex-col gap-4 bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="sks" value="Konversi SKS" />
					</div>
					<TextInput
						min={0}
						required
						type="number"
						onChange={(e) => setSksConvertionTotal(+e.target.value)}
					/>
				</div>

				<div className="mb-2 block">
					<Label value="Daftar Mahasiswa" />
				</div>
				<TableStyle header={header} table={listOfStudent} />
				<div className="flex justify-end">
					<ButtonStyle
						title="Buat"
						type="submit"
						color="dark"
						onClick={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default MbkmProgramEditView;
