import express from "express";
import { Book } from "../models/bookmodel.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res.status(400).send({
        message: "Please ensure all fields are provided.",
      });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishedYear: req.body.publishedYear,
    };

    const book = await Book.create(newBook);
    return res.status(200).send(book);
  } catch (err) {
    console.log(err);
    res.status(500).send(`error ${err}`);
  }
});

router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.put(":/id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishedYear) {
      return res
        .status(404)
        .send("Title, Author Name and Published year is required!");
    }
    const id = req.params.id;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send("book not found");
    }
    return res.status(200).send("book updated");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

export default router;
