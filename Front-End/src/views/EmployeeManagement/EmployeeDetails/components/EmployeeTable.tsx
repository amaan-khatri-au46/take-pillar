import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/store/store";
import {
  fetchEmployee,
  setDeleteRow,
  setDrawer,
  setEditRow,
  setOpenDeleteDailog,
  setPageIndex,
  setPageSize,
} from "src/store/slices/employeeDetailSlice";
import { CiEdit, CiTrash } from "react-icons/ci";
import DataTable from "src/components/DataTable";
import { pageSizeOption } from "src/utils/commonFunction/common";
import Pagination from "src/components/Pagination";
import { MenuItem, Select } from "@mui/material";

const EmployeeTable = () => {
  const dispatch = useAppDispatch();
  const { employeeTableList, loading, pagination } = useAppSelector(
    (state) => state.employeeDetail
  );

  const data: any = employeeTableList?.map(
    (row, index) =>
      ({
        ...row,
        serialNumber: index + 1,
      } || [])
  );

  useEffect(() => {
    dispatch(
      fetchEmployee({
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      })
    );
  }, [dispatch, pagination]);

  const columns = useMemo(() => {
    return [
      {
        Header: "#",
        accessor: "serialNumber",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value}</div>
        ),
      },
      {
        Header: "Employee First Name",
        accessor: "firstName",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employee Last Name",
        accessor: "lastName",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employee Email",
        accessor: "email",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Employee Location",
        accessor: "location",
        Cell: ({ value }: any) => (
          <div style={{ textAlign: "center" }}>{value ? value : "-"}</div>
        ),
      },
      {
        Header: "Action",
        accessor: "actions",
        Cell: ({ row }: any) => (
          <div className="flex justify-center gap-4 w-full cursor-pointer">
            <div>
              <button
                onClick={() => {
                  dispatch(setDrawer(true));
                  dispatch(setEditRow(row.original));
                }}
              >
                <CiEdit style={{ fontSize: "16px" }} />
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch(setDeleteRow(row.original));
                  dispatch(setOpenDeleteDailog(true));
                }}
              >
                <CiTrash style={{ fontSize: "16px" }} />
              </button>
            </div>
          </div>
        ),
      },
    ];
  }, [dispatch]);

  return (
    <div>
      <DataTable columns={columns} data={data} loading={loading} />
      <div className="fixed bottom-2 w-full flex justify-between">
        {pagination?.total > 0 && (
          <div
            className="fixed p-2 bg-white mb-0 h-12 
            flex bottom-0 justify-between w-full items-center "
            style={{ boxShadow: "0px -5px 5px -5px #f0f0f0" }}
          >
            <Pagination
              currentPage={pagination.pageIndex}
              total={pagination?.total}
              pageSize={pagination?.pageSize}
              onChange={(pageNumber) => {
                dispatch(setPageIndex(pageNumber));
              }}
            />
            <div className="text-sm ">1-{pagination?.total} Items</div>
            <Select
              value={pagination.pageSize}
              size="small"
              className="mr-2"
              onChange={(e) => {
                dispatch(setPageIndex(1));
                dispatch(setPageSize(e.target.value));
              }}
            >
              {pageSizeOption.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
