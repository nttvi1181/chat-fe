import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../store";
const initialState: {
  relations: Array<any>;
} = {
  relations: [],
};

export const relationsSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setRelations: (state, { payload }) => {
      state.relations = payload;
    },
  },
});

export const relations = (state: AppState) => state.relation.relations;
export const { setRelations } = relationsSlice.actions;

export default relationsSlice.reducer;
