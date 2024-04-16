/** @format */

import ApiService from "./ApiService";


export async function apiGetEmployee<T>({pageIndex, pageSize,}: 
  { pageIndex: number; pageSize: number;  }) {
  return ApiService.fetchData<T>({
      url: `/employees`,
      method: "get",
      params: { pageIndex, pageSize },
  });
}


export async function apiCreateEmployee<T>(data:any) {
  return ApiService.fetchData<T>({
    url: "/employees",
    method: "post",
    data: data,
  });
}

export async function apiEditEmployee<T>(id: string, data: any) {
  return ApiService.fetchData<T>({
    url: `/employees/${id}`,
    method: "put",
    data: data,
  });
}

export async function apiDeleteEmployee(employeeId: string) {
  return ApiService.fetchData<{ success: boolean }>({
    url: `/employees/${employeeId}`,
    method: "delete",
  });
}



