export interface MbkmProgramTypes {
	mbkm_program_id?: string;
	mbkm_program_created_by?: string;
	mbkm_program_name?: string;
	mbkm_program_category?: string;
	mbkm_program_syllabus?: string;
	semester_id?: string;
}

export interface MbkmProgramCreateTypes {
	mbkm_program_created_by: string;
	mbkm_program_name: string;
	mbkm_program_category: string;
	mbkm_program_syllabus: string;
	semester_id: string;
}
