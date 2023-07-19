import { ref } from "firebase/storage";
import React, { useRef, useState } from "react";
import { storage } from "../../configs/firebase";
import { uploadImageToFirebase } from "../../utils/firebase";
import { Button } from "flowbite-react";
import { RiUpload2Fill } from "react-icons/ri";
import { useHttp } from "../../hooks/useHttp";
import axios from "axios";
import { CONFIG } from "../../configs";

interface ButtonUploadFileTypes {
	onUpload: (url: string) => void;
}

const ButtonUploadFile = ({ onUpload }: ButtonUploadFileTypes) => {
	const fileInputRef: any = useRef(null);
	const [isLoading, setIsLoading] = useState(false);
	const [fileName, setFileName] = useState("");

	const handleFileUpload = async () => {
		const selectedFile = fileInputRef.current.files[0];

		if (!selectedFile) {
			alert("Please select a file to upload.");
			return;
		}

		setFileName(selectedFile.name);

		const formData = new FormData();
		formData.append("file", selectedFile);

		console.log("________form data_________");
		console.log(formData);

		try {
			const result = await axios.post(
				CONFIG.base_url_api + "/upload-file",
				{ file: fileInputRef.current.files[0] },
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
					auth: {
						username: CONFIG.authorization.username,
						password: CONFIG.authorization.passsword,
					},
				}
			);

			setIsLoading(false);
			console.log(result.data);
			alert("File uploaded successfully!");
		} catch (error) {
			console.log(error);
			alert("Error uploading the file.");
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
