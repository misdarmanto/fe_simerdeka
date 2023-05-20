import { FileInput, Label, ListGroup, Textarea, Timeline } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { LoRTypes } from "../../models/request-LoR";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import { BiCalendar } from "react-icons/bi";

const DetailProgram = () => {
	const [LoR, setLoR] = useState<LoRTypes>();
	const { registrationLoRId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const navigation = useNavigate();
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

		navigation("/registration-LoR");
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

			<div className="bg-white border border-gray-200 rounded-lg shadow my-5 p-8">
				<Timeline horizontal={true}>
					<Timeline.Item>
						<Timeline.Point icon={BiCalendar} />
						<Timeline.Content>
							<Timeline.Title>Flowbite Library v1.0.0</Timeline.Title>
							<Timeline.Time>Released on December 2, 2021</Timeline.Time>
							<Timeline.Body>
								Get started with dozens of web components and interactive
								elements.
							</Timeline.Body>
						</Timeline.Content>
					</Timeline.Item>
					<Timeline.Item>
						<Timeline.Point icon={BiCalendar} />
						<Timeline.Content>
							<Timeline.Title>Flowbite Library v1.2.0</Timeline.Title>
							<Timeline.Time>Released on December 23, 2021</Timeline.Time>
							<Timeline.Body>
								Get started with dozens of web components and interactive
								elements.
							</Timeline.Body>
						</Timeline.Content>
					</Timeline.Item>
					<Timeline.Item>
						<Timeline.Point icon={BiCalendar} />
						<Timeline.Content>
							<Timeline.Title>Flowbite Library v1.3.0</Timeline.Title>
							<Timeline.Time>Released on January 5, 2022</Timeline.Time>
							<Timeline.Body>
								Get started with dozens of web components and interactive
								elements.
							</Timeline.Body>
						</Timeline.Content>
					</Timeline.Item>
				</Timeline>
			</div>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle title="Nama" description={LoR?.student_name} />
					<ListItemStyle title="NIM" description={LoR?.student_nim} />
					<ListItemStyle title="Dosen Wali" description={LoR?.dosen_wali} />
					<ListItemStyle
						title="Program Yang Diikuti"
						description={LoR?.program_name}
					/>
					<ListItemStyle
						title="Keterkaitan Pembelajaran Dengan Program Studi"
						description={LoR?.program_correlation_description}
					/>
					<ListItemStyle
						title="Surat Persetujuan Dosen Wali"
						url={LoR?.surat_persetujuan_dosen_wali}
					/>
					<ListItemStyle
						title="Transkrip semester 1-4"
						url={LoR?.student_transkrip}
					/>
				</dl>
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

const ListItemStyle = ({
	title,
	description,
	url,
}: {
	title: string;
	description?: string;
	url?: string;
}) => {
	return (
		<div className="flex flex-col pb-3">
			<dt className="mb-1 text-gray-500">{title}</dt>
			{url ? (
				<a href={url} target="blank">
					{url}
				</a>
			) : (
				<dd className="text-sm font-semibold">{description}</dd>
			)}
		</div>
	);
};

export default DetailProgram;
