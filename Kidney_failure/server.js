const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");

const app = express();
let user = {};
let users = [{ name: "Admin" }];
let login = false;

app.use(bodyParser.json());

function checkLogin(req, res, next) {
  if (!login) {
    return res.status(401).json({ error: "User not logged in" });
  }
  next();
}

app.post("/api/user", (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      throw new Error("");
    }
    const foundUser = users.find((u) => u.name === username);

    if (foundUser) {
      login = true;
      user = foundUser;
      console.log("found");

      res.json({ user });
    } else {
      user = {
        name: username,
        healthyKidney: 0,
        unhealthyKidney: 0,
      };
      users.push(user);
      login = true;
      res.json({
        user,
      });
    }
    //    //console.log(users);
    //console.log(login);
  } catch (error) {
    res.status(404).json({ error: "error" });
  }

  res.json({
    Userslist: users,
  });
});

app.post("/api/kidney", checkLogin, (req, res) => {
  const h = req.query.h;

  if (!h) {
    throw new error(404);
  }

  const currentuser = users.find((u) => u.name === user.name);

  if (!currentuser) {
    return res.status(404).json({ error: "User not found" });
  }

  if (h === "healthy") {
    // //console.log(currentuser);
    currentuser.healthyKidney += 1;
    // currentuser.healthyKidney= currentuser.unhealthyKidney + 1;
  } else if (h === "unhealthy") {
    ////console.log(currentuser);
    currentuser.unhealthyKidney += 1;
    //currentuser.unhealthyKidney = currentuser.unhealthyKidney + 1;
  } else {
    throw new error(404);
  }
  return res.json({ currentuser });
});

app.put("/api/recover", checkLogin, (req, res) => {
  const currentUser = users.find((u) => u.name === user.name);

  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }
  const un = currentUser.unhealthyKidney;
  currentUser.healthyKidney += un;
  currentUser.unhealthyKidney = 0;
  return res.json({ currentUser });
});

app.get("/api/user", (req, res) => {
  const currentUser = users.find((u) => u.name === user.name);
  return res.json({ currentUser });
});

const currentUser = users.find((u) => u.name === user.name);

app.delete("/api/delete", (req, res) => {
  const currentUser = users.find((u) => u.name === user.name);

  users.splice(currentUser, 1);
  login = false;
  return res.json({ status: "logout" });
});

app.get("/api/userlist", (req, res) => {
  const currentUser = users.find((u) => u.name === user.name);
  const message = "true";
  console.log(currentUser);
  console.log(users[0].name);

  if (currentUser.name === users[0].name) {
    return res.json({
      users,
    });
  } else {
    return res.json({
      message,
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/indix.html");
});

app.listen(3005, () => {
  //console.log("server is running");
});
