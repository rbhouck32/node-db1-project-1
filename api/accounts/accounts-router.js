const express = require("express");

const Account = require("./accounts-model.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const accountData = await Account.get();
    res.status(200).json(accountData);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateAccountId, async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
  try {
    const updatedAccountBody = await Account.update(req.params.id, req.body);
    res.status(200).json(updatedAccountBody);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Account.remove(req.params.id);
    res.status(200).json({ message: "the account has been deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
