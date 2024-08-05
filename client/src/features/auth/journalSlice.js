import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  generateAIContent,
  addJournal,
  getJournals,
  getJournal,
  deleteJournal,
} from "./api";

export const fetchAIContent = createAsyncThunk(
  "journals/fetchAIContent",
  async (prompt, { rejectWithValue }) => {
    try {
      const response = await generateAIContent(prompt);
      return response.data.aiContent;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createJournal = createAsyncThunk(
  "journals/createJournal",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addJournal(data);
      return response.data.journal;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchJournals = createAsyncThunk(
  "journals/fetchJournals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getJournals();
      return response.data.journals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchJournal = createAsyncThunk(
  "journals/fetchJournal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getJournal(id);
      return response.data.journal;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeJournal = createAsyncThunk(
  "journals/removeJournal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteJournal(id);
      return response.data.journal;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const journalSlice = createSlice({
  name: "journals",
  initialState: {
    journals: [],
    journal: null,
    loading: false,
    error: null,
    aiContent: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIContent.fulfilled, (state, action) => {
        state.loading = false;
        state.aiContent = action.payload;
      })
      .addCase(fetchAIContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journals.push(action.payload);
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchJournals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournals.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = action.payload;
      })
      .addCase(fetchJournals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journal = action.payload;
      })
      .addCase(fetchJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeJournal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeJournal.fulfilled, (state, action) => {
        state.loading = false;
        state.journals = state.journals.filter(
          (journal) => journal._id !== action.payload._id
        );
      })
      .addCase(removeJournal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default journalSlice.reducer;
