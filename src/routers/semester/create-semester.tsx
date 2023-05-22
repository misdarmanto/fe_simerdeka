import { ref } from "firebase/storage";
import { FileInput, Label, Select, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { LIST_USER } from "../../data/users";
import { UserTypes } from "../../models/auth";
import { UserCredentialTypes } from "../../models/auth";
import { SemesterTypes } from "../../models/semester";
import { RootContext } from "../../utils/contextApi";

const CreateSemester = () => {
	const [semesterName, setSemesterName] = useState<string>("");
	const [semesterType, setSemesterType] = useState<string>("");
	const { currentUser }: any = useContext(RootContext);

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const data: SemesterTypes = {
				semester_name: semesterName,
				semester_type: semesterType,
				semester_created_by: currentUser.user_role,
			};

			console.log(data);

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
				icon={BASE_MENU_ICON.LoRIcon}
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

					<div id="select">
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
					</div>

					<div className="flex justify-end">
						<ButtonStyle title="Submit" type="submit" color="dark" />
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateSemester;
