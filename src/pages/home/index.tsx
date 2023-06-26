import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MbkmProgramIcon, StudenIcon, StudyProgramIcon } from "../../components";
import { ServiceHttp } from "../../services/api";
import { SummariesTypes } from "../../models/summary.model";
import { Button, CardActions, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";

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
				style={{ backgroundColor: "#17A2B8" }}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<p className="text-white font-md">{summaries?.totalStudent}</p>
			</div>
			<div
				onClick={() => handleNavigate("/study-programs")}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<StudyProgramIcon size={30} className="mr-5" />{" "}
				<p>{summaries?.totalStudyProgram} Prodi</p>
			</div>
			<div
				onClick={() => handleNavigate("/mbkm-programs")}
				className="flex items-center cursor-pointer bg-white border border-gray-200 rounded-lg shadow m-5 p-8 w-64"
			>
				<MbkmProgramIcon size={30} className="mr-5" />{" "}
				<p>{summaries?.totalProgram} Program MBKM</p>
			</div>
		</div>
	);
};

interface CardStyleTypes {
	title: string;
	total: string;
	url: string;
}

const CardStyle = (props: CardStyleTypes) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Word of the Day
				</Typography>

				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					adjective
				</Typography>
				<Typography variant="body2">
					well meaning and kindly.
					<br />
					{'"a benevolent smile"'}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default Home;
