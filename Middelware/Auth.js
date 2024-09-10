
var jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  console.log("Middleware called", req.headers,process.env.secretkey);
  const token =  req.headers.authorization.split(' ')[1] || req.body.token || req.query.token;
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.secretkey,);
    req.user = decoded;
    console.log("User ID:", req.user.id);
    next();
  } catch (err) {
    console.log("Error", err.message);
    return res.status(401).send("Invalid Token");
  }
};
module.exports = { verifyToken }