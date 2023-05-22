import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { SemesterTypes } from "../../models/semester";

const DetailSemester = () => {
	const [semester, setSemester] = useState<SemesterTypes>();
	const { semesterId } = useParams();

	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const result = await httpService.get({
			path: `/semesters/detail/${semesterId}`,
		});
		setSemester(result);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/semesters",
						title: "Semester",
					},
					{
						link: "/semesters/" + semesterId,
						title: "Detail Semester",
					},
				]}
				icon={BASE_MENU_ICON.MyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama Semester"
						description={semester?.semester_name}
					/>
					<ListItemStyle
						title="Tipe Semester"
						description={semester?.semester_type}
					/>

					<ListItemStyle
						title="Dibuat Oleh"
						description={semester?.semester_created_by}
					/>
				</dl>
			</div>
		</div>
	);
};

const ListItemStyle = ({
	title,
	description,
	url,
}: {
	title: string;
	description?: string;
	url?: string;
}) => {
	return (
		<div className="flex flex-col pb-3">
			<dt className="mb-1 text-gray-500">{title}</dt>
			{url ? (
				<a href={url} target="blank">
					{url}
				</a>
			) : (
				<dd className="text-sm font-semibold">{description}</dd>
			)}
		</div>
	);
};

export default DetailSemester;
