import { Label, Select, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { AcademicProgramTypes } from "../../models/academic-program";
import { UserTypes } from "../../models/auth";
import { RootContext } from "../../utils/contextApi";

const JurusanProgramCreat = () => {
	const [listOfStudyPrograms, setListOfStudyPrograms] = useState<string[]>([]);
	const [listOfProgramFromAcademic, setListOfProgramFromAcademic] = useState<string[]>(
		[]
	);

	const [academicProgramName, setAcademicProgramName] = useState<string>("");
	const [academicProgramType, setAcademicProgramType] = useState<string>("");
	const [academicProgramMajorId, setAcademicProgramMajorId] = useState<string>("");
	const [semesterId, setSemesterId] = useState<string>("");

	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;

	const navigate = useNavigate();
	const httpService = new ServiceHttp();

	const fecthStudyPrograms = async () => {
		const result = await httpService.get({
			path: `/itera/study-programs?major_id=${user.major_id}`,
		});
		console.log("_______");
		console.log(result);
		if (result) {
			setListOfStudyPrograms(result);
		}
	};

	const fecthProgramFromAcademic = async () => {
		const result = await httpService.get({
			path: "/academic-programs/all",
		});
		console.log(result.items);
		if (result) {
			setListOfProgramFromAcademic(result.items);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: AcademicProgramTypes = {
				academic_program_created_by: "akademik",
				academic_program_name: academicProgramName,
				academic_program_type: academicProgramType,
				major_id: academicProgramMajorId,
				semester_id: semesterId,
			};
			console.log(data);

			await httpService.post({
				path: "/academic-programs",
				body: data,
			});
			navigate("/mbkm-programs/academic");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	useEffect(() => {
		fecthStudyPrograms();
		fecthProgramFromAcademic();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs/jurusan",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs/jurusan/create",
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
							value={academicProgramName}
							onChange={(e) => setAcademicProgramName(e.target.value)}
							type="text"
							placeholder="nama..."
							required={true}
						/>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="Daftar Prodi" value="Daftar Prodi" />
						</div>
						<Select
							onChange={(e) => setAcademicProgramType(e.target.value)}
							required={true}
						>
							<option value={""}>pilih prodi</option>
							{listOfStudyPrograms.map((studyProgram: any, index) => (
								<option key={index} value={studyProgram}>
									{studyProgram.study_program_name}
								</option>
							))}
						</Select>
					</div>
					<div id="select">
						<div className="mb-2 block">
							<Label
								htmlFor="Daftar Program yang Tersedia"
								value="Daftar Program yang Tersedia"
							/>
						</div>
						<Select
							onChange={(e) => setAcademicProgramMajorId(e.target.value)}
							required={true}
						>
							<option value={""}>pilih program</option>
							{listOfProgramFromAcademic.map((program: any, index) => (
								<option key={index} value={program.academic_program_id}>
									{program.academic_program_name}
								</option>
							))}
						</Select>
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default JurusanProgramCreat;
