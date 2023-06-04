import { Label, Textarea } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_MENU_ICON, BreadcrumbStyle, ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { RootContext } from "../../utils/contextApi";
import {
	ReportParticipationDetailTypes,
	ReportParticipationUpdateTypes,
} from "../../models/report-participation";
import ListItemStyle from "../../components/list";
import { converDateTimeFromDB, convertStatusName } from "../../utils/convert";
import { LogBookTypes } from "../../models/log-book";

const LogBookDetailView = () => {
	const [logBook, setLogBook] = useState<LogBookTypes>();

	const { logBookId } = useParams();
	const { currentUser }: any = useContext(RootContext);
	const navigation = useNavigate();
	const httpService = new ServiceHttp();

	const fecthLogBook = async () => {
		const result = await httpService.get({
			path: `/log-books/detail/${logBookId}`,
		});
		setLogBook(result);
	};

	useEffect(() => {
		fecthLogBook();
	}, []);

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/log-books",
						title: "Log Book",
					},
					{
						link: "/log-books/" + logBookId,
						title: "Detail",
					},
				]}
				icon={BASE_MENU_ICON.MbkmSummaryIcon}
			/>

			<div className="bg-white border border-2 border-gray-200 rounded-lg p-10">
				<dl className="max-w-md text-gray-900 divide-y divide-gray-200">
					<ListItemStyle
						title="Nama"
						description={logBook?.log_book_student_name}
					/>
					<ListItemStyle
						title="NIM"
						description={logBook?.log_book_student_nim}
					/>
					<ListItemStyle
						title="Program Studi"
						description={logBook?.log_book_study_program_name}
					/>
					<ListItemStyle
						title="Jurusan"
						description={logBook?.log_book_department_name}
					/>
					<ListItemStyle
						title="Laporam minggu ke"
						description={logBook?.log_book_report_week + ""}
					/>
					<ListItemStyle
						title="Diserahkan pada"
						description={converDateTimeFromDB(logBook?.created_on)}
					/>
					<ListItemStyle title="Log Book" url={logBook?.log_book_report_file} />
				</dl>
			</div>
		</div>
	);
};

export default LogBookDetailView;
