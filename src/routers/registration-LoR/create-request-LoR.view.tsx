import axios from "axios";
import { Button, FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";

const CreateRequestLoR = () => {
	const [studentName, setStudentName] = useState<string>("");
	const [studentNim, setStudentNim] = useState<string>("");
	const [studentTranskrip, setStudentTranskrip] = useState<string>("http://example.com/file");
	const [dosenWali, setDosenWali] = useState<string>("Joko");
	const [suratPersetujuanDosenWali, setSuratPersetujuanDosenWali] =
		useState<string>("http://example.com/file");
	const [programName, setProgramName] = useState<string>("");
	const [programCorrelationDescription, setprogramCorrelationDescription] = useState<string>("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data = {
				user_id: "ssss",
				student_id: "sdssd",
				student_name: studentName,
				student_nim: studentName,
				student_transkrip: studentTranskrip,
				dosen_wali: dosenWali,
				surat_persetujuan_dosen_wali: suratPersetujuanDosenWali,
				program_name: programName,
				program_correlation_description: programCorrelationDescription,
			};
			console.log(data);
			const result = await axios.post("http://localhost:8000/registration-LoR", data);

			console.log(result);
		} catch (error: any) {
			console.error(error);
		}
	};

	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow  m-5 p-20">
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
					<Select id="dosen-wali" required={true}>
						<option>Dosen 1</option>
						<option>Dosen 2</option>
						<option>Dosen 3</option>
						<option>Dosen 4</option>
						<option>Dosen 5</option>
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
							htmlFor="t"
							value="Keterkaitan Capaian Pembelajaran Program MBKM dengan Program Studi "
						/>
					</div>
					<div className="mb-2 block">
						<Label htmlFor="comment" value="Your message" />
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
					<FileInput id="file" />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="file" value="Transkrip semester 1-4 " />
					</div>
					<FileInput id="file" />
				</div>

				<Button type="submit" className="mt-10">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default CreateRequestLoR;
