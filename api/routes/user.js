// module that defines various routes related to user management in an Express.js application

const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../util/verifyToken");

// update
router.post("/update", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.decoded.id });

    console.log(user);

    if (!user) {
      return res.status(404).send("user not found");
    }

    if (req.body.username) {
      user.username = req.body.username;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.password) {
      user.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    if (req.body.profilePic) {
      user.profilePic = req.body.profilePic;
    }
    const userUpdated = await user.save();

    return res.status(200).json({
      username: userUpdated.username,
      id: userUpdated._id,
      isAdmin: userUpdated.isAdmin,
      profilePic: userUpdated.profilePic,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// get
router.get("/get", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.decoded.id });
    if (!user) {
      return res.status(404).send("user not found");
    }
    return res.status(200).json({
      username: user.username,
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all
router.get("/getall", verify, async (req, res) => {
  try {
    if (!req.decoded.isAdmin) {
      return res.status(401).send("user is not admin");
    }
    const users = await User.find().sort({ createdAt: -1 });

    return res.status(200).json({ users });
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete
// (consider adding additional checks and confirmation steps to prevent accidental or unauthorized account deletion.)
router.post("/delete", verify, async (req, res) => {
  try {
    const user = await User.deleteOne({ _id: req.decoded.id });
    console.log(user);
    return res.status(204).send("user deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get stats
router.get("/stats", async (req, res) => {
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/userStats", verify, async (req, res) => {
  console.log("here");
  if (!req.decoded.isAdmin) {
    res.status(500).send("user is admin");
  }
  const users = await User.find();
  const data = [
    {
      name: "Jan",
      "Active User": 0,
    },
    {
      name: "Feb",
      "Active User": 0,
    },
    {
      name: "Mar",
      "Active User": 0,
    },
    {
      name: "Apr",
      "Active User": 0,
    },
    {
      name: "May",
      "Active User": 0,
    },
    {
      name: "Jun",
      "Active User": 0,
    },
    {
      name: "Jul",
      "Active User": 0,
    },
    {
      name: "Agu",
      "Active User": 0,
    },
    {
      name: "Sep",
      "Active User": 0,
    },
    {
      name: "Oct",
      "Active User": 0,
    },
    {
      name: "Nov",
      "Active User": 0,
    },
    {
      name: "Dec",
      "Active User": 0,
    },
  ];

  let count = 0;

  users.map((user) => {
    data[user.createdAt.getMonth()]["Active User"]++;
  });

  return res.status(200).send({ data });
});
module.exports = router;
