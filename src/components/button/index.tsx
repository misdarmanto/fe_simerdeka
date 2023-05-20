import { Button } from "flowbite-react";

export interface ButtonStyleTypes {
	color?: "dark" | "gray" | "light" | "success" | "failure" | "warning";
	className?: string;
	title: string;
	onClick?: () => void;
}

export const ButtonStyle = ({
	color,
	title,
	className,
	onClick,
}: ButtonStyleTypes) => {
	return (
		<Button
			onClick={onClick}
			size="sm"
			className={"h-5" + className}
			color={color}
		>
			{title}
		</Button>
	);
};
