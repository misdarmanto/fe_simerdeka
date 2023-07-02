// export interface MbkmProgramProdiTypes {
// 	mbkmProgramProdiId: string;
// 	mbkmProgramProdiProgramId: string;
// 	mbkmProgramProdiProgramName: string;
// 	mbkmProgramProdiStudyProgramId: string;
// 	mbkmProgramProdiStudyProgramName: string;
// 	mbkmProgramProdiDepartmentId: string;
// 	mbkmProgramProdiDepartmentName: string;
// 	mbkmProgramProdiSemesterId: string;
// }

export interface MbkmProgramProdiCreateRequestTypes {
	mbkmProgramProdiProgramId: string;
	mbkmProgramProdiStudyProgramId: string;
	mbkmProgramProdiStudyProgramName: string;
	mbkmProgramProdiDepartmentId: string;
	mbkmProgramProdiDepartmentName: string;
}

export interface MbkmProgramProdiSelected extends MbkmProgramProdiCreateRequestTypes {}

export interface MbkmProgramProdiTypes {
	mbkmProgramProdiId: string;
	mbkmPrograms: {
		mbkmProgramCategory: string;
		mbkmProgramCreatedBy: string;
		mbkmProgramId: string;
		mbkmProgramName: string;
		mbkmProgramSyllabus: string;
	};
}
