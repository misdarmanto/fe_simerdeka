import { createContext, useContext, useReducer } from "react";
import { AppRoleTypes, UserTypes } from "../models/user";

export enum AppAction {
	APP_ROLE = "APP_ROLE",
	CURRENT_USER = "CURRENT_USER",
	IS_LOADING = "IS_LOADING",
}

type State = {
	appRole: AppRoleTypes | any;
	currentUser: UserTypes | any;
	isLoading: boolean | any;
};

type Action = { type: AppAction; payload?: State };
type Dispatch = (action: Action) => void;

type AppContextType = {
	state: State;
	dispatch: Dispatch;
};

export const AppContext = createContext<AppContextType | any>(undefined);

function appReducer(state: State, action: Action) {
	switch (action.type) {
		case AppAction.APP_ROLE: {
			return { ...state, appRole: action.payload?.appRole };
		}
		case AppAction.CURRENT_USER: {
			return { ...state, currentUser: action.payload?.currentUser };
		}
		case AppAction.IS_LOADING: {
			return { ...state, isLoading: action.payload?.isLoading };
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export function AppProvider({ children }: { children: React.ReactNode }) {
	const [state, dispatch] = useReducer(appReducer, {
		appRole: "student",
		currentUser: {
			userId: "",
			userName: "",
			userEmail: "",
			userRole: "",
			departmentId: "",
			studyProgramId: "",
		},
		isLoading: false,
	});

	const value = { state, dispatch };

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within a AppProvider");
	}
	return {
		...context,
		...context.state,
		setAppRole: (value: AppRoleTypes) => {
			return context.dispatch({
				type: AppAction.APP_ROLE,
				payload: {
					appRole: value,
				},
			});
		},
		setCurrentUser: (value: UserTypes) => {
			return context.dispatch({
				type: AppAction.CURRENT_USER,
				payload: {
					currentUser: value,
				},
			});
		},
		setIsLoading: (value: boolean) => {
			return context.dispatch({
				type: AppAction.IS_LOADING,
				payload: {
					isLoading: value,
				},
			});
		},
	};
}
