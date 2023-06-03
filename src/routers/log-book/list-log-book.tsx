import { Badge, TextInput } from "flowbite-react";
import { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_ICON, BASE_MENU_ICON, BreadcrumbStyle } from "../../components";
import { ButtonStyle } from "../../components";
import { ServiceHttp } from "../../services/api";
import { CONFIG } from "../../configs";
import { TableHeader, TableStyle } from "../../components/table/Table";
import { RootContext } from "../../utils/contextApi";
import { converDateTimeFromDB } from "../../utils/convert";
import ModalStyle from "../../components/modal";
import { SemesterTypes } from "../../models/semester";
import { UserTypes } from "../../models/user";
import { LogBookTypes } from "../../models/log-book";

const LogBookListView = () => {
	const [listLogBook, setListLogBook] = useState<any>();
	const [isLoading, setIsLoading] = useState(true);
	const { currentUser }: any = useContext(RootContext);
	const user: UserTypes = currentUser;
	const navigate = useNavigate();
	const [openModalDelete, setOpenModalDelete] = useState(false);
	const [modalDeleteData, setModalDeleteData] = useState<LogBookTypes>();
	const httpService = new ServiceHttp();

	const handleModalDelete = () => {
		setOpenModalDelete(!openModalDelete);
	};

	const handleModaDataSelected = (item: LogBookTypes) => {
		setModalDeleteData(item);
	};

	const handleDeleteLogBook = async () => {
		await httpService.remove({
			path: `/log-books?log_book_id=${modalDeleteData?.log_book_id}`,
		});
		setOpenModalDelete(false);
		window.location.reload();
	};

	const fecthData = async () => {
		const result = await httpService.getTableData({
			url: CONFIG.base_url_api + "/log-books",
			pagination: true,
			page: 0,
			size: 10,
			filters: {
				search: "",
			},
		});

		setListLogBook({
			link: "/log-books",
			data: result,
			page: 0,
			size: 10,
			filter: {
				search: "",
			},
		});
		setIsLoading(false);
	};

	useEffect(() => {
		fecthData();
	}, []);

	const header: TableHeader[] = [
		{
			title: "No",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "-no"} className="md:px-6 md:py-3 break-all">
					{index + 1}
				</td>
			),
		},

		{
			title: "Nama",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "name"} className="md:px-6 md:py-3 break-all">
					{data.log_book_student_name}
				</td>
			),
		},
		{
			title: "NIM",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "nim"} className="md:px-6 md:py-3 break-all">
					{data.log_book_student_nim}
				</td>
			),
		},

		{
			title: "prodi",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "prodi"} className="md:px-6 md:py-3 break-all">
					{data.log_book_study_program_name}
				</td>
			),
		},

		{
			title: "jurusan",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "jurusan"} className="md:px-6 md:py-3 break-all">
					{data.log_book_department_name}
				</td>
			),
		},
		{
			title: "minggu ke",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "week"} className="md:px-6 md:py-3 break-all">
					{data.log_book_report_week}
				</td>
			),
		},
		{
			title: "di serahkan pada",
			data: (data: any, index: number): ReactElement => (
				<td key={index + "submission"} className="md:px-6 md:py-3 break-all">
					{converDateTimeFromDB(data.created_on)}
				</td>
			),
		},
		{
			title: "Action",
			action: true,
			data: (data: any, index: number): ReactElement => (
				<td key={index + "action"}>
					<div className="flex items-center">
						<Link to={`/log-books/detail/${data.log_book_id}`}>
							<ButtonStyle title="Detail" size="xs" color="light" />
						</Link>
						{user.user_role === "student" && (
							<ButtonStyle
								title="Hapus"
								size="xs"
								color="failure"
								className="mx-2"
								onClick={() => {
									handleModalDelete();
									handleModaDataSelected(data);
								}}
							/>
						)}
					</div>
				</td>
			),
		},
	];

	if (isLoading) return <div>loading...</div>;

	return (
		<div className="m-5">
			<BreadcrumbStyle
				listPath={[
					{
						link: "/log-books",
						title: "Log Book",
					},
					{
						link: "/log-books",
						title: "List",
					},
				]}
				icon={BASE_ICON.MENU.MbkmSummaryIcon}
			/>

			<div className="flex flex-col md:flex-row justify-between md:px-0">
				<div className="flex items-center">
					<div className="w-full mr-2 flex flex-row justify-between md:justify-start">
						<select
							name="size"
							defaultValue={10}
							className="block w-32 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
						>
							<option value="2">2</option>
							<option value="5">5</option>
							<option value="10">10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>

					{user.user_role === "student" && (
						<ButtonStyle
							title="Create"
							color="light"
							onClick={() => navigate("/log-books/create")}
						/>
					)}
				</div>
				<div className="mt-1 w-full md:w-1/5">
					<TextInput type="text" placeholder="search..." />
				</div>
			</div>

			<ModalStyle
				onBtnNoClick={handleModalDelete}
				title={`Apakah anda yakin ingin menghapus log book minggu ke-${modalDeleteData?.log_book_report_week}`}
				isOpen={openModalDelete}
				onBtnYesClick={handleDeleteLogBook}
				onOpen={handleModalDelete}
			/>
			<TableStyle header={header} table={listLogBook} />
		</div>
	);
};

export default LogBookListView;
