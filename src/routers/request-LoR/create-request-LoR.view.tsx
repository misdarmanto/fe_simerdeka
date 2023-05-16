import { Button, Checkbox, FileInput, Label, Select, TextInput } from "flowbite-react";

const CreateRequestLoR = () => {
	return (
		<div className="bg-white border border-gray-200 rounded-lg shadow m-5 p-20">
			<form className="flex flex-col gap-4">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="name" value="Nama" />
					</div>
					<TextInput id="name" type="text" placeholder="nama..." required={true} />
				</div>

				<div>
					<div className="mb-2 block">
						<Label htmlFor="nim" value="NIM" />
					</div>
					<TextInput id="nim" type="text" placeholder="NIM..." required={true} />
				</div>

				<div id="select">
					<div className="mb-2 block">
						<Label htmlFor="dosen-wali" value="Dosen Wali" />
					</div>
					<Select id="dosen-wali" required={true}>
						<option>Dosen 1</option>
						<option>Dosen 2</option>
						<option>Dosen 3</option>
						<option>Dosen 4</option>
						<option>Dosen 5</option>
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="Nama Program MBKM yang ingin diikuti "
							value="Nama Program MBKM yang ingin diikuti "
						/>
					</div>
					<TextInput
						id="Nama Program MBKM yang ingin diikuti "
						type="text"
						placeholder="Nama Program MBKM yang ingin diikuti ..."
						required={true}
					/>
				</div>

				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="t"
							value="Keterkaitan Capaian Pembelajaran Program MBKM dengan Program Studi "
						/>
					</div>
					<TextInput
						id="t"
						type="text"
						placeholder="Keterkaitan Capaian Pembelajaran Program MBKM dengan Program Studi ..."
						required={true}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="file" value="Surat Persetujuan Dosen Wali" />
					</div>
					<FileInput id="file" />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="file" value="Transkrip semester 1-4 " />
					</div>
					<FileInput id="file" />
				</div>

				<Button type="submit" className="mt-10">
					Submit
				</Button>
			</form>
		</div>
	);
};

export default CreateRequestLoR;
