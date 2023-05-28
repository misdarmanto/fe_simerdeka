import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routers/home";
import ErrorPage from "./error-page";
import Root from "./routers/root";
import FaQ from "./routers/faq";
import LogActivity from "./routers/log-activity";
import MbkmSummary from "./routers/mbkm-summary";
import ProgramProposal from "./routers/program-proposal";
import StudyProgram from "./routers/study-program";
import ManageUser from "./routers/manage-users";
import Login from "./routers/auth/login";
import Register from "./routers/auth/register";
import RecomendationLetterList from "./routers/recomendation-letter/list-recomendation-letter";
import RecomendationLetterCreate from "./routers/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "./routers/recomendation-letter/detail-detail-recomendation-letter";
import ReportParticipationListView from "./routers/report-participation/list-report-participation";
import ReportParicipationCreateView from "./routers/report-participation/create-report-participation";
import ReportParicipationDetailView from "./routers/report-participation/detail-report-participation";
import SemesterListView from "./routers/semester/list-semester";
import SemesterCreateView from "./routers/semester/create-semester";
import SemesterDetail from "./routers/semester/detail-semester";
import MbkmProgramList from "./routers/mbkm-program/list-mbkm-program";
import MbkmProgramCreat from "./routers/mbkm-program/create-mbkm-program";
import MbkmProgramDetail from "./routers/mbkm-program/detail-mbkm-program";
import StudentListView from "./routers/student/list-student";
import StudentDetailView from "./routers/student/detail-student";
import MyMbkmProgramList from "./routers/mbkm-program-student/list-mbkm-program-student";
import MyMbkmProgramDetail from "./routers/mbkm-program-student/detail-mbkm-program-student";
import MbkmProgramStudentDetail from "./routers/mbkm-program-student/detail-mbkm-program-student";
import MbkmProgramStudentList from "./routers/mbkm-program-student/list-mbkm-program-student";
import MbkmProgramStudentCreat from "./routers/mbkm-program-student/create-mbkm-program-student";

const privateRouter = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/faq",
				element: <FaQ />,
			},
			{
				path: "/log-activities",
				element: <LogActivity />,
			},

			//mbkm program
			{
				path: "/mbkm-programs",
				element: <MbkmProgramList />,
			},
			{
				path: "/mbkm-programs/create",
				element: <MbkmProgramCreat />,
			},
			{
				path: "/mbkm-programs/detail/:mbkmProgramId",
				element: <MbkmProgramDetail />,
			},

			//student program
			{
				path: "/mbkm-programs/students/",
				element: <MbkmProgramStudentList />,
			},
			{
				path: "/mbkm-programs/students/create",
				element: <MbkmProgramStudentCreat />,
			},
			{
				path: "/mbkm-programs/students/:programId",
				element: <MbkmProgramStudentDetail />,
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

			//mbkm summary

			{
				path: "/mbkm-summaries",
				element: <MbkmSummary />,
			},
			{
				path: "/program-proposal",
				element: <ProgramProposal />,
			},
			{
				path: "/recomendation-letter",
				element: <RecomendationLetterList />,
			},
			{
				path: "/recomendation-letter/create",
				element: <RecomendationLetterCreate />,
			},
			{
				path: "/recomendation-letter/detail/:recomendationLetterId",
				element: <RecomendationLetterDetail />,
			},
			{
				path: "/semesters",
				element: <SemesterListView />,
			},
			{
				path: "/semesters/create",
				element: <SemesterCreateView />,
			},
			{
				path: "/semesters/detail/:semesterId",
				element: <SemesterDetail />,
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
				element: <StudyProgram />,
			},

			{
				path: "/manage-users",
				element: <ManageUser />,
			},
		],
	},
]);

const publicRouter = createBrowserRouter([
	{
		path: "/",
		// element: <Login />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

const isAuth = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={isAuth ? privateRouter : publicRouter} />
	</React.StrictMode>
);
