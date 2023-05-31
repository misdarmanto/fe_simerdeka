import { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MbkmProgramIcon, StudenIcon, StudyProgramIcon } from "../../components";

const Home = () => {
	const navigation = useNavigate();
	const isAuth = true;
	useEffect(() => {
		if (!isAuth) {
			navigation("/login");
		}
	}, []);
	return (
		<div className="flex flex-wrap">
			<div className="flex items-center bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64">
				<StudenIcon size={30} className="mr-5" /> <p>1000 Mahasiswa</p>
			</div>
			<div className="flex items-center bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64">
				<StudyProgramIcon size={30} className="mr-5" /> <p>10 prodi</p>
			</div>
			<div className="flex items-center bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64">
				<MbkmProgramIcon size={30} className="mr-5" /> <p>5 Program MBKM</p>
			</div>
		</div>
	);
};

export default Home;
