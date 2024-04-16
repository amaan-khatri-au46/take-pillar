import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { 
  apiCreateEmployee, 
  apiDeleteEmployee, 
  apiEditEmployee, 
  apiGetEmployee, 
} from "src/services/employeeDetailService";

export const SLICE_NAME = "employeeDetail";

export const fetchEmployee = createAsyncThunk(
  `${SLICE_NAME}/fetchEmployee`,
  async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => {
    try {
      const response = await apiGetEmployee({ pageIndex, pageSize });
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createEmployee = createAsyncThunk(
  `${SLICE_NAME}/createEmployee`,
  async (data: any, { dispatch }) => {
    try {
      const response = await apiCreateEmployee(data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editEmployee = createAsyncThunk(
  `${SLICE_NAME}/editEmployee`,
  async ({ id, data }: { id: string; data: any }, { dispatch }) => {
    try {
      const response = await apiEditEmployee(id, data);
      return response?.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  `${SLICE_NAME}/deleteEmployee`,
  async (employeeId: string, { dispatch }) => {
    try {
      const response = await apiDeleteEmployee(employeeId);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export interface Employee {
  _id: string;
  firstName: string;
  lastName : string;
  location: string;
  email: string;
}

export interface EmployeeDetailState {
  loading : boolean
  employeeTableList : Employee[]
  pagination: {
    total: number ;
    pageIndex: number;
    pageSize: number;
 };
  openDrawer : boolean
  openDeleteDailog : boolean
  editRow : Employee[]
  deleteRow : Employee[]
}

const initialState: EmployeeDetailState = {
  loading : false,
  employeeTableList : [],
  pagination: {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
},
  openDrawer : false,
  openDeleteDailog : false,
  editRow : [],
  deleteRow : [],
};

const employeeListSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPageSize : (state,action) => {
      state.pagination.pageSize = action.payload
    },
   setPageIndex : (state, action) => {
      state.pagination.pageIndex = action.payload
   },
    setDrawer : (state , action ) => {
      state.openDrawer = action.payload
    },
    setOpenDeleteDailog : (state , action) => {
      state.openDeleteDailog = action.payload
    },
    setEditRow : (state, action) => {
        state.editRow = action.payload
    },
    setDeleteRow : (state, action) => {
        state.deleteRow = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployee.fulfilled, (state , action:any) => {
      state.loading = false ;
      state.employeeTableList = action.payload?.employees as Employee[];
      state.pagination.total = action?.payload?.totalEmployees
    });
    builder.addCase(fetchEmployee.rejected, (state) => {
      state.loading = false ;
    });
  }
});

export const {
  setLoading,
  setDrawer, 
  setEditRow ,
  setDeleteRow , 
  setOpenDeleteDailog, 
  setPageSize, 
  setPageIndex
} = employeeListSlice.actions;

export default employeeListSlice.reducer;
