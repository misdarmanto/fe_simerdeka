import axios from "axios";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { CONFIG } from "../../configs";

const CreateRequestLoR = () => {
	const [studentName, setStudentName] = useState<string>("");
	const [studentNim, setStudentNim] = useState<string>("");
	const [studentTranskrip, setStudentTranskrip] = useState<string>("");
	const [dosenWali, setDosenWali] = useState<string>("");
	const [suratPersetujuanDosenWali, setSuratPersetujuanDosenWali] = useState<string>("");
	const [programName, setProgramName] = useState<string>("");
	const [programCorrelationDescription, setprogramCorrelationDescription] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = {
				user_id: Date.now().toString(),
				student_id: Date.now().toString(),
				student_name: studentName,
				student_nim: studentName,
				student_transkrip: studentTranskrip,
				dosen_wali: dosenWali,
				surat_persetujuan_dosen_wali: suratPersetujuanDosenWali,
				program_name: programName,
				program_correlation_description: programCorrelationDescription,
			};
			console.log(data);
			const result = await axios.post(CONFIG.base_url_api + "/registration-LoR", data);
			navigate("/request-LoR");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const handleUploadSuratPersetujuanDosen = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setSuratPersetujuanDosenWali(url);
		} catch (error) {
			console.error(error);
		}
	};

	const handleUploadStudentTranskrip = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setStudentTranskrip(url);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="bg-white border border-2 border-gray-200 rounded-lg m-5 p-10">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Nama" />
					</div>
					<TextInput
						value={studentName}
						onChange={(e) => setStudentName(e.target.value)}
						type="text"
						placeholder="nama..."
						required={true}
					/>
				</div>

				<div>
					<div className="mb-2 block">
						<Label htmlFor="nim" value="NIM" />
					</div>
					<TextInput
						value={studentNim}
						onChange={(e) => setStudentNim(e.target.value)}
						type="text"
						placeholder="NIM..."
						required={true}
					/>
				</div>

				<div id="select">
					<div className="mb-2 block">
						<Label htmlFor="dosen-wali" value="Dosen Wali" />
					</div>
					<Select onChange={(e) => setDosenWali(e.target.value)} required={true}>
						<option value="dosen 1">Dosen 1</option>
						<option value="dosen 2">Dosen 2</option>
						<option value="dosen 3">Dosen 3</option>
						<option value="dosen 4">Dosen 4</option>
						<option value="dosen 5">Dosen 5</option>
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="Nama Program MBKM yang ingin diikuti "
							value="Nama Program MBKM yang ingin diikuti "
						/>
					</div>
					<TextInput
						value={programName}
						onChange={(e) => setProgramName(e.target.value)}
						type="text"
						placeholder="Nama Program MBKM yang ingin diikuti ..."
						required={true}
					/>
				</div>

				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="comment"
							value="Keterkaitan Capaian Pembelajaran Program MBKM dengan Program Studi "
						/>
					</div>
					<Textarea
						value={programCorrelationDescription}
						onChange={(e) => setprogramCorrelationDescription(e.target.value)}
						placeholder="Leave a comment..."
						required={true}
						rows={4}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="file" value="Surat Persetujuan Dosen Wali" />
					</div>
					<FileInput id="file" onChange={handleUploadSuratPersetujuanDosen} />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="file" value="Transkrip semester 1-4 " />
					</div>
					<FileInput id="file" onChange={handleUploadStudentTranskrip} />
				</div>

				<div className="flex justify-end">
					<Button type="submit" className="mt-10 w-32 bg-yellow-400 hover:bg-yellow-500">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CreateRequestLoR;
