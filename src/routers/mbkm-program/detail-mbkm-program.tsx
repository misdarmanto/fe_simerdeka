import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { MbkmProgramTypes } from "../../models/mbkm-program";
import ListItemStyle from "../../components/list";

const MbkmProgramDetail = () => {
	const [mbkmProgram, setMbkmProgram] = useState<MbkmProgramTypes>();
	const { mbkmProgramId } = useParams();
	const httpService = new ServiceHttp();

	const fecthData = async () => {
		const result = await httpService.get({
			path: `/mbkm-programs/detail/${mbkmProgramId}`,
		});
		setMbkmProgram(result);
	};

	useEffect(() => {
		fecthData();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/mbkm-programs",
						title: "My Programs",
					},
					{
						link: "/mbkm-programs/detail/" + mbkmProgramId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MyProgramIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={mbkmProgram?.mbkm_program_name}
					/>
					<ListItemStyle
						title="kategori program"
						description={mbkmProgram?.mbkm_program_category}
					/>
					<ListItemStyle
						title="Program Syllabus"
						url={mbkmProgram?.mbkm_program_syllabus}
					/>
				</dl>
			</div>
		</div>
	);
};

export default MbkmProgramDetail;
