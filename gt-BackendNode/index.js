const express = require("express");
require("./DB/config");
const Attraction = require("./DB/Attraction");
const RestPlace = require("./DB/RestPlace");
const User = require("./DB/User");
const TourOperator = require("./DB/TourOperator");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//////////////////////////////////////////authentication//////////////

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ message: "No user found" });
    }
  } else {
    res.send({ message: "enter the credential" });
  }
});

//***************************Get Places ************************/
app.get("/attraction", async (req, res) => {
  let attraction = await Attraction.find();

  if (attraction.length > 0) {
    res.send(attraction);
  } else {
    res.send({ message: "no result found" });
  }
});
//***************************Delete Place ************************/
app.delete("/attraction/delete/:_id", async (req, res) => {
  const data = await Attraction.findById(req.params._id);
  let result = await Attraction.deleteOne({ _id: req.params._id });

  res.send({ result: result, data: data });
});
//***************************Add Places************************/
app.post("/attraction/new", async (req, res) => {
  let attraction = new Attraction(req.body);
  let result = await attraction.save();
  res.send(result);
});
//***************************Edit places************************/
app.put("/attraction/update/:id", async (req, res) => {
  let result = await Attraction.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result.acknowledged) {
    res.send({ result: result, data: req.body });
  } else {
    res.send({ message: "cannot be updated something went wrong" });
  }
});

/////////////////////Search by id ///////////////////////////
app.get("/attraction/:_id", async (req, res) => {
  let result = await Attraction.findById({ _id: req.params._id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "no record found" });
  }
});

/////////////////////////Search///////////////////////////
app.get("/search/:key", async (req, res) => {
  let result = await Attraction.find({
    $or: [{ name: { $regex: req.params.key } }],
  });
  res.send(result);
});

//////////////////////////////Rest Places/////////////////////////

//***************************Get restplace************************/
app.get("/restplace", async (req, res) => {
  let restplace = await RestPlace.find();

  if (restplace.length > 0) {
    res.send(restplace);
  } else {
    res.send({ message: "no result found" });
  }
});
/***************************Delete restPlace ************************/
app.delete("/restplace/delete/:_id", async (req, res) => {
  const data = await RestPlace.findById(req.params._id);
  let result = await RestPlace.deleteOne({ _id: req.params._id });

  res.send({ result: result, data: data });
});
//***************************Add RestPlace************************/
app.post("/restplace/new", async (req, res) => {
  let restplace = new RestPlace(req.body);
  let result = await restplace.save();
  res.send(result);
});

//***************************Edit places************************/
app.put("/restplace/update/:id", async (req, res) => {
  let result = await RestPlace.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result.acknowledged) {
    res.send({ result: result, data: req.body });
  } else {
    res.send({ message: "cannot be updated something went wrong" });
  }
});

//////////////////////////////Tour Operator/////////////////////////

//***************************Get TourOperator************************/
app.get("/operator", async (req, res) => {
  let operator = await TourOperator.find();

  if (operator.length > 0) {
    res.send(operator);
  } else {
    res.send({ message: "no result found" });
  }
});
/***************************Delete restPlace ************************/
app.delete("/operator/delete/:_id", async (req, res) => {
  const data = await TourOperator.findById(req.params._id);
  let result = await TourOperator.deleteOne({ _id: req.params._id });

  res.send({ result: result, data: data });
});
//***************************Add RestPlace************************/
app.post("/operator/new", async (req, res) => {
  let operator = new TourOperator(req.body);
  let result = await operator.save();
  res.send(result);
});

//***************************Edit places************************/
app.put("/operator/update/:id", async (req, res) => {
  let result = await TourOperator.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  if (result.acknowledged) {
    res.send({ result: result, data: req.body });
  } else {
    res.send({ message: "cannot be updated something went wrong" });
  }
});

app.listen(4000);
