// routes/teams.js
const express = require("express");
const router = express.Router();
const Team = require("../models/team");

// GET all teams with players included
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET team by ID with players included
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new team
router.post("/", async (req, res) => {
  const { name, country, coach, players } = req.body;
  try {
    const newTeam = new Team({ name, country, coach, players });
    const savedTeam = await newTeam.save();
    // Populate players before sending the response
    await savedTeam.populate("players").execPopulate();
    res.status(201).json(savedTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update a team
router.put("/:id", async (req, res) => {
  const { name, country, coach, players } = req.body;
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, country, coach, players },
      { new: true }
    ).populate("players");
    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json(updatedTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE a team
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.json({ message: "Team deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
