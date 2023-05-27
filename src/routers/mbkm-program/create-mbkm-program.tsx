import { FileInput, Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { listProgramType } from "../../data/program-type";
import { ref } from "firebase/storage";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { MbkmProgramCreateTypes } from "../../models/mbkm-program";

const MbkmProgramCreat = () => {
	const [listOfSemester, setListOfSemester] = useState<string[]>([]);

	const [mbkmProgramSyllabus, setMbkmProgramSyllabus] = useState("");
	const [mbkmProgramName, setMbkmProgramName] = useState("");
	const [mbkmProgramCategory, setMbkmProgramCategory] = useState("");
	const [semesterId, setSemesterId] = useState<string>("");

	const navigate = useNavigate();
	const httpService = new ServiceHttp();

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
			const data: MbkmProgramCreateTypes = {
				mbkm_program_created_by: "lp3m",
				mbkm_program_name: mbkmProgramName,
				mbkm_program_category: mbkmProgramCategory,
				mbkm_program_syllabus: mbkmProgramSyllabus,
				semester_id: semesterId,
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

	const handleUploadSyllabus = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setMbkmProgramSyllabus(url);
		} catch (error) {
			console.error(error);
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
						<FileInput id="file" onChange={handleUploadSyllabus} />
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

export default MbkmProgramCreat;
