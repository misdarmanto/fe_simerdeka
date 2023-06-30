import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { listProgramType } from "../../data/program-type";
import { MbkmProgramCreateTypes } from "../../models/mbkm-program";
import { SemesterTypes } from "../../models/semester";
import ButtonUploadFile from "../../components/button/button-upload";

const MbkmProgramCreatView = () => {
	const [listOfSemester, setListOfSemester] = useState<SemesterTypes[]>([]);
	const [mbkmProgramSyllabus, setMbkmProgramSyllabus] = useState("");
	const [mbkmProgramName, setMbkmProgramName] = useState("");
	const [mbkmProgramCategory, setMbkmProgramCategory] = useState("");

	const navigate = useNavigate();
	const httpService = new ServiceHttp();

	const fecthSemester = async () => {
		const result = await httpService.get({
			path: "/semesters?semester_status=active",
		});
		if (result) {
			setListOfSemester(result.items);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: MbkmProgramCreateTypes = {
				mbkmProgramCreatedBy: "lp3m",
				mbkmProgramName: mbkmProgramName,
				mbkmProgramCategory: mbkmProgramCategory,
				mbkmProgramSyllabus: mbkmProgramSyllabus,
				mbkmProgramSemesterId: listOfSemester[0].semesterId + "",
			};
			console.log(data);

			await httpService.post({
				path: "/mbkm-programs",
				body: data,
			});
			navigate("/mbkm-programs");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		fecthSemester();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs/create",
						title: "Create",
					},
				]}
				icon={BASE_MENU_ICON.MbkmProgramIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Nama" />
						</div>
						<TextInput
							value={mbkmProgramName}
							onChange={(e) => setMbkmProgramName(e.target.value)}
							type="text"
							placeholder="nama..."
							required={true}
						/>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label
								htmlFor="jenis program MBKM yang di ikuti"
								value="jenis program MBKM yang di ikuti"
							/>
						</div>
						<Select
							onChange={(e) => setMbkmProgramCategory(e.target.value)}
							required={true}
						>
							<option value={""}>pilih jenis program</option>
							{listProgramType.map((name, index) => (
								<option key={index} value={name}>
									{name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="upload syllabus" />
						</div>
						<ButtonUploadFile onUpload={setMbkmProgramSyllabus} />
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default MbkmProgramCreatView;
