import { Button, FileInput, Label, Textarea, Timeline } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import { BiCalendar, BiUpload } from "react-icons/bi";
import { RecomendationLetterTypes } from "../../models/recomendation-letter";
import { storage } from "../../configs/firebase";
import { ref } from "firebase/storage";
import { uploadImageToFirebase } from "../../utils/firebase";
import ListItemStyle from "../../components/list";
import { convertStatusName } from "../../utils/convert";
import FileUploadButton from "../../components/button/button-upload";

const RecomendationLetterDetail = () => {
	const [recomendationLetter, setRecomendationLetter] =
		useState<RecomendationLetterTypes>();
	const [statusMessage, setStatusMessage] = useState<string>("");
	const [recomendationLetterApproval, setRecomendationLetterApproval] =
		useState<string>("");

	const { recomendationLetterId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const navigation = useNavigate();
	const httpService = new ServiceHttp();

	const fecthRecomendationLetter = async () => {
		const result = await httpService.get({
			path: `/recomendation-letters/detail/${recomendationLetterId}`,
		});
		console.log(result);
		setRecomendationLetter(result);
	};

	const handleAddCoverLetter = async (event: any) => {
		const file = event.target.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			const url = await uploadImageToFirebase({ imageRef, file });
			console.log(url);
			setRecomendationLetterApproval(url);
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangeStatusAssignMent = async () => {
		await httpService.patch({
			path: `/recomendation-letters/change-status`,
			body: {
				recomendationLetter_id: recomendationLetterId,
				recomendationLetter_approval_letter: recomendationLetterApproval,
			},
		});

		navigation("/recomendation-letters");
	};

	const handleChangeStatusApproval = async (status: string) => {
		await httpService.patch({
			path: `/recomendation-letter/change-status`,
			body: {
				recomendationLetter_id: recomendationLetterId,
				status: status,
				status_message: statusMessage,
			},
		});
		navigation("/recomendation-letters");
	};

	useEffect(() => {
		fecthRecomendationLetter();
	}, []);

	const dateTime = new Date();

	return (
		<div className="sm:m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/recomendation-letters",
						title: "Surat Rekomendasi",
					},
					{
						link: "/recomendation-letters/" + recomendationLetterId,
						title: "Detail",
					},
				]}
				icon={BASE_ICON.MENU.RecomendationLetterIcon}
			/>

			<div className="bg-white border border-gray-200 rounded-lg shadow my-5 p-2 sm:p-8">
				<Timeline horizontal={true}>
					{recomendationLetter?.recomendationLetterAssignToStudyProgram && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke prodi</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendationLetterAssignToDepartment && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke Jurusan</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendationLetterAssignToLp3m && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke LP3M</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendationLetterAssignToAcademic && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke akademik</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}

					{recomendationLetter?.recomendationLetterStatus === "accepted" && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Selesai</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
				</Timeline>
			</div>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Status"
						description={convertStatusName(
							recomendationLetter?.recomendationLetterStatus
						)}
					/>
					{recomendationLetter?.recomendationLetterStatusMessage && (
						<ListItemStyle
							title="Pesan"
							description={
								recomendationLetter?.recomendationLetterStatusMessage
							}
						/>
					)}
					<ListItemStyle
						title="Nama"
						description={recomendationLetter?.student?.studentName}
					/>
					<ListItemStyle
						title="NIM"
						description={recomendationLetter?.student?.studentNim}
					/>
					<ListItemStyle
						title="Prodi"
						description={
							recomendationLetter?.student?.studentStudyProgramName
						}
					/>
					<ListItemStyle
						title="Jurusan"
						description={recomendationLetter?.student?.studentDepartmentName}
					/>
					<ListItemStyle
						title="Dosen Wali"
						description={recomendationLetter?.recomendationLetterDosenWali}
					/>
					<ListItemStyle
						title="Program Yang Diikuti"
						description={recomendationLetter?.recomendationLetterProgramName}
					/>
					<ListItemStyle
						title="Keterkaitan Pembelajaran Dengan Program Studi"
						description={
							recomendationLetter?.recomendationLetterProgramCorrelation
						}
					/>
					<ListItemStyle
						title="Surat Persetujuan Dosen Wali"
						url={recomendationLetter?.recomendationLetterApprovalLetter}
					/>
					<ListItemStyle
						title="Transkrip semester 1-4"
						url={recomendationLetter?.recomendationLetterStudentTranskrip}
					/>

					{recomendationLetter?.recomendationLetterFromStudyProgram && (
						<ListItemStyle
							title="Surat Pengantar Prodi"
							url={
								recomendationLetter?.recomendationLetterFromStudyProgram +
								""
							}
						/>
					)}
					{recomendationLetter?.recomendationLetterFromDepartment && (
						<ListItemStyle
							title="Surat Pengantar Jurusan"
							url={
								recomendationLetter?.recomendationLetterFromDepartment +
								""
							}
						/>
					)}
					{recomendationLetter?.recomendationLetterFromLp3m && (
						<ListItemStyle
							title="Surat Pengantar LP3M"
							url={recomendationLetter?.recomendationLetterFromLp3m + ""}
						/>
					)}
					{recomendationLetter?.recomendationLetterFromAcademic && (
						<ListItemStyle
							title="Download Surat Rekomendasi"
							isDownloadButton={true}
							url={
								recomendationLetter?.recomendationLetterFromAcademic + ""
							}
						/>
					)}
				</dl>
			</div>

			{currentUser.user_role !== "student" && (
				<div className="bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
					<div>
						<div className="mb-2 block">
							<label htmlFor="file">surat pengantar</label>
						</div>
						<FileUploadButton onUpload={setRecomendationLetterApproval} />
					</div>

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
							disabled={recomendationLetterApproval === ""}
							className="mx-2"
							onClick={() => handleChangeStatusAssignMent()}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default RecomendationLetterDetail;
