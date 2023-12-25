const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("connect-flash");

exports.showLogin = (req, res) => {
  res.render("login", { message: req.flash("error") });
};

exports.login = passport.authenticate("local", {
  successRedirect: "/task/",
  failureRedirect: "/auth/login",
  successFlash: true,
  failureFlash: true,
  successFlash: "Login Succesful!",
  failureFlash: "Invalid email or password.",
});

exports.showRegister = (req, res) => {
  res.render("register");
};

exports.registerUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email, isDelete: false });
  if (user) {
    req.flash("sucess", "User already Register, Login Now");
    return res.redirect("/auth/login");
  }

  let hashPassword = await bcrypt.hash(req.body.password, 10);
  user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  user.save();
  passport.authenticate("local")(req, res, () => {
    req.flash("success", "Registration successful. Welcome!");
    res.redirect("/auth/login");
  });
};

exports.logout = (req, res) => {
  // req.logout();
  req.flash('success', 'Logout successful.');
  res.redirect("/auth/login");
};
