export interface UserCredentialTypes {
	userId: string;
	role: string;
}

export interface UserTypes {
	user_email: string;
	user_id: string;
	user_name: string;
	user_is_registered?: boolean;
	user_role?: "student" | "study_program" | "department" | "lp3m" | "academic";
	major_id?: string;
	study_program_id?: string;
}
