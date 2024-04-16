export function getUserDetails() {
    const userDetailsString = localStorage?.getItem('userDetails');
    if (userDetailsString) {
      return JSON?.parse(userDetailsString);
    } else {
      return null;
    }
  }

  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
export function removeToken() {
    localStorage?.removeItem('token');
    localStorage?.removeItem('userDetails')
  }


export const pageSizeOption = [
  { value: 10, label: "10 / page" },
  { value: 20, label: "20 / page" },
  { value: 30, label: "30 / page" },
  { value: 40, label: "40 / page" },
  { value: 50, label: "50 / page" },
];