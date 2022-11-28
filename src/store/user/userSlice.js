import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    // =========== add user ============

    addUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
