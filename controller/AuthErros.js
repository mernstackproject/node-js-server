const errorMessages = {
    emailError: "Email is required",
    nameError: "Name is required",
    passwordError: "Password is required",
    internalServerError: "Internal server error",
  };
  const successMessages = {
    registrationSuccess: "User registered successfully",
    loginSuccess: "Login successful",
  };
  
  const createErrorResponse = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({ message, status: false });
  };
  
  const createSuccessResponse = (res, data, message, statusCode = 200) => {
    return res.status(statusCode).json({ message, data, status: true });
  };
  
  module.exports = { errorMessages, successMessages, createErrorResponse, createSuccessResponse };
  