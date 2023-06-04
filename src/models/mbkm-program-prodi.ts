import { DepartmentTypes } from "./department";
import { MbkmProgramTypes } from "./mbkm-program";
import { SemesterTypes } from "./semester";
import { StudyProgramTypes } from "./study-program";

export interface MbkmProgramProdiTypes {
	mbkm_program_prodi_id?: string;
	mbkm_program_prodi_program_id?: string;
	mbkm_program_prodi_program_name?: string;
	mbkm_program_prodi_study_program_id?: string;
	mbkm_program_prodi_study_program_name?: string;
	mbkm_program_prodi_department_id?: string;
	mbkm_program_prodi_department_name?: string;
	mbkm_program_prodi_semester_id?: string;
	department: DepartmentTypes;
	study_program: StudyProgramTypes;
	semester: SemesterTypes;
	mbkm_program: MbkmProgramTypes;
}

export interface MbkmProgramProdiCreateRequestTypes {
	mbkm_program_prodi_program_id?: string;
	mbkm_program_prodi_program_name?: string;
	mbkm_program_prodi_study_program_id?: string;
	mbkm_program_prodi_study_program_name?: string;
	mbkm_program_prodi_department_id?: string;
	mbkm_program_prodi_department_name?: string;
	mbkm_program_prodi_semester_id?: string;
}
