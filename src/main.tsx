import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import ErrorPage from "./error-page";
import FaQ from "./pages/faq";
import LogActivity from "./pages/log-activity";
import ManageUser from "./pages/manage-users";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import RecomendationLetterList from "./pages/recomendation-letter/list-recomendation-letter";
import RecomendationLetterCreate from "./pages/recomendation-letter/create-recomendation-letter";
import RecomendationLetterDetail from "./pages/recomendation-letter/detail-detail-recomendation-letter";
import ReportParticipationListView from "./pages/report-participation/list-report-participation";
import ReportParicipationCreateView from "./pages/report-participation/create-report-participation";
import ReportParicipationDetailView from "./pages/report-participation/detail-report-participation";
import SemesterListView from "./pages/semester/list-semester";
import SemesterCreateView from "./pages/semester/create-semester";
import SemesterDetail from "./pages/semester/detail-semester";
import StudentListView from "./pages/student/list-student";
import StudentDetailView from "./pages/student/detail-student";
import MbkmProgramEditView from "./pages/mbkm-program/edit-mbkm-program";
import MbkmProgramCreatView from "./pages/mbkm-program/create-mbkm-program";
import MbkmProgramDetailView from "./pages/mbkm-program/detail-mbkm-program";
import MbkmProgramListView from "./pages/mbkm-program/list-mbkm-program";
import LogBookListView from "./pages/log-book/list-log-book";
import StudyProgramListView from "./pages/study-program";
import LogBooksCreateView from "./pages/log-book/create-log-book";
import LogBookDetailView from "./pages/log-book/detail-log-book";
import MbkmProgramProdiListView from "./pages/mbkm-program-prodi/list-mbkm-program-prodi";
import MbkmProgramProdiDetailView from "./pages/mbkm-program-prodi/detail-mbkm-program-prodi";
import MataKuliahListView from "./pages/mata-kuliah/list-mata-kuliah";
import MataKuliahCreateView from "./pages/mata-kuliah/create-log-book";
import MbkmProgramStudentMyProgramView from "./pages/mbkm-program-student/my-mbkm-program";

import { themeConfig } from "./configs/themeConfig";
import { ThemeProvider } from "@emotion/react";
import AppLayout from "./layout/appLayout";

const privateRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
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

			//student program
			{
				path: "/mbkm-programs/students/:studentId",
				element: <MbkmProgramStudentMyProgramView />,
			},
			// {
			// 	path: "/mbkm-programs/students/",
			// 	element: <MbkmProgramStudentList />,
			// },
			// {
			// 	path: "/mbkm-programs/students/create",
			// 	element: <MbkmProgramStudentCreat />,
			// },
			// {
			// 	path: "/mbkm-programs/students/:programId",
			// 	element: <MbkmProgramStudentDetail />,
			// },

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
				element: <LogBooksCreateView />,
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
				element: <StudyProgramListView />,
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
		<ThemeProvider theme={themeConfig}>
			<RouterProvider router={isAuth ? privateRouter : publicRouter} />
		</ThemeProvider>
	</React.StrictMode>
);
