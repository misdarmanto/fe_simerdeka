import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { ProgramTypes } from "../../models/program";

const JurusanProgramDetail = () => {
	const [programs, setPrograms] = useState<ProgramTypes>();
	const { programId } = useParams();
	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const result = await httpService.get({
			path: `/programs/detail/${programId}`,
		});
		setPrograms(result);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs/jurusan",
						title: "My Programs",
					},
					{
						link: "/mbkm-programs/jurusan" + programId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle title="Nama" description={programs?.program_name} />
					<ListItemStyle
						title="Deskripsi"
						description={programs?.program_description}
					/>

					<ListItemStyle
						title="Program Owner"
						description={programs?.program_owner}
					/>
					<ListItemStyle
						title="Program Type"
						description={programs?.program_type}
					/>
					<ListItemStyle
						title="konversi sks"
						description={programs?.program_sks_conversion}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={programs?.program_syllabus}
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

export default JurusanProgramDetail;
