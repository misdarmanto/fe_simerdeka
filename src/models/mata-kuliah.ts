export interface MataKuliahTypes {
	mataKuliahId?: string;
	mataKuliahName?: string;
	mataKuliahStudyProgramId?: string;
	mataKuliahStudyProgramName?: string;
	mataKuliahDepartmentId?: string;
	mataKuliahDepartmentName?: string;
	mataKuliahSksTotal?: number;
}

export interface MataKuliahCreateRequestTypes {
	mataKuliahName: string;
	mataKuliahSksTotal: number;
}
