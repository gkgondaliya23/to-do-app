require("dotenv").config();
const express = require("express");
const app = express();
const DBUtils = require("./DBUtils/dbConnection");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
require('./helpers/passport');
const flash = require('connect-flash');

const port = process.env.PORT || 6060;
const dbUrl = process.env.MONGODB_URL;
const dbName = process.env.MONGO_DB_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(flash());
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/task.routes");

app.use('/auth', authRouter);
app.use('/task', taskRouter);


if (port && dbUrl && dbName) {
  app.listen(port, () => {
    if (dbUrl && dbName) {
      DBUtils.connectionDB(dbUrl, dbName)
        .then((dbResponse) => {
          console.log(dbResponse);
        })
        .catch((error) => {
          if (error) console.log(error);
          process.exit(0); // node process exits
        });
    }
    console.log(`Server is running on http://localhost:${port}`);
  });
}
