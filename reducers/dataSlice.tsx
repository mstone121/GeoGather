import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export type Data = {
  id: string;
  formValues: FormValues;
  createdAt: number;
  updatedAt: number | undefined;
};

const dataSlice = createSlice({
  name: "data",
  initialState: [] as Data[],
  reducers: {
    addData: (state, action: PayloadAction<FormValues>) =>
      [
        ...state,
        {
          id: generateFreshId(state),
          formValues: action.payload,
          createdAt: Date.now(),
        },
      ] as Data[],
    updateData: (
      state,
      action: PayloadAction<{ id: string; formValues: FormValues }>
    ) =>
      state.map((data: Data) =>
        data.id === action.payload.id
          ? {
              ...data,
              formValues: action.payload.formValues,
              updatedAt: Date.now(),
            }
          : data
      ) as Data[],
    removeData: (state, action: PayloadAction<string>) =>
      state.filter((data: Data) => data.id !== action.payload),
  },
  extraReducers: {},
});

export const { addData, updateData, removeData } = dataSlice.actions;

export default dataSlice.reducer;
