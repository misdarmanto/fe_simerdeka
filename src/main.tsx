import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routers/home";
import Contact from "./routers/contact";
import About from "./routers/about";
import ErrorPage from "./error-page";
import Root from "./routers/root";
import Menu from "./routers/menu";
import DetailMenu from "./routers/menu/detail";

const router = createBrowserRouter([
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
				path: "/menu",
				element: <Menu />,
			},
			{
				path: "/menu/detail/:id",
				element: <DetailMenu />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
			{
				path: "/about",
				element: <About />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
