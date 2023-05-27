import { ListOfMajor, ListOfStudyProgram } from "../list-of-major-and-study-program";
import { StudentTypes } from "../student";

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
	list_of_study_program: ListOfStudyProgram;
	list_of_major: ListOfMajor;
}

export interface ReportParticipationUpdateTypes {
	report_participation_id?: string;
	report_participation_letter?: string;
	report_participation_status_message?: string;
	report_participation_status?: "waiting" | "accepted" | "rejected";
}
