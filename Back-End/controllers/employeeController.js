const Employee = require("../models/employeeModel");

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, location } = req.body;
    const employee = new Employee({ firstName, lastName, email, location });
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.error("Error creating employee:", error);
      res.status(500).json({ error: "Failed to create employee" });
    }
  }
};

const getAllEmployees = async (req, res) => {
  const page = parseInt(req.query.pageIndex) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;
  try {
    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find().skip(skip).limit(pageSize);
    res.json({
      employees,
      currentPage: page,
      totalPages: Math.ceil(totalEmployees / pageSize),
      totalEmployees,
    });
  } catch (error) {
    console.error("Error getting all employees:", error);
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
