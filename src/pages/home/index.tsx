import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceHttp } from "../../services/api";
import { SummariesTypes } from "../../models/summary.model";

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

	useEffect(() => {
		fecthSummaries();
	}, []);

	return (
		<div>
			<div className="flex flex-wrap">
				<div
					onClick={() => handleNavigate("/students")}
					className="flex-col items-center cursor-pointer bg-cyan-500 border rounded-md shadow sm:mr-5 mb-5 p-2 w-full sm:w-64"
				>
					<h2 className="text-4xl mb-3 font-extrabold text-white">
						{summaries?.totalStudent}
					</h2>
					<h1 className="text-white font-xl">mahasiswa</h1>
				</div>
				<div
					onClick={() => handleNavigate("/study-programs")}
					className="flex-col cursor-pointer bg-emerald-500 border rounded-md shadow sm:mr-5 mb-5 p-2 w-full sm:w-64"
				>
					<h2 className="text-4xl mb-3 font-extrabold text-white">
						{summaries?.totalStudyProgram}
					</h2>
					<h1 className="text-white font-xl">Prodi</h1>
				</div>
				<div
					onClick={() => handleNavigate("/mbkm-programs")}
					className="cursor-pointer bg-amber-500 border rounded-lg shadow mb-5 p-2 sm:mr-5 w-full sm:w-64"
				>
					<h2 className="text-4xl mb-3 font-extrabold text-white">
						{summaries?.totalProgram}
					</h2>
					<h1 className="text-white font-xl">Program MBKM</h1>
				</div>
			</div>
			<div className="p-6 mt-10 bg-white border border-gray-200 rounded-lg shadow">
				<h1 className="text-1xl mb-3 text-gray-700 font-extrabold">
					Info Simerdeka
				</h1>
				<p className="text-gray-500">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum
				</p>
			</div>
		</div>
	);
};

export default Home;
