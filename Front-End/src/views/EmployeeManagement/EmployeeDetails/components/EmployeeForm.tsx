import { Button, Drawer, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/store/store";
import {
  createEmployee,
  editEmployee,
  fetchEmployee,
  setDrawer,
} from "src/store/slices/employeeDetailSlice";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import useToastify from "src/utils/hooks/useToastify";
import { getUserDetails } from "src/utils/commonFunction/common";

const EmployeeForm = () => {
  const { openDrawer, editRow, loading, pagination }: any = useAppSelector(
    (state) => state.employeeDetail
  );

  const dispatch = useAppDispatch();
  const showToast = useToastify();

  const onDialogClose = () => {
    dispatch(setDrawer(false));
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Firt Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is required"),
    location: Yup.string().required("Location is required"),
  });

  console.log(editRow, "Please Check It");

  return (
    <Drawer open={openDrawer} onClose={onDialogClose} anchor="right">
      <div className="p-2">
        <h2 className="font-semibold text-2xl">
          {editRow._id ? "EDIT EMPLOYEE" : "ADD EMPLOYEE"}
        </h2>
      </div>
      <div style={{ height: "1px" }} className="bg-gray-400 mt-1 w-full"></div>
      <Formik
        initialValues={{
          firstName: editRow ? editRow?.firstName : "",
          lastName: editRow ? editRow?.lastName : "",
          email: editRow ? editRow?.email : "",
          location: editRow ? editRow?.location : "",
          createdBy: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          values.createdBy = getUserDetails()?.payload?.id;
          const res = editRow._id
            ? await dispatch(editEmployee({ id: editRow?._id, data: values }))
            : await dispatch(createEmployee(values));
          await dispatch(
            fetchEmployee({
              pageIndex: pagination?.pageIndex,
              pageSize: pagination?.pageSize,
            })
          );
          if (res.meta.requestStatus === "fulfilled") {
            showToast(
              editRow._id
                ? "Employee Edited  successfully"
                : "Employee Added successfully",
              "success"
            );
          } else {
            showToast("Please Enter unique Email", "error");
          }
          await dispatch(setDrawer(false));
        }}
      >
        {({ values, errors, touched, dirty }) => (
          <Form className="w-96">
            <div className="px-8 py-1">
              <div className="mt-5 h-16">
                <label
                  htmlFor="firstName"
                  className={`block font-semibold text-sm ${
                    errors.firstName && touched.firstName ? "text-red-500" : ""
                  }`}
                >
                  First Name *
                </label>
                <Field
                  as={TextField}
                  name="firstName"
                  fullWidth
                  size="small"
                  placeholder="First Name"
                  error={!!errors.firstName && !!touched.firstName}
                  helperText={
                    errors.firstName && touched.firstName && errors.firstName
                  }
                />
              </div>
              <div className="mt-5 h-16">
                <label
                  htmlFor="lastName"
                  className={`block font-semibold text-sm ${
                    errors.lastName && touched.lastName ? "text-red-500" : ""
                  }`}
                >
                  Last Name *
                </label>
                <Field
                  as={TextField}
                  name="lastName"
                  fullWidth
                  size="small"
                  placeholder="Last Name"
                  error={!!errors.lastName && !!touched.lastName}
                  helperText={
                    errors.lastName && touched.lastName && errors.lastName
                  }
                />
              </div>
              <div className="mt-5 h-16">
                <label
                  htmlFor="email"
                  className={`block font-semibold text-sm ${
                    errors.email && touched.email ? "text-red-500" : ""
                  }`}
                >
                  Email*
                </label>
                <Field
                  as={TextField}
                  name="email"
                  fullWidth
                  size="small"
                  placeholder="email"
                  error={!!errors.email && !!touched.email}
                  helperText={errors.email && touched.email && errors.email}
                />
              </div>
              <div className="mt-5 h-20">
                <label
                  htmlFor="location"
                  className={`block font-semibold text-sm ${
                    errors.location && touched.location ? "text-red-500" : ""
                  }`}
                >
                  Location*
                </label>
                <Field
                  as={TextField}
                  name="location"
                  fullWidth
                  size="small"
                  placeholder="location"
                  error={!!errors.location && !!touched.location}
                  helperText={
                    errors.location && touched.location && errors.location
                  }
                />
              </div>
              <div className="w-full flex gap-2 justify-end mt-6">
                <Button
                  variant="outlined"
                  type="button"
                  onClick={() => dispatch(setDrawer(false))}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={loading || !dirty}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default EmployeeForm;
