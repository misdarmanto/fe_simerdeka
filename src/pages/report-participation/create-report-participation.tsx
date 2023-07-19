import { Label } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ReportParticipationTypes } from "../../models/report-participation";
import FileUploadButton from "../../components/button/button-upload";
import { useHttp } from "../../hooks/useHttp";
import { apiUrlPath } from "../../configs/apiPath";

const ReportParicipationCreateView = () => {
	const [reportParticipationFile, setReportParticipationFile] = useState<string>("");
	const { handlePostRequest } = useHttp();

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data: ReportParticipationTypes = {
			reportParticipationLetter: reportParticipationFile,
		};
		await handlePostRequest({
			path: apiUrlPath.reportParticipations.post,
			body: data,
		});
		navigate("/report-participations");
	};

	return (
		<div>
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
					<div className="flex items-center gap-2">
						<div className="mb-2 block">
							<Label htmlFor="file" value="upload bukti keikutsertaan : " />
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
