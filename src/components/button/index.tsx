import { Button } from "flowbite-react";

export interface ButtonStyleTypes {
	color?: "dark" | "gray" | "light" | "success" | "failure" | "warning";
	className?: string;
	title: string;
	type?: "button" | "submit" | "reset" | undefined;
	onClick?: () => void;
	onSubmit?: () => void;
	disabled?: boolean;
}

export const ButtonStyle = ({
	color,
	title,
	className,
	type = "button",
	onClick,
	disabled = false,
}: ButtonStyleTypes) => {
	return (
		<Button
			onClick={onClick}
			disabled={disabled}
			type={type}
			size="sm"
			className={"h-5 " + className}
			color={color}
		>
			{title}
		</Button>
	);
};
