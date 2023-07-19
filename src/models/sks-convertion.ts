export interface SksConvertionTypes {
	// sksConvertionId?: string;
	// sksConvertionTotal?: number;
	// sksConvertionStudentId?: string;
	// sksConvertionMbkmProgramId?: string;
	sksConvertionId: string;
	sksConvertionName: string;
	sksConvertionCreatedBy: string;
	sksConvertionStudyProgramId: string;
	sksConvertionMbkmProgramId: string;
	createdOn: string;
}

export interface SksConvertionCreateTypes {
	sksConvertionTotal: number;
	sksConvertionStudentId: string;
	sksConvertionMbkmProgramId: string;
}
