import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import ListItemStyle from "../../components/list";
import { convertStatusName } from "../../utils/convert";
import { StudentTypes } from "../../models/student";
import { SksConvertionTypes } from "../../models/sks-convertion";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import { Alert } from "flowbite-react";
import { FiAlertTriangle } from "react-icons/fi";

interface StudentDetailTypes {
	sks_convertion_id: string;
	sks_convertion_total: string;
	sks_convertion_student_id: string;
	sks_convertion_mbkm_program_id: string;
	student: StudentTypes;
	mbkm_program: MbkmProgramTypes;
}

const StudentDetailView = () => {
	const [studentDetails, setStudentDetails] = useState<StudentDetailTypes>();
	const [sksConvertion, setSksConvertion] = useState<SksConvertionTypes>();

	const { studentId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const navigation = useNavigate();
	const httpService = new ServiceHttp();

	const fecthDetailStudent = async () => {
		const result = await httpService.get({
			path: `/sks-convertions/students/detail/${studentId}`,
		});
		setStudentDetails(result);
		console.log(result);
	};

	useEffect(() => {
		fecthDetailStudent();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/students",
						title: "Lapor Keikutsertaan",
					},
					{
						link: "/students/" + studentId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.ReportParicipationIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				{studentDetails ? (
					<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
						<ListItemStyle
							title="Nama"
							description={studentDetails?.student.student_name}
						/>
						<ListItemStyle
							title="NIM"
							description={studentDetails?.student.student_nim}
						/>
						<ListItemStyle
							title="Prodi"
							description={studentDetails?.student.study_program_name}
						/>
						<ListItemStyle
							title="Jurusan"
							description={studentDetails?.student.major_name}
						/>
						<ListItemStyle
							title="Program MBKM"
							description={studentDetails?.mbkm_program.mbkm_program_name}
						/>
						<ListItemStyle
							title="Kategori Program MBKM"
							description={
								studentDetails?.mbkm_program.mbkm_program_category
							}
						/>
						<ListItemStyle
							title="Total Konversi SKS"
							description={studentDetails?.sks_convertion_total}
						/>
						<ListItemStyle
							title="Silabus"
							url={studentDetails?.mbkm_program.mbkm_program_syllabus}
						/>
					</dl>
				) : (
					<Alert color="failure" icon={FiAlertTriangle}>
						<span>
							<h1> Sedang Menunggu Konversi SKS!</h1>
						</span>
					</Alert>
				)}
			</div>
		</div>
	);
};

export default StudentDetailView;
