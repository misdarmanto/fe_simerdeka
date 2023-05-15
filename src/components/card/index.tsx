import { Card } from "flowbite-react";
import Typography from "../typography";
import { convertNumberToCurrency } from "../../utils/convertNumberToCurrency";

type CardTypes = {
	image: string;
	title: string;
	price: number | string;
	className?: string;
	stars: number;
};

const CardStyle = ({ image, title, price, stars, className }: CardTypes) => {
	return (
		<div className="max-w-sm">
			<Card imgAlt="image" imgSrc={image} className={`md:m-5 p-3 ${className}`}>
				<Typography variant="h3">{title}</Typography>
				<div className="mt-2.5 mb-2 flex items-center">
					{[...Array(stars).keys()].map((star: number) => (
						<svg
							key={star}
							className="h-5 w-5 text-yellow-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
					))}
					<span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
						{stars.toPrecision()}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<Typography variant="p">Rp.{convertNumberToCurrency(+price)}</Typography>
				</div>
			</Card>
		</div>
	);
};

export default CardStyle;
