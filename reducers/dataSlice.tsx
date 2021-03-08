import { createSlice } from "@reduxjs/toolkit";

import { FormValues } from "../components/DataForm";

const generateFreshId = (state: Data[]) => {
  const ids = state.map((data: Data) => data.id);
  let count = 0;
  let id;

  do {
    if (count > 10) {
      throw new Error("Too many attempts to generate a random ID");
    }

    id = Math.random().toString(16).substr(2, 8);
    count += 1;
  } while (ids.includes(id));

  return id;
};

type Data = {
  id: string;
  formValues: FormValues;
  createdAt: Date;
  updatedAt: Date | undefined;
};

const dataSlice = createSlice({
  name: "data",
  initialState: new Array<Data>(),
  reducers: {
    addData: (state, action) => {
      return [
        ...state,
        {
          id: generateFreshId(state),
          formValues: action.payload,
          createdAt: Date.now(),
        },
      ] as Data[];
    },
  },
  extraReducers: {},
});

export const { addData } = dataSlice.actions;

export default dataSlice.reducer;
