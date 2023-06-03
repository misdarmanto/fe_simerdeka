import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MbkmProgramIcon, StudenIcon, StudyProgramIcon } from "../../components";
import { ServiceHttp } from "../../services/api";

interface SummariesTypes {
	total_student: number;
	total_study_program: number;
	total_program: number;
}

const Home = () => {
	const navigation = useNavigate();
	const httpService = new ServiceHttp();

	const [summaries, setSummaries] = useState<SummariesTypes>();

	const fecthSummaries = async () => {
		const result = await httpService.get({
			path: "/summaries",
		});
		console.log(result);
		setSummaries(result);
	};

	const handleNavigate = (path: string) => {
		navigation(path);
	};

	const isAuth = true;
	useEffect(() => {
		if (!isAuth) {
			navigation("/login");
		}
		fecthSummaries();
	}, []);

	return (
		<div className="flex flex-wrap">
			<div
				onClick={() => handleNavigate("/students")}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<StudenIcon size={30} className="mr-5" />{" "}
				<p>{summaries?.total_student} Mahasiswa</p>
			</div>
			<div
				onClick={() => handleNavigate("/study-programs")}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<StudyProgramIcon size={30} className="mr-5" />{" "}
				<p>{summaries?.total_study_program} Prodi</p>
			</div>
			<div
				onClick={() => handleNavigate("/mbkm-programs")}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<MbkmProgramIcon size={30} className="mr-5" />{" "}
				<p>{summaries?.total_program} Program MBKM</p>
			</div>
		</div>
	);
};

export default Home;
