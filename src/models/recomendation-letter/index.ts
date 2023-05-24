export interface RecomendationLetterTypes {
	recomendation_letter_id?: string;
	study_program_id?: string;
	major_id?: string;
	student_id?: string;
	recomendation_letter_student_transkrip?: string;
	recomendation_letter_dosen_wali?: string;
	recomendation_letter_approval_letter?: string;
	recomendation_letter_from_study_program: string;
	recomendation_letter_from_major: string;
	recomendation_letter_from_lp3m: string;
	recomendation_letter_from_academic: string;
	recomendation_letter_program_name?: string;
	recomendation_letter_program_correlation?: string;
	recomendation_letter_status?: "waiting" | "accepted" | "rejected";
	recomendation_letter_status_message?: string;
	recomendation_letter_assign_to_student?: boolean;
	recomendation_letter_assign_to_study_program?: boolean;
	recomendation_letter_assign_to_major?: boolean;
	recomendation_letter_assign_to_academic?: boolean;
	recomendation_letter_assign_to_biro?: boolean;
}

export interface RecomendationLetterCreateRequestTypes {
	study_program_id: string;
	major_id: string;
	student_id: string;
	recomendation_letter_student_transkrip: string;
	recomendation_letter_dosen_wali: string;
	recomendation_letter_approval_letter: string;
	recomendation_letter_program_name: string;
	recomendation_letter_program_correlation: string;
}
