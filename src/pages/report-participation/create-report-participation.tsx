import { Label } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { ReportParticipationTypes } from "../../models/report-participation";
import FileUploadButton from "../../components/button/button-upload";

const ReportParicipationCreateView = () => {
	const [reportParticipationFile, setReportParticipationFile] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: ReportParticipationTypes = {
				reportParticipationLetter: reportParticipationFile,
			};
			const httpService = new ServiceHttp();
			await httpService.post({
				path: "/report-participations",
				body: data,
			});
			navigate("/report-participations");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/report-participation",
						title: "Lapor keikut sertaan",
					},
					{
						link: "/report-participation/create",
						title: "Buat",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label
								htmlFor="file"
								value="upload bukti surat keikutsertaan"
							/>
						</div>
						<FileUploadButton onUpload={setReportParticipationFile} />
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReportParicipationCreateView;
