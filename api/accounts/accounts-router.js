const express = require("express");
const { restart } = require("nodemon");

const Account = require("./accounts-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  //   Account.get()
  //     .then((account) => {
  //       res.status(200).json(account);
  //     })
  //     .catch((error) => {
  //       res.status(400).json({ message: error });
  //     });
  try {
    const accountData = await Account.get();
    res.status(200).json(accountData);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const accountData = await Account.getById(req.params.id);
    res.status(200).json(accountData);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newAccount = await Account.add(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
