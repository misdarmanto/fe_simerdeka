import { ref } from "firebase/storage";
import { Alert, FileInput, Label } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import { UserTypes } from "../../models/user";
import { ReportParticipationTypes } from "../../models/report-participation";
import FileUploadButton from "../../components/button/button-upload";

const ReportParicipationCreateView = () => {
	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;

	const [reportParticipationFile, setReportParticipationFile] = useState<string>("");

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: ReportParticipationTypes = {
				report_participation_letter: reportParticipationFile,
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

	useEffect(() => {
		if (user.user_role !== "student") {
			navigate("/report-participations");
		}
	}, []);

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
			{/* {!user.user_is_registered && (
				<Alert color="failure" icon={BASE_MENU_ICON.FaQIcon} className="my-5">
					<span>
						<p>
							<span className="font-medium">Info alert! </span>
							Anda belum mengajukan surat rekomendasi
						</p>
					</span>
				</Alert>
			)} */}
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
						<ButtonStyle
							title="Submit"
							type="submit"
							color="dark"
							// disabled={!user.user_is_registered}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReportParicipationCreateView;
