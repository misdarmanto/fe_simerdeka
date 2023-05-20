import { ref } from "firebase/storage";
import { FileInput, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";

const CreateMbkmProgram = () => {
	const [programName, setProgramName] = useState<string>("");
	const [programDescription, setProgramDescription] = useState<string>("");
	const [programOwner, setProgramOwner] = useState<string>("");
	const [programType, setProgramType] = useState<string>("");
	const [programSyllabus, setProgramSyllabus] = useState<string>("");
	const [programSksConversion, setProgramSksConversion] = useState<number>();

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = {
				program_user_id: Date.now().toString(),
				program_name: programName,
				program_description: programDescription,
				program_owner: programOwner,
				program_type: programType,
				program_syllabus: programSyllabus,
				program_sks_conversion: programSksConversion,
			};
			console.log(data);

			const httpService = new ServiceHttp();
			await httpService.post({
				path: "/programs",
				body: data,
			});
			navigate("/mbkm-programs");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const handleUploadSyllabus = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "programs/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setProgramSyllabus(url);
		} catch (error) {
			console.error(error);
		}
	};

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
				icon={BASE_MENU_ICON.LoRIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Nama" />
						</div>
						<TextInput
							value={programName}
							onChange={(e) => setProgramName(e.target.value)}
							type="text"
							placeholder="nama..."
							required={true}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="program owner" value="program owner" />
						</div>
						<TextInput
							value={programOwner}
							onChange={(e) => setProgramOwner(e.target.value)}
							type="text"
							placeholder="program owner..."
							required={true}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="konversi sks" value="konversi sks" />
						</div>
						<TextInput
							value={programSksConversion}
							onChange={(e) => setProgramSksConversion(+e.target.value)}
							type="number"
							placeholder="konversi sks..."
							required={true}
						/>
					</div>

					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="program Type" value="Dosen Wali" />
						</div>
						<Select
							onChange={(e) => setProgramType(e.target.value)}
							required={true}
						>
							<option value="program-type-1">program type 1</option>
							<option value="program-type-2">program type 2</option>
							<option value="program-type-3">program type 3</option>
							<option value="program-type-4">program type 4</option>
							<option value="program-type-5">program type 5</option>
						</Select>
					</div>
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="deskripsi Program MBKM yang ingin diikuti "
								value="deskripsi Program MBKM yang ingin diikuti "
							/>
						</div>
						<TextInput
							value={programDescription}
							onChange={(e) => setProgramDescription(e.target.value)}
							type="text"
							placeholder="Deskripsi program MBKM yang ingin diikuti ..."
							required={true}
						/>
					</div>

					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="Surat Persetujuan Dosen Wali" />
						</div>
						<FileInput id="file" onChange={handleUploadSyllabus} />
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateMbkmProgram;
