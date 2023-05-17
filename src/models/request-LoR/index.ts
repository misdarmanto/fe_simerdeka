export interface RegistrationLoR {
	registration_lor_id?: string;
	user_id: string;
	student_id: string;
	student_name: string;
	student_nim: string;
	student_transkrip: string;
	dosen_wali: string;
	surat_persetujuan_dosen_wali: string;
	program_name: string;
	program_correlation_description: string;
	registration_status: "waiting" | "process" | "accepted" | "rejected";
}
