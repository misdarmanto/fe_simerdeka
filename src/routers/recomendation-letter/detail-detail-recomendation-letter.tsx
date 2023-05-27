import { FileInput, Label, Textarea, Timeline } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	BASE_ICON,
	BASE_MENU_ICON,
	BreadcrumbStyle,
	ButtonStyle,
} from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import { BiCalendar } from "react-icons/bi";
import { RecomendationLetterTypes } from "../../models/recomendation-letter";
import { storage } from "../../configs/firebase";
import { ref } from "firebase/storage";
import { uploadImageToFirebase } from "../../utils/firebase";
import ListItemStyle from "../../components/list";
import { convertStatusName } from "../../utils/convertStatusMenu";

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
			path: `/recomendation-letter/detail/${recomendationLetterId}`,
		});
		setRecomendationLetter(result);
		console.log(result);
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
		let assignTo = "";

		switch (currentUser.user_role) {
			case "study_program":
				assignTo = "major";
				break;
			case "major":
				assignTo = "lp3m";
				break;
			case "lp3m":
				assignTo = "academic";
				break;
			case "academic":
				assignTo = "done";
				break;
			default:
				break;
		}

		await httpService.patch({
			path: `/recomendation-letter/change-status`,
			body: {
				recomendation_letter_id: recomendationLetterId,
				assign_to: assignTo,
				student_id: recomendationLetter?.student_id,
				approval_letter: recomendationLetterApproval,
			},
		});

		navigation("/recomendation-letter");
	};

	const handleChangeStatusApproval = async (status: string) => {
		await httpService.patch({
			path: `/recomendation-letter/change-status`,
			body: {
				recomendation_letter_id: recomendationLetterId,
				status: status,
				status_message: statusMessage,
			},
		});
		navigation("/recomendation-letter");
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
						link: "/recomendation-letter",
						title: "Surat Rekomendasi",
					},
					{
						link: "/recomendation-letter" + recomendationLetterId,
						title: "Detail",
					},
				]}
				icon={BASE_ICON.MENU.RecomendationLetterIcon}
			/>

			<div className="bg-white border border-gray-200 rounded-lg shadow my-5 p-2 sm:p-8">
				<Timeline horizontal={true}>
					{recomendationLetter?.recomendation_letter_assign_to_study_program && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke prodi</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendation_letter_assign_to_major && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke Jurusan</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendation_letter_assign_to_lp3m && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke LP3M</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}
					{recomendationLetter?.recomendation_letter_assign_to_academic && (
						<Timeline.Item>
							<Timeline.Point icon={BiCalendar} />
							<Timeline.Content>
								<Timeline.Title>Diteruskan ke akademik</Timeline.Title>
								<Timeline.Time>{dateTime.toDateString()}</Timeline.Time>
							</Timeline.Content>
						</Timeline.Item>
					)}

					{recomendationLetter?.recomendation_letter_status === "accepted" && (
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
							recomendationLetter?.recomendation_letter_status
						)}
					/>
					{recomendationLetter?.recomendation_letter_status_message && (
						<ListItemStyle
							title="Pesan"
							description={
								recomendationLetter?.recomendation_letter_status_message
							}
						/>
					)}
					<ListItemStyle
						title="Nama"
						description={recomendationLetter?.student?.student_name}
					/>
					<ListItemStyle
						title="NIM"
						description={recomendationLetter?.student?.student_nim}
					/>
					<ListItemStyle
						title="Prodi"
						description={recomendationLetter?.student?.study_program_name}
					/>
					<ListItemStyle
						title="Jurusan"
						description={recomendationLetter?.student?.major_name}
					/>
					<ListItemStyle
						title="Dosen Wali"
						description={recomendationLetter?.recomendation_letter_dosen_wali}
					/>
					<ListItemStyle
						title="Program Yang Diikuti"
						description={
							recomendationLetter?.recomendation_letter_program_name
						}
					/>
					<ListItemStyle
						title="Keterkaitan Pembelajaran Dengan Program Studi"
						description={
							recomendationLetter?.recomendation_letter_program_correlation
						}
					/>
					<ListItemStyle
						title="Surat Persetujuan Dosen Wali"
						url={recomendationLetter?.recomendation_letter_approval_letter}
					/>
					<ListItemStyle
						title="Transkrip semester 1-4"
						url={recomendationLetter?.recomendation_letter_student_transkrip}
					/>

					{recomendationLetter?.recomendation_letter_from_study_program && (
						<ListItemStyle
							title="Surat Pengantar Prodi"
							url={
								recomendationLetter?.recomendation_letter_from_study_program +
								""
							}
						/>
					)}
					{recomendationLetter?.recomendation_letter_from_major && (
						<ListItemStyle
							title="Surat Pengantar Jurusan"
							url={
								recomendationLetter?.recomendation_letter_from_major + ""
							}
						/>
					)}
					{recomendationLetter?.recomendation_letter_from_lp3m && (
						<ListItemStyle
							title="Surat Pengantar LP3M"
							url={recomendationLetter?.recomendation_letter_from_lp3m + ""}
						/>
					)}
					{recomendationLetter?.recomendation_letter_from_academic && (
						<ListItemStyle
							title="Download Surat Rekomendasi"
							isDownloadButton={true}
							url={
								recomendationLetter?.recomendation_letter_from_academic +
								""
							}
						/>
					)}
				</dl>
			</div>

			{currentUser.user_role !== "student" && (
				<div className="bg-white border border-2 border-gray-200 rounded-lg p-10 my-5">
					<div>
						<div className="mb-2 block">
							<Label htmlFor="file" value="Surat Pengantar" />
						</div>
						<FileInput id="file" onChange={handleAddCoverLetter} />
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
