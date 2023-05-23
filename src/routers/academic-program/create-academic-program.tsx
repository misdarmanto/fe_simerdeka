import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { AcademicProgramTypes } from "../../models/academic-program";
import { listProgramType } from "../../data/program-type";

const AcademicProgramCreat = () => {
	const [listOfMajorName, setListOfMajorName] = useState<string[]>([]);
	const [listOfSemester, setListOfSemester] = useState<string[]>([]);

	const [academicProgramName, setAcademicProgramName] = useState<string>("");
	const [academicProgramType, setAcademicProgramType] = useState<string>("");
	const [academicProgramMajorId, setAcademicProgramMajorId] = useState<string>("");
	const [semesterId, setSemesterId] = useState<string>("");

	const navigate = useNavigate();
	const httpService = new ServiceHttp();

	const fecthMajor = async () => {
		const result = await httpService.get({
			path: "/itera/majors",
		});
		console.log(result);
		if (result) {
			setListOfMajorName(result);
		}
	};

	const fecthSemester = async () => {
		const result = await httpService.get({
			path: "/semesters/all",
		});
		console.log(result.items);
		if (result) {
			setListOfSemester(result.items);
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
		fecthMajor();
		fecthSemester();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs/academic",
						title: "MBKM Program",
					},
					{
						link: "/mbkm-programs/academic/create",
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
							<Label
								htmlFor="jenis program MBKM yang di ikuti"
								value="jenis program MBKM yang di ikuti"
							/>
						</div>
						<Select
							onChange={(e) => setAcademicProgramType(e.target.value)}
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
					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="jurusan" value="jurusan" />
						</div>
						<Select
							onChange={(e) => setAcademicProgramMajorId(e.target.value)}
							required={true}
						>
							<option value={""}>pilih jurusan</option>
							{listOfMajorName.map((jurusan: any, index) => (
								<option key={index} value={jurusan.major_id}>
									{jurusan.major_name}
								</option>
							))}
						</Select>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="semester" value="semester" />
						</div>
						<Select
							onChange={(e) => setSemesterId(e.target.value)}
							required={true}
						>
							<option value={""}>pilih semester</option>
							{listOfSemester.map((semester: any, index) => (
								<option key={index} value={semester.semester_id}>
									{semester.semester_name}
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

export default AcademicProgramCreat;
