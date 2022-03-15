import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: undefined,
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUserLoginDetails: (state, action) => {
			state.email = action.payload.email;
			state.isAuth = action.payload.isAuth;
		},
		setSignOutState: (state) => {
			state.email = "";
			state.isAuth = null;
		},
	},
});

export const { setUserLoginDetails, setSignOutState } = userSlice.actions;
export const selectUserEmail = (state) => state.user.email;
export const selectIsAuth = (state) => state.user.isAuth;

export default userSlice.reducer;
