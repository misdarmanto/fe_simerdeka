import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./routers/home";
import ErrorPage from "./error-page";
import Root from "./routers/root";
import FaQ from "./routers/faq";
import LogActivity from "./routers/log-activity";
import MbkmProgram from "./routers/mbkm-program";
import MbkmSummary from "./routers/mbkm-summary";
import MyProgram from "./routers/my-program";
import ProgramProposal from "./routers/program-proposal";
import Semester from "./routers/semester";
import Student from "./routers/student";
import StudyProgram from "./routers/study-program";
import ManageUser from "./routers/manage-users";
import Login from "./routers/auth/login";
import Register from "./routers/auth/register";
import RegistrationLoR from "./routers/recodendation-letter/recomendation-letter-list";
import CreateRegistrationLoR from "./routers/recodendation-letter/create-recodendation-letter";
import DetailRegistrationLoR from "./routers/recodendation-letter/detail-detail-recomendation-letter";
import CreateMbkmProgram from "./routers/mbkm-program/create-program";
import DetailProgram from "./routers/mbkm-program/detail-program";
import DetailMyProgram from "./routers/my-program/detail-my-program";
import CreateSemester from "./routers/semester/create-semester";
import DetailSemester from "./routers/semester/detail-semester";
import RecomendationLetterList from "./routers/recodendation-letter/recomendation-letter-list";
import RecomendationLetterCreate from "./routers/recodendation-letter/create-recodendation-letter";
import RecomendationLetterDetail from "./routers/recodendation-letter/detail-detail-recomendation-letter";

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
			{
				path: "/mbkm-programs",
				element: <MbkmProgram />,
			},
			{
				path: "/mbkm-programs/create",
				element: <CreateMbkmProgram />,
			},
			{
				path: "/mbkm-programs/:programId",
				element: <DetailProgram />,
			},
			{
				path: "/mbkm-summaries",
				element: <MbkmSummary />,
			},
			{
				path: "/my-programs",
				element: <MyProgram />,
			},
			{
				path: "/my-programs/:programId",
				element: <DetailMyProgram />,
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
				element: <Semester />,
			},
			{
				path: "/semesters/create",
				element: <CreateSemester />,
			},
			{
				path: "/semesters/detail/:semesterId",
				element: <DetailSemester />,
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={true ? privateRouter : publicRouter} />
	</React.StrictMode>
);
