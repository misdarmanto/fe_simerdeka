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
		<div className="flex flex-col pb-3">
			<dt className="mb-1 text-gray-500">{title}</dt>
			{url ? (
				<a href={url} target="blank">
					<ButtonStyle
						color="light"
						title={isDownloadButton ? "Download" : `Lihat file`}
					/>
				</a>
			) : (
				<dd className="text-sm font-semibold">{description}</dd>
			)}
		</div>
	);
};

export default ListItemStyle;
