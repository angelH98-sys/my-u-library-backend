const { createSlice, configureStore } = require("@reduxjs/toolkit");

const initialState = {
  isAuthenticated: false,
  name: null,
  uid: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authenticated: (state, action = {}) => {
      state.isAuthenticated = true;

      const { name = "", uid = "", email = "" } = action.payload;

      state.name = name;
      state.uid = uid;
      state.email = email;
    },
    notAuthenticated: (state) => {
      state.isAuthenticated = false;
      state.name = null;
      state.uid = null;
      state.email = null;
    },
  },
});

const userStore = configureStore({
  reducer: userSlice.reducer,
});

module.exports = {
  userStore,
  ...userSlice.actions,
};
