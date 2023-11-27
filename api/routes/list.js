const router = require("express").Router();
const verify = require("../util/verifyToken");
const List = require("../models/List");
const getRandomList = require("../util/random");

// ADD LIST
router.post("/addlist", verify, async (req, res) => {
  try {
    if (!req.decoded.isAdmin) {
      return res.status(401).send("user is not admin");
    }

    const list = new List(req.body);
    await list.save();

    res.status(201).json(list);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE
router.post("/delete/:id", verify, async (req, res) => {
  try {
    if (!req.decoded.isAdmin) {
      return res.status(401).send("user is not admin");
    }

    const list = await List.deleteOne({ _id: req.params.id });

    res.status(200).send("list deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get("/getlists", async (req, res) => {
  try {
    console.log("i am here 1");
    if (req.body.type) {
      if (req.body.genre) {
        // get lists of given type & genre

        const list = await List.find({
          type: req.body.type,
          genre: req.body.genre,
        });

        const ans = getRandomList(list, list.length);

        return res.status(201).json(ans);
      } else {
        // get random list of given type
        const list = await List.find({ type: req.body.type });

        const ans = getRandomList(list, list.length);

        return res.status(201).json(ans);
      }
    } else {
      // get random lists
      const list = await List.find();
      console.log(list.length);
      
      const ans = getRandomList(list, list.length);
      console.log("i should be here")
      console.log(ans)

      return res.status(201).json(ans);
    }
  } catch (err) {
    console.log("am i here")
    res.status(500).json(err);
  }
});

module.exports = router;
