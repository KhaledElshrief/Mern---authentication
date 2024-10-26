const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/employee");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token);
  if(!token){
    return res.status(403).json({ message: "Unauthorized" });
  }else{
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      next();
    });
  }
};

app.get("/home", verifyUser, (req, res) => {
  return res.json("success")
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    EmployeeModel.create({ name: name, email: email, password: hash })
      .then((employees) => res.json(employees))
      .catch((err) => console.log(err.message));
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
        res.cookie("token", token); // 86400000 ms = 24 hours
        console.log(response)
        if (response) {
          res.json("success");
        } else{
          return res.json( "This password is not correct" );
        }
      });
    } else {
      res.json("No Record Found");
    }
  });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
