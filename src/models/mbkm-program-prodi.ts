import { DepartmentTypes } from "./department";
import { MbkmProgramTypes } from "./mbkm-program";
import { SemesterTypes } from "./semester";
import { StudyProgramTypes } from "./study-program";

export interface MbkmProgramProdiTypes {
	mbkmProgramProdiId: string;
	mbkmProgramProdiProgramId: string;
	mbkmProgramProdiProgramName: string;
	mbkmProgramProdiStudyProgramId: string;
	mbkmProgramProdiStudyProgramName: string;
	mbkmProgramProdiDepartmentId: string;
	mbkmProgramProdiDepartmentName: string;
	mbkmProgramProdiSemesterId: string;
	department: DepartmentTypes;
	studyProgram: StudyProgramTypes;
	semester: SemesterTypes;
	mbkmProgram: MbkmProgramTypes;
}

export interface MbkmProgramProdiCreateRequestTypes {
	mbkmProgramProdiProgramId: string;
	mbkmProgramProdiProgramName: string;
	mbkmProgramProdiStudyProgramId: string;
	mbkmProgramProdiStudyProgramName: string;
	mbkmProgramProdiDepartmentId: string;
	mbkmProgramProdiDepartmentName: string;
	mbkmProgramProdiSemesterId: string;
}
