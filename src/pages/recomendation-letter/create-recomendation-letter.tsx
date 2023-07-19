import { Label, Select, TextInput, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RecomendationLetterCreateRequestTypes } from "../../models/recomendation-letter";
import { UserTypes } from "../../models/user";
import { AppContextTypes, useAppContext } from "../../context/app.context";
import FileUploadButton from "../../components/button/button-upload";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const RecomendationLetterCreate = () => {
	const { currentUser }: AppContextTypes = useAppContext();
	const [recomendatationStudentTranskrip, setRecomendatationStudentTranskrip] =
		useState<string>("");
	const [dosenWali, setDosenWali] = useState<string>("");
	const [suratPersetujuanDosenWali, setSuratPersetujuanDosenWali] =
		useState<string>("");
	const [programName, setProgramName] = useState<string>("");
	const [programDescription, setProgramDescription] = useState<string>("");
	const [programCorrelationDescription, setprogramCorrelationDescription] =
		useState<string>("");
	const [syllabus, setSyllabus] = useState("");
	const navigate = useNavigate();
	const { handlePostRequest } = useHttp();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const data: RecomendationLetterCreateRequestTypes = {
			recomendationLetterStudentTranskrip: recomendatationStudentTranskrip,
			recomendationLetterDosenWali: dosenWali,
			recomendationLetterSyllabus: syllabus,
			recomendationLetterApprovalLetter: suratPersetujuanDosenWali,
			recomendationLetterProgramName: programName,
			recomendationLetterProgramCorrelation: programCorrelationDescription,
			recomendationLetterProgramDescription: programDescription,
		};

		await handlePostRequest({
			path: apiUrlPath.recomendDatationLetters.post,
			body: data,
		});
		navigate("/recomendation-letters");
	};

	useEffect(() => {
		if (currentUser.userRole !== "student") {
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
							<Label htmlFor="comment" value="Deskripsi Program" />
						</div>
						<Textarea
							value={programDescription}
							onChange={(e) => setProgramDescription(e.target.value)}
							placeholder="deskripsi..."
							required={true}
							rows={4}
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

					<div className="flex gap-5 items-center">
						<div className="mb-2 block">
							<label htmlFor="file">Surat Persetujuan Dosen Wali</label>
						</div>
						<FileUploadButton onUpload={setSuratPersetujuanDosenWali} />
					</div>
					<div className="flex gap-5 items-center">
						<div className="mb-2 block">
							<label htmlFor="file">Transkrip semester 1-4</label>
						</div>
						<FileUploadButton onUpload={setRecomendatationStudentTranskrip} />
					</div>

					<div className="flex gap-5 items-center">
						<div className="mb-2 block">
							<label htmlFor="file">Silabus MBKM</label>
						</div>
						<FileUploadButton onUpload={setSyllabus} />
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
