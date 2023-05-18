import axios from "axios";
import { ListGroup } from "flowbite-react";
import { useEffect, useState } from "react";
import { LoRParamsTypes, LoRTypes } from "../../models/request-LoR";
import { useParams } from "react-router-dom";

const DetailRequestLoR = () => {
	const [LoR, setLoR] = useState<LoRTypes>();

	let { requestLoRId } = useParams();

	const fecthData = async () => {
		const result = await axios.get(
			`http://localhost:8000/registration-LoR/detail/${requestLoRId}`
		);
		setLoR(result.data.data);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="bg-white border border-2 border-gray-200 rounded-lg m-5 p-10">
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
						Surat Persetujuan Dosen Wali : {LoR?.surat_persetujuan_dosen_wali}
					</ListGroup.Item>
					<ListGroup.Item>
						Transkrip semester 1-4 : {LoR?.student_transkrip}
					</ListGroup.Item>
				</ListGroup>
			</div>
		</div>
	);
};

export default DetailRequestLoR;
