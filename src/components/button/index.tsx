import { Button } from "flowbite-react";

export interface ButtonStyleTypes {
	color?: "dark" | "gray" | "light" | "success" | "failure" | "warning";
	className?: string;
	title: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	onSubmit?: () => void;
}

export const ButtonStyle = ({
	color,
	title,
	className,
	type = "button",
	onClick,
}: ButtonStyleTypes) => {
	return (
		<Button
			onClick={onClick}
			type={type}
			size="sm"
			className={"h-5 " + className}
			color={color}
		>
			{title}
		</Button>
	);
};
