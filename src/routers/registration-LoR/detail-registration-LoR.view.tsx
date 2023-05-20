import { FileInput, Label, ListGroup, Textarea } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { LoRTypes } from "../../models/request-LoR";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import { UserTypes } from "../../models/auth";

const DetailRegistrationLoR = () => {
	const [LoR, setLoR] = useState<LoRTypes>();
	const { registrationLoRId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const result = await httpService.get({
			path: `/registration-LoR/detail/${registrationLoRId}`,
		});
		setLoR(result);
	};

	const handleAddCoverLetter = () => {};

	const handleChangeRegistrationStatus = async (status: string) => {
		let assignTo = "";

		switch (currentUser.user_role) {
			case "prodi":
				assignTo = "jurusan";
				break;
			case "jurusan":
				assignTo = "akademik";
				break;
			case "akademik":
				assignTo = "biro";
				break;
			case "biro":
				assignTo = "mahasiswa";
				break;
			default:
				break;
		}

		await httpService.patch({
			path: `/registration-LoR/change-status`,
			body: {
				registration_lor_id: registrationLoRId,
				assign_to: assignTo,
			},
		});
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/registration-LoR",
						title: "Registration LoR",
					},
					{
						link: "/registration-LoR" + registrationLoRId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.LoRIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<div>
					<ListGroup>
						<ListGroup.Item>Nama : {LoR?.student_name}</ListGroup.Item>
						<ListGroup.Item>NIM : {LoR?.student_nim}</ListGroup.Item>
						<ListGroup.Item>Dosen Wali : {LoR?.dosen_wali}</ListGroup.Item>
						<ListGroup.Item>
							Program yang ingin diikuti : {LoR?.program_name}
						</ListGroup.Item>
						<ListGroup.Item>
							Keterkaitan Pembelajaran dengan Program Studi :
							<small> {LoR?.program_correlation_description}</small>
						</ListGroup.Item>
						<ListGroup.Item>
							Surat Persetujuan Dosen Wali :{" "}
							{LoR?.surat_persetujuan_dosen_wali}
						</ListGroup.Item>
						<ListGroup.Item>
							Transkrip semester 1-4 : {LoR?.student_transkrip}
						</ListGroup.Item>
					</ListGroup>
				</div>
			</div>

			{currentUser.user_role !== "mahasiswa" && (
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
							rows={4}
						/>
					</div>
					<div className="flex justify-end items-center mt-5">
						<ButtonStyle
							title="Terima"
							className="mx-2"
							onClick={() => handleChangeRegistrationStatus("accepted")}
						/>
						<ButtonStyle title="Tolak" color="failure" className="mx-2" />
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailRegistrationLoR;
