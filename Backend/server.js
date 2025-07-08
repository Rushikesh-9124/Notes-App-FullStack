const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const config = require("./config.json");
const mongoose = require("mongoose");
mongoose.connect(config.connectionString);

const User = require("./models/user.model");
const Note = require("./models/note.model");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");

// --- ROUTES ---

app.get("/", (req, res) => {
  res.status(200).json({ success: true, msg: "API Working!" });
});

app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ success: false, msg: "All fields are required" });
  }

  const isUser = await User.findOne({ email });
  if (isUser) {
    return res.status(409).json({ success: false, msg: "User already exists" });
  }

  const user = new User({ fullName, email, password });
  await user.save();

  const accessToken = jwt.sign(
    { _id: user._id, fullName: user.fullName, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3600m" }
  );

  return res.status(201).json({
    success: true,
    user: { _id: user._id, fullName: user.fullName, email: user.email },
    accessToken,
    message: "Registration Successful",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, msg: "Email & password required!" });

  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, message: "Invalid credentials!" });
  }

  const accessToken = jwt.sign(
    { _id: user._id, fullName: user.fullName, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "3600m" }
  );

  return res.status(200).json({ success: true, email, accessToken, message: "Successfully logged in!" });
});

app.get('/get-user',authenticateToken, async(req,res)=>{
    const user = req.user
    const isUser = await User.findOne({_id:user._id})

    if(!isUser){
        return res.status(401).json({success:false, message: "User Not Found!"})
    }
    res.status(200).json({user: isUser, message:"User Found!"})
})

app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const user = req.user;

  if (!title) return res.status(400).json({ success: false, message: "Title is required!" });
  if (!content) return res.status(400).json({ success: false, message: "Content is required!" });

  try {
    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    res.status(201).json({ success: true, data: note, message: "Note added!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error adding note!" });
  }
});

app.put("/edit-note/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, isPinned } = req.body;
  const user = req.user;

  if (!title && !content && !tags && typeof isPinned !== "boolean") {
    return res.status(400).json({ success: false, message: "No changes provided!" });
  }

  try {
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found!" });

    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (typeof isPinned === "boolean") note.isPinned = isPinned;

    await note.save();
    res.status(200).json({ success: true, message: "Note updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating note!" });
  }
});

app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const user = req.user;

  try {
    const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
    if (!notes.length) {
      return res.status(404).json({ success: false, message: "No notes found!" });
    }
    res.status(200).json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch notes" });
  }
});

app.delete("/delete-note/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const result = await Note.deleteOne({ _id: id, userId: user._id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Note not found!" });
    }

    res.status(200).json({ success: true, message: "Note deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Delete failed!" });
  }
});

app.put("/update-note-pinned/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  const user = req.user;

  try {
    const note = await Note.findOne({ _id: id, userId: user._id });
    if (!note) return res.status(404).json({ success: false, message: "Note not found!" });

    note.isPinned = isPinned;
    await note.save();

    res.status(200).json({ success: true, message: "isPinned updated!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update isPinned!" });
  }
});

app.get('/search-notes', authenticateToken, async (req, res) => {
  const user = req.user;
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({
      success: false,
      message: "Search query is required!",
    });
  }

  try {
    const matchingNotes = await Note.find({
      userId: user._id,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },   
        { content: { $regex: new RegExp(query, "i") } },   
      ],
    });

    return res.status(200).json({
      success: true,
      notes: matchingNotes,
      message: "Successfully fetched!",
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
});


// Start Server
app.listen(8000, () => {
  console.log("Server is listening on http://localhost:8000");
});

module.exports = app;
