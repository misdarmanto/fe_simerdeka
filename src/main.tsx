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
import RequestLoR from "./routers/registration-LoR/index";
import Semester from "./routers/semester";
import Student from "./routers/student";
import StudyProgram from "./routers/study-program";
import VerificationLoR from "./routers/verification-LoR";
import VerificationProgram from "./routers/verification-program";
import ManageUser from "./routers/manage-users";
import CreateRequestLoR from "./routers/registration-LoR/create-request-LoR.view";
import Login from "./routers/auth/login";
import Register from "./routers/auth/register";
import DetailRequestLoR from "./routers/registration-LoR/detail-request-LoR.view";

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
				path: "/mbkm-summaries",
				element: <MbkmSummary />,
			},
			{
				path: "/my-programs",
				element: <MyProgram />,
			},
			{
				path: "/program-proposal",
				element: <ProgramProposal />,
			},
			{
				path: "/request-LoR",
				element: <RequestLoR />,
			},
			{
				path: "/request-LoR/create",
				element: <CreateRequestLoR />,
			},
			{
				path: "/request-LoR/detail/:requestLoRId",
				element: <DetailRequestLoR />,
			},
			{
				path: "/semesters",
				element: <Semester />,
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
				path: "/verification-LoR",
				element: <VerificationLoR />,
			},
			{
				path: "/verification-programs",
				element: <VerificationProgram />,
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
