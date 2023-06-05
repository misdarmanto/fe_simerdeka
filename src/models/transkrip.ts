import { MataKuliahTypes } from "./mata-kuliah";

export interface TranskripTypes {
	transkripId?: string;
	transkripStudentId?: string;
	transkripMataKuliahId?: string;
	transkripStudyProgramId?: string;
	transkripDepartmentId?: string;
	transkripMataKuliahGrade?: string;
	mata_kuliah: MataKuliahTypes;
}

export interface TranskripCreateRequestTypes {
	transkripStudentId?: string;
	transkripMataKuliahId?: string;
	transkripMataKuliahGrade?: string;
}
