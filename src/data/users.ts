import { UserTypes } from "../models/auth";

export const LIST_USER: UserTypes[] = [
	{
		user_id: "46cbc5cd-8f15-4777-a7c1-84767ec2342f",
		user_name: "Mahasiswa T.Telekomunikasi",
		user_email: "mahasiswa@mail.com",
		user_role: "mahasiswa",
		study_program_id: "c01f3e37-cd2d-48ed-b5de-0c3505bb1ff6",
		major_id: "ab74e972-8a59-4b34-8df6-0f860b5d60d6",
	},
	{
		user_id: "8cd17bb9-d727-4578-99c5-a223296d55b8",
		user_name: "Mahasiswa Matematika",
		user_email: "budi.mahasiswa@mail.com",
		user_role: "mahasiswa",
		study_program_id: "866f8f1c-f51c-4bfc-80f3-fc0b6d44b27e",
		major_id: "ab74e972-8a59-4b34-8df6-0f860b5d60d6",
	},
	{
		user_id: "8cd17bb9-d727-4578-99c5ssadsa",
		user_name: "Mahasiswa Teknik Geomatika",
		user_email: "Yono.mahasiswa@mail.com",
		user_role: "mahasiswa",
		study_program_id: "80769fad-7287-49b1-be85-0811a0dd2ecf",
		major_id: "5e36b9c2-85fa-4bf8-91bf-b8628fa8cff9",
	},

	//prodi

	{
		user_id: "e7c9b63d-bb5a-4b6f-9fd5-9fcbd0b17b56",
		user_name: "Prodi T.Telekomunikasi",
		user_email: "TT.prodi@mail.com",
		user_role: "prodi",
		study_program_id: "c01f3e37-cd2d-48ed-b5de-0c3505bb1ff6",
		major_id: "ab74e972-8a59-4b34-8df6-0f860b5d60d6",
	},

	{
		user_id: "e7c9b63d-bb5a-4b6f-9fd5-9fsdsdsd",
		user_name: "Prodi Matematika",
		user_email: "Matematika.prodi@mail.com",
		user_role: "prodi",
		study_program_id: "866f8f1c-f51c-4bfc-80f3-fc0b6d44b27e",
		major_id: "ab74e972-8a59-4b34-8df6-0f860b5d60d6",
	},

	{
		user_id: "e7c9b63d-bb5a-4b6f-9fd5-9fcbdsdsds",
		user_name: "Prodi Teknik Geomatika",
		user_email: "T.Geomatika.prodi@mail.com",
		user_role: "prodi",
		study_program_id: "80769fad-7287-49b1-be85-0811a0dd2ecf",
		major_id: "5e36b9c2-85fa-4bf8-91bf-b8628fa8cff9",
	},

	//jurusan
	{
		user_id: "9403eba1-fdde-40d2-961e-50dac2bb6068",
		user_name: "Jurusan SAINS",
		user_email: "sains.jurusan@mail.com",
		user_role: "jurusan",
		major_id: "ab74e972-8a59-4b34-8df6-0f860b5d60d6",
	},
	{
		user_id: "9403eba1-fdde-40d2-961e-50dac2bb6068ww",
		user_name: "Jurusan JTIK",
		user_email: "jtik.jurusan@mail.com",
		user_role: "jurusan",
		major_id: "5e36b9c2-85fa-4bf8-91bf-b8628fa8cff9",
	},
	{
		user_id: "9403eba1-fdde-40d2-961e-5sdsaaaass",
		user_name: "Jrusan JTPI",
		user_email: "jtpi.jurusan@mail.com",
		user_role: "jurusan",
		major_id: "a6c6f281-4257-42ed-87f1-dbb1acea8ac0",
	},

	//akademik dan biro
	{
		user_id: "2f982ddf-2092-45da-99d1-933718d78b13",
		user_name: "Akademik",
		user_email: "akademik@mail.com",
		user_role: "akademik",
	},
	{
		user_id: "dff45105-a6b5-4d78-8953-2499d0251115",
		user_name: "Biro",
		user_email: "biro@mail.com",
		user_role: "biro",
	},
];

// 	[
// 	{ userId: "8cd17bb9-d727-4578-99c5-a223296d55b8", role: "mahasiswa" },
// 	{ userId: "e7c9b63d-bb5a-4b6f-9fd5-9fcbd0b17b56", role: "prodi" },
// 	{ userId: "9403eba1-fdde-40d2-961e-50dac2bb6068", role: "jurusan" },
// 	{ userId: "2f982ddf-2092-45da-99d1-933718d78b13", role: "akademik" },
// 	{ userId: "dff45105-a6b5-4d78-8953-2499d0251115", role: "biro" },
// ];
