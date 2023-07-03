import Home from "../pages/home";
import FaQ from "../pages/faq";
import ReportParticipationListView from "../pages/report-participation/list-report-participation";
import ReportParicipationCreateView from "../pages/report-participation/create-report-participation";
import ReportParicipationDetailView from "../pages/report-participation/detail-report-participation";
import LogBookListView from "../pages/log-book/list-log-book";
import LogBookDetailView from "../pages/log-book/detail-log-book";
import RecomendationLetterCreate from "../pages/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "../pages/recomendation-letter/detail-detail-recomendation-letter";
import RecomendationLetterList from "../pages/recomendation-letter/list-recomendation-letter";
import MyMbkmProgramVies from "../pages/my-mbkm-program/my-mbkm-programs";
import TranskripDetailView from "../pages/transkrip/transkrip-detail";

export const studentRouters = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/faq",
		element: <FaQ />,
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

	//my program
	{
		path: "/my-mbkm-program",
		element: <MyMbkmProgramVies />,
	},

	//transkrip
	{
		path: "/transkrip",
		element: <TranskripDetailView />,
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
];
