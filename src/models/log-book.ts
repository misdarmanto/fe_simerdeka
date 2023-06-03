export interface LogBookTypes {
	log_book_id?: string;
	log_book_report_file?: string;
	log_book_report_week?: number;
	log_book_student_id?: string;
	log_book_student_name?: string;
	log_book_student_nim?: string;
	log_book_study_program_id?: string;
	log_book_study_program_name?: string;
	log_book_department_id?: string;
	log_book_department_name?: string;
	created_on?: string;
}

export interface LogBookCreateRequestTypes {
	log_book_report_file: string;
	log_book_report_week: number;
}
