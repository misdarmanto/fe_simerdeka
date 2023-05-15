import React, { ReactNode } from "react";

interface TypographyProps {
	variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	children: ReactNode;
	className?: string;
}

const VARIANT_CLASSES_MAP = {
	h1: "text-4xl font-bold",
	h2: "text-3xl font-bold",
	h3: "text-2xl font-bold",
	h4: "text-xl font-bold",
	h5: "text-lg font-bold",
	h6: "text-base font-bold",
	p: "text-base",
};

const Typography: React.FC<TypographyProps> = ({ variant, children, className }) => {
	const Element = variant || "p";
	const classes = `${VARIANT_CLASSES_MAP[variant]} ${className || ""}`;
	return <Element className={classes}>{children}</Element>;
};

export default Typography;
