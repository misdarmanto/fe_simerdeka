import { Label, Textarea } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import {
	ReportParticipationDetailTypes,
	ReportParticipationUpdateTypes,
} from "../../models/report-participation";
import ListItemStyle from "../../components/list";
import { convertStatusName } from "../../utils/convert";

const StudentDetailView = () => {
	const [reportParticipation, setReportParticipation] =
		useState<ReportParticipationDetailTypes>();

	const [statusMessage, setStatusMessage] = useState<string>("");

	const { reportParticipationId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const navigation = useNavigate();
	const httpService = new ServiceHttp();

	const fecthReportParticipationLetter = async () => {
		const result = await httpService.get({
			path: `/report-participations/detail/${reportParticipationId}`,
		});
		setReportParticipation(result);
	};

	const handleChangeStatusApproval = async (status: "accepted" | "rejected") => {
		const body: ReportParticipationUpdateTypes = {
			report_participation_id: reportParticipationId,
			report_participation_status: status,
			report_participation_status_message: statusMessage,
		};

		await httpService.patch({
			path: `/report-participations`,
			body: body,
		});
		navigation("/report-participations");
	};

	useEffect(() => {
		fecthReportParticipationLetter();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/report-participations",
						title: "Lapor Keikutsertaan",
					},
					{
						link: "/report-participations" + reportParticipationId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="status"
						description={convertStatusName(
							reportParticipation?.report_participation_status
						)}
					/>

					{reportParticipation?.report_participation_status_message && (
						<ListItemStyle
							title="pesan"
							description={
								reportParticipation?.report_participation_status_message
							}
						/>
					)}

					<ListItemStyle
						title="Nama"
						description={reportParticipation?.student.student_name}
					/>
					<ListItemStyle
						title="NIM"
						description={reportParticipation?.student.student_nim}
					/>
					<ListItemStyle
						title="Program Studi"
						description={
							reportParticipation?.list_of_study_program.study_program_name
						}
					/>
					<ListItemStyle
						title="Jurusan"
						description={reportParticipation?.list_of_major.major_name}
					/>
					<ListItemStyle
						title="Lampiran Surat"
						url={reportParticipation?.report_participation_letter}
					/>
				</dl>
			</div>

			{currentUser.user_role === "academic" && (
				<div className="bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
					<div id="textarea" className="mt-5">
						<div className="mb-2 block">
							<Label htmlFor="comment" value="Tinggalkan Pesan" />
						</div>
						<Textarea
							id="comment"
							placeholder="message..."
							required={true}
							value={statusMessage}
							onChange={(e) => setStatusMessage(e.target.value)}
							rows={4}
						/>
					</div>
					<div className="flex justify-end items-center mt-5">
						<ButtonStyle
							onClick={() => handleChangeStatusApproval("rejected")}
							title="Tolak"
							color="failure"
							className="mx-2"
						/>
						<ButtonStyle
							title="Terima"
							className="mx-2"
							onClick={() => handleChangeStatusApproval("accepted")}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default StudentDetailView;
