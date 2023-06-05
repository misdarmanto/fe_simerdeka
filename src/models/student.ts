import { MbkmProgramTypes } from "./mbkm-program";
import { TranskripTypes } from "./transkrip";

export interface StudentTypes {
	student_id?: string;
	student_name?: string;
	student_nim?: string;
	student_email?: string;
	student_department_id?: string;
	student_department_name?: string;
	student_study_program_id?: string;
	student_study_program_name?: string;
	student_mbkm_program_id?: string;
	student_transkrip_id?: string;
	student_sks_total?: number;
	transkrip?: TranskripTypes[];
	mbkm_program?: MbkmProgramTypes;
}
