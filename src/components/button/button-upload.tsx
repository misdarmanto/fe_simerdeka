import { ref } from "firebase/storage";
import React, { useRef, useState } from "react";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { Button } from "flowbite-react";
import { RiUpload2Fill } from "react-icons/ri";

interface ButtonUploadFileTypes {
	onUpload: (url: string) => void;
}

const ButtonUploadFile = ({ onUpload }: ButtonUploadFileTypes) => {
	const fileInputRef: any = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState("");

	const handleFileUpload = async () => {
		const file = fileInputRef.current.files[0];
		const imageRef = ref(storage, "request-Lor/" + file.name);
		try {
			setIsLoading(true);
			const url = await uploadImageToFirebase({ imageRef, file });
			onUpload(url);
			setFileName(file.name);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<Button color="light" onClick={() => fileInputRef.current.click()}>
				<RiUpload2Fill size={20} />
				<p className="mx-2">{isLoading ? "Loading..." : "Upload File"} </p>
			</Button>
			<p className="mx-2 my-2 text-gray-500">{fileName} </p>
			<input
				type="file"
				className="absolute top-0 left-0 opacity-0"
				ref={fileInputRef}
				onChange={handleFileUpload}
			/>
		</div>
	);
};

export default ButtonUploadFile;
