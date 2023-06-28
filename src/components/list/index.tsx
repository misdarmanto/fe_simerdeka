import { ButtonStyle } from "../button";

const ListItemStyle = ({
	title,
	description,
	url,
	isDownloadButton = false,
}: {
	title: string;
	description?: string;
	url?: string;
	isDownloadButton?: boolean;
}) => {
	return (
		<div className="flex gap-2 items-center py-2 text-gray-500 ">
			<dt>{title}</dt> :
			{url ? (
				<a href={url} target="blank">
					<ButtonStyle
						color="light"
						title={isDownloadButton ? "Download" : `Lihat file`}
					/>
				</a>
			) : (
				<dd className="text-sm">{description || "_"}</dd>
			)}
		</div>
	);
};

export default ListItemStyle;
