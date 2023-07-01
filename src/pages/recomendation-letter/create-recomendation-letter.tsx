import { ref } from "firebase/storage";
import { FileInput, Label, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RecomendationLetterCreateRequestTypes } from "../../models/recomendation-letter";
import { UserTypes } from "../../models/user";
import { useAppContext } from "../../context/app.context";

const RecomendationLetterCreate = () => {
	const { currentUser } = useAppContext();
	const user: UserTypes = currentUser;

	const [recomendatationStudentTranskrip, setRecomendatationStudentTranskrip] =
		useState<string>("");
	const [dosenWali, setDosenWali] = useState<string>("");
	const [suratPersetujuanDosenWali, setSuratPersetujuanDosenWali] =
		useState<string>("");
	const [programName, setProgramName] = useState<string>("");
	const [programCorrelationDescription, setprogramCorrelationDescription] =
		useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: RecomendationLetterCreateRequestTypes = {
				recomendationLetterStudentTranskrip: recomendatationStudentTranskrip,
				recomendationLetterDosenWali: dosenWali,
				recomendationLetterApprovalLetter: suratPersetujuanDosenWali,
				recomendationLetterProgramName: programName,
				recomendationLetterProgramCorrelation: programCorrelationDescription,
			};
			console.log(data);

			const httpService = new ServiceHttp();
			await httpService.post({
				path: "/recomendation-letters",
				body: data,
			});
			navigate("/recomendation-letters");
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

	const handleUploadrecomendatationStudentTranskrip = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setRecomendatationStudentTranskrip(url);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (user.userRole !== "student") {
			navigate("/recomendation-letters");
		}
	}, []);

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/recomendation-letter",
						title: "Surat Rekomendasi",
					},
					{
						link: "/recomendation-letter/create",
						title: "Buat",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div id="select">
						<div className="mb-2 block">
							<Label htmlFor="dosen-wali" value="Dosen Wali" />
						</div>
						<Select
							onChange={(e) => setDosenWali(e.target.value)}
							required={true}
						>
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
							onChange={(e) =>
								setprogramCorrelationDescription(e.target.value)
							}
							placeholder="Leave a comment..."
							required={true}
							rows={4}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="Surat Persetujuan Dosen Wali" />
						</div>
						<FileInput
							id="file"
							onChange={handleUploadSuratPersetujuanDosen}
						/>
					</div>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="Transkrip semester 1-4 " />
						</div>
						<FileInput
							id="file"
							onChange={handleUploadrecomendatationStudentTranskrip}
						/>
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default RecomendationLetterCreate;
