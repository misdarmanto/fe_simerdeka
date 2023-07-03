import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { SemesterTypes } from "../../models/semester";
import { Label, TextInput } from "flowbite-react";
import { useAppContext } from "../../context/app.context";

const SemesterDetail = () => {
	const [semester, setSemester] = useState<SemesterTypes>();
	const [semesterName, setSemesterName] = useState<string>();
	const { currentUser } = useAppContext();
	const { semesterId } = useParams();
	const navigate = useNavigate();
	const httpService = new ServiceHttp();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: SemesterTypes = {
				semesterName: semesterName,
				semesterCreatedBy: currentUser.userRole,
				semesterStatus: "active",
			};

			await httpService.patch({
				path: "/semesters",
				body: data,
			});
			navigate("/semesters");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	const fecthData = async () => {
		const result = await httpService.get({
			path: `/semesters/detail/${semesterId}`,
		});
		setSemester(result);
		setSemesterName(result.semesterName + "");
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div>
			<BreadcrumbStyle
				listPath={[
					{
						link: "/semesters",
						title: "Daftar Semester",
					},
					{
						link: "/semesters/create",
						title: "Buat Semester",
					},
				]}
				icon={BASE_ICON.MENU.SemesterIcon}
			/>
			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
					<div>
						<div className="mb-2 block">
							<Label htmlFor="name" value="Nama" />
						</div>
						<TextInput
							value={semesterName}
							onChange={(e) => setSemesterName(e.target.value)}
							type="text"
							placeholder="nama semester"
							required={true}
						/>
					</div>
					<div className="flex justify-end">
						<ButtonStyle title="Aktifkan" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default SemesterDetail;
