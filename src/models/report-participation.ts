import { DepartmentTypes } from "./department";
import { StudentTypes } from "./student";
import { StudyProgramTypes } from "./study-program";

export interface ReportParticipationTypes {
	report_participation_id?: string;
	report_participation_letter?: string;
	report_participation_status_message?: string;
	report_participation_status?: "waiting" | "accepted" | "rejected";
	study_program_id?: string;
	major_id?: string;
	student_id?: string;
}

export interface ReportParticipationDetailTypes extends ReportParticipationTypes {
	student: StudentTypes;
	list_of_study_program: StudyProgramTypes;
	list_of_major: DepartmentTypes;
}

export interface ReportParticipationUpdateTypes {
	report_participation_id?: string;
	report_participation_letter?: string;
	report_participation_status_message?: string;
	report_participation_status?: "waiting" | "accepted" | "rejected";
}
