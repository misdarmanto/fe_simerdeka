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
import Student from "./routers/student";
import StudyProgram from "./routers/study-program";
import ManageUser from "./routers/manage-users";
import Login from "./routers/auth/login";
import Register from "./routers/auth/register";
import RecomendationLetterList from "./routers/recomendation-letter/list-recomendation-letter";
import RecomendationLetterCreate from "./routers/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "./routers/recomendation-letter/detail-detail-recomendation-letter";
import AcademicProgramCreat from "./routers/program-for-academic/create-academic-program";
import AcademicProgramList from "./routers/program-for-academic/list-academic-program";
import AcademicProgramDetail from "./routers/program-for-academic/detail-academic-program";
import JurusanProgramCreat from "./routers/program-for-jurusan/create-jurusan-program";
import JurusanProgramList from "./routers/program-for-jurusan/list-academic-program";
import JurusanProgramDetail from "./routers/program-for-jurusan/detail-academic-program";
import ProdiProgramList from "./routers/program-for-prodi/list-prodi-program";
import ProdiProgramCreat from "./routers/program-for-prodi/create-prodi-program";
import ProdiProgramDetail from "./routers/program-for-prodi/detail-prodi-program";
import StudentProgramListView from "./routers/program-for-student/list-student-program";
import DetailStudentProgramView from "./routers/program-for-student/detail-student-program";
import ReportParticipationListView from "./routers/report-participation/list-report-participation";
import ReportParicipationCreateView from "./routers/report-participation/create-report-participation";
import ReportParicipationDetailView from "./routers/report-participation/detail-report-participation";
import SemesterListView from "./routers/semester/list-semester";
import SemesterCreateView from "./routers/semester/create-semester";
import SemesterDetail from "./routers/semester/detail-semester";
import MbkmProgramList from "./routers/mbkm-program/list-mbkm-program";
import MbkmProgramCreat from "./routers/mbkm-program/create-mbkm-program";
import MbkmProgramDetail from "./routers/mbkm-program/detail-mbkm-program";

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

			//academic program
			{
				path: "/mbkm-programs/academic",
				element: <AcademicProgramList />,
			},
			{
				path: "/mbkm-programs/academic/create",
				element: <AcademicProgramCreat />,
			},
			{
				path: "/mbkm-programs/academic/:programId",
				element: <AcademicProgramDetail />,
			},

			//jurusan program
			{
				path: "/mbkm-programs/jurusan",
				element: <JurusanProgramList />,
			},
			{
				path: "/mbkm-programs/jurusan/create",
				element: <JurusanProgramCreat />,
			},
			{
				path: "/mbkm-programs/jurusan/:programId",
				element: <JurusanProgramDetail />,
			},

			//prodi program

			{
				path: "/mbkm-programs/prodi",
				element: <ProdiProgramList />,
			},
			{
				path: "/mbkm-programs/prodi/create",
				element: <ProdiProgramCreat />,
			},
			{
				path: "/mbkm-programs/prodi/:programId",
				element: <ProdiProgramDetail />,
			},

			//student program
			{
				path: "/mbkm-programs/student/",
				element: <StudentProgramListView />,
			},
			{
				path: "/mbkm-programs/student/:programId",
				element: <DetailStudentProgramView />,
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
			{
				path: "/students",
				element: <Student />,
			},
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
