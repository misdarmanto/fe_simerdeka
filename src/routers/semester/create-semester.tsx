import { Label, Radio, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { SemesterTypes } from "../../models/semester";
import { RootContext } from "../../utils/contextApi";

const SemesterCreateView = () => {
	const [semesterName, setSemesterName] = useState<string>("");
	const [semesterStatus, setSemesterStatus] = useState<string>("active");
	const { currentUser }: any = useContext(RootContext);

	const navigate = useNavigate();

	const handleSelectSemester = (status: string) => {
		setSemesterStatus(status);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: SemesterTypes = {
				semester_name: semesterName,
				semester_created_by: currentUser.user_role,
				semester_status: semesterStatus,
			};

			const httpService = new ServiceHttp();
			await httpService.post({
				path: "/semesters",
				body: data,
			});
			navigate("/semesters");
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className="m-5">
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

					{/* <div id="select">
						<div className="mb-2 block">
							<Label htmlFor="select student" value="select student" />
						</div>
						<Select
							onChange={(e) => setSemesterType(e.target.value)}
							required={true}
						>
							<option value={"ganjil"}>Ganjil</option>
							<option value={"genap"}>Genap</option>
						</Select>
					</div> */}
					<fieldset className="flex flex-col gap-4" id="radio">
						<legend className="mb-5">Status Semester</legend>
						<div className="flex items-center gap-2">
							<Radio
								defaultChecked
								name="semester-status"
								value="active"
								onChange={(e) => handleSelectSemester(e.target.value)}
							/>
							<Label htmlFor="united-state">Aktif</Label>
						</div>
						<div className="flex items-center gap-2">
							<Radio
								name="semester-status"
								value="non-active"
								onChange={(e) => handleSelectSemester(e.target.value)}
							/>
							<Label htmlFor="united-state">Tidak Aktif</Label>
						</div>
					</fieldset>
					<div className="flex justify-end">
						<ButtonStyle title="Buat Semester" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default SemesterCreateView;
