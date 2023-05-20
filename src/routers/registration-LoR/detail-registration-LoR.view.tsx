import axios from "axios";
import { ListGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import { LoRTypes } from "../../models/request-LoR";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";

const DetailRegistrationLoR = () => {
	const [LoR, setLoR] = useState<LoRTypes>();

	let { registrationtLoRId } = useParams();

	const fecthData = async () => {
		const result = await axios.get(
			`http://localhost:8000/registration-LoR/detail/${registrationtLoRId}`
		);
		setLoR(result.data.data);
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
						link: "/registration-LoR" + registrationtLoRId,
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
		</div>
	);
};

export default DetailRegistrationLoR;
