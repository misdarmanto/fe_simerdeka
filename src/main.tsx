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
import RegistrationLoR from "./routers/registration-LoR/index";
import CreateRegistrationLoR from "./routers/registration-LoR/create-registration-LoR.view";
import DetailRegistrationLoR from "./routers/registration-LoR/detail-registration-LoR.view";

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
				path: "/registration-LoR",
				element: <RegistrationLoR />,
			},
			{
				path: "/registration-LoR/create",
				element: <CreateRegistrationLoR />,
			},
			{
				path: "/registration-LoR/detail/:registrationLoRId",
				element: <DetailRegistrationLoR />,
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
