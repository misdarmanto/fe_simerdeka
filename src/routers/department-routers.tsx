import Home from "../pages/home";
import FaQ from "../pages/faq";
import LogBookDetailView from "../pages/log-book/detail-log-book";
import LogBookListView from "../pages/log-book/list-log-book";
import MataKuliahCreateView from "../pages/mata-kuliah/mata-kuliah-create";
import MataKuliahListView from "../pages/mata-kuliah/list-mata-kuliah";
import MbkmProgramProdiDetailView from "../pages/mbkm-program-prodi/detail-mbkm-program-prodi";
import MbkmProgramProdiListView from "../pages/mbkm-program-prodi/list-mbkm-program-prodi";
import MbkmProgramCreatView from "../pages/mbkm-program/create-mbkm-program";
import MbkmProgramDetailView from "../pages/mbkm-program/detail-mbkm-program";
import MbkmProgramEditView from "../pages/mbkm-program/edit-mbkm-program";
import MbkmProgramListView from "../pages/mbkm-program/list-mbkm-program";
import RecomendationLetterCreate from "../pages/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "../pages/recomendation-letter/detail-detail-recomendation-letter";
import RecomendationLetterList from "../pages/recomendation-letter/list-recomendation-letter";
import ReportParicipationCreateView from "../pages/report-participation/create-report-participation";
import ReportParicipationDetailView from "../pages/report-participation/detail-report-participation";
import ReportParticipationListView from "../pages/report-participation/list-report-participation";
import StudentDetailView from "../pages/student/detail-student";
import StudentListView from "../pages/student/list-student";
import StudyProgramListView from "../pages/study-program";

export const departmentRouters = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/faq",
		element: <FaQ />,
	},

	//mbkm program
	{
		path: "/mbkm-programs",
		element: <MbkmProgramListView />,
	},
	{
		path: "/mbkm-programs/create",
		element: <MbkmProgramCreatView />,
	},
	{
		path: "/mbkm-programs/detail/:mbkmProgramId",
		element: <MbkmProgramDetailView />,
	},

	{
		path: "/mbkm-programs/edit/:mbkmProgramId",
		element: <MbkmProgramEditView />,
	},

	//mbkm program prodi
	{
		path: "/mbkm-programs/prodi",
		element: <MbkmProgramProdiListView />,
	},
	{
		path: "/mbkm-programs/prodi/detail/:mbkmProgramId",
		element: <MbkmProgramProdiDetailView />,
	},

	//report participation
	{
		path: "/report-participations",
		element: <ReportParticipationListView />,
	},
	{
		path: "/report-participations/create",
		element: <ReportParicipationCreateView />,
	},

	{
		path: "/report-participations/detail/:reportParticipationId",
		element: <ReportParicipationDetailView />,
	},

	//log books

	{
		path: "/log-books",
		element: <LogBookListView />,
	},
	{
		path: "/log-books/create",
		element: <LogBookListView />,
	},
	{
		path: "/log-books/detail/:logBookId",
		element: <LogBookDetailView />,
	},

	//mata kuliah

	{
		path: "/mata-kuliah",
		element: <MataKuliahListView />,
	},
	{
		path: "/mata-kuliah/create",
		element: <MataKuliahCreateView />,
	},

	{
		path: "/recomendation-letters",
		element: <RecomendationLetterList />,
	},
	{
		path: "/recomendation-letters/create",
		element: <RecomendationLetterCreate />,
	},
	{
		path: "/recomendation-letters/detail/:recomendationLetterId",
		element: <RecomendationLetterDetail />,
	},

	//student
	{
		path: "/students",
		element: <StudentListView />,
	},
	{
		path: "/students/detail/:studentId",
		element: <StudentDetailView />,
	},

	//study program
	{
		path: "/study-programs",
		element: <StudyProgramListView />,
	},
];
