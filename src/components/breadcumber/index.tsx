import { Breadcrumb } from "flowbite-react";

type PathItem = {
	link: string;
	title: string;
};

export interface BreadcrumbStyleTypes {
	icon: any;
	listPath: PathItem[];
}

export const BreadcrumbStyle = ({ icon, listPath }: BreadcrumbStyleTypes) => {
	return (
		<Breadcrumb className="my-5">
			{listPath.map((item, index) => {
				if (index == 0) {
					return (
						<Breadcrumb.Item href={item.link} icon={icon}>
							{item.title}
						</Breadcrumb.Item>
					);
				}
				return <Breadcrumb.Item href={item.link}>{item.title}</Breadcrumb.Item>;
			})}
		</Breadcrumb>
	);
};
