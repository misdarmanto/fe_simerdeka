export interface UserCredentialTypes {
	userId: string;
	role: string;
}

export interface UserTypes {
	userId: string;
	userName: string;
	userEmail: string;
	userRole: "student" | "study_program" | "department" | "lp3m" | "academic";
	departmentId?: string;
	studyProgramId?: string;
}
