import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { createClient } from '@supabase/supabase-js'
const { REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL } = process.env
const supabase = createClient(REACT_APP_SUPABASE_URL, REACT_APP_SUPABASE_KEY)

const initialState = {
  scheduleList: [],
  scheduleListStatus: 'idle',
  scheduleListError: null,
  scheduleById: [],
  scheduleByIdStatus: 'idle',
  scheduleByIdError: null,
  createSchedule: [],
  createScheduleStatus: 'idle',
  createScheduleError: null,
  scheduleDelete: [],
  scheduleDeleteStatus: 'idle',
  scheduleDeleteError: null,
  scheduleUpdate: [],
  scheduleUpdateStatus: 'idle',
  scheduleUpdateError: null,
}

export const fetchSchedule = createAsyncThunk(
  'schedules/fetchSchedule',
  async () => {
    const response = await supabase
      .from('schedules')
      .select(
        `id,name,url,exam_date,packages:package_id(name),organizations:organization_id(name)`,
      )
    return response
  },
)

export const fetchScheduleById = createAsyncThunk(
  'schedules/fetchScheduleById',
  async (id) => {
    const response = await supabase.from('schedules').select('*').eq('id', id)
    return response
  },
)

export const createNewSchedule = createAsyncThunk(
  'schedules/createNewSchedule',
  async (data) => {
    const response = await supabase.from('schedules').insert([data])
    return response
  },
)

export const deleteSchedule = createAsyncThunk(
  'schedules/deleteSchedule',
  async (id) => {
    await supabase.from('schedules').delete().match({ id: id })
    return id
  },
)

export const updateSchedule = createAsyncThunk(
  'schedules/updateSchedule',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('schedules')
      .update({
        address: updatedData.address,
        email: updatedData.email,
        name: updatedData.name,
        phone: updatedData.phone,
        pic_name: updatedData.pic_name,
      })
      .eq('id', updatedData.id)
    // if (error) return error
    return data
  },
)

const schedulesSlice = createSlice({
  name: 'schedules',
  initialState,
  reducers: {
    clearScheduleByIdData: (state) => {
      state.scheduleById = []
    },
    clearScheduleByIdStatus: (state) => {
      state.scheduleByIdStatus = 'idle'
    },
    clearScheduleDeleteStatus: (state) => {
      state.scheduleDeleteStatus = 'idle'
    },
    clearCreateScheduleStatus: (state) => {
      state.createScheduleStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchSchedule.pending]: (state) => {
      state.scheduleListStatus = 'loading'
    },
    [fetchSchedule.fulfilled]: (state, action) => {
      state.scheduleListStatus = 'succeeded'
      state.scheduleList = state.scheduleList.concat(action.payload.data)
    },
    [fetchSchedule.rejected]: (state, action) => {
      state.scheduleListStatus = 'failed'
      state.scheduleListError = action.error.message
    },
    [fetchScheduleById.pending]: (state) => {
      state.scheduleByIdStatus = 'loading'
    },
    [fetchScheduleById.fulfilled]: (state, action) => {
      state.scheduleByIdStatus = 'succeeded'
      state.scheduleById = action.payload.data[0]
    },
    [fetchScheduleById.rejected]: (state, action) => {
      state.scheduleByIdStatus = 'failed'
      state.scheduleByIdError = action.error.message
    },
    [createNewSchedule.pending]: (state) => {
      state.createScheduleStatus = 'loading'
    },
    [createNewSchedule.fulfilled]: (state, action) => {
      state.createScheduleStatus = 'succeeded'
      state.scheduleList = state.scheduleList.concat(action.payload.data[0])
    },
    [createNewSchedule.rejected]: (state, action) => {
      state.createScheduleStatus = 'failed'
      state.createScheduleError = action.error.message
    },
    [deleteSchedule.pending]: (state) => {
      state.scheduleDeleteStatus = 'loading'
    },
    [deleteSchedule.fulfilled]: (state, action) => {
      state.scheduleDeleteStatus = 'succeeded'
      state.scheduleDelete = action.payload.data
      const array = current(state.scheduleList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.scheduleList = temp
    },
    [deleteSchedule.rejected]: (state, action) => {
      state.scheduleDeleteStatus = 'failed'
      state.scheduleDeleteError = action.error.message
    },
    [updateSchedule.pending]: (state) => {
      state.scheduleUpdateStatus = 'loading'
    },
    [updateSchedule.fulfilled]: (state, action) => {
      state.scheduleUpdateStatus = 'succeeded'
      state.scheduleUpdate = action.payload.data
    },
    [updateSchedule.rejected]: (state, action) => {
      state.scheduleUpdateStatus = 'failed'
      state.scheduleUpdateError = action.error.message
    },
  },
})

export const {
  clearScheduleByIdData,
  clearScheduleByIdStatus,
  clearScheduleDeleteStatus,
  clearCreateScheduleStatus,
} = schedulesSlice.actions

export default schedulesSlice.reducer
