import { Battle } from "../models/battle.model.js";

export const createBattle = async (req, res) => {
  const { topic, model1, model2, judge, rounds, messages } = req.body;
  try {
    if (!topic || !model1 || !model2 || !judge || !rounds || !messages) {
      res
        .status(400)
        .json({ success: false, message: "All the data is required" });
    }
    const battle = new Battle({
      topic,
      model1,
      model2,
      judge,
      rounds,
      messages,
    });
    await battle.save();
    res.status(200).json({
      success: true,
      message: "Battle created successfully",
      battle: battle,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error creating battle" });
  }
};

export const findBattle = async (req, res) => {
  const { battleId } = req.params;
  try {
    const isBattleExists = await Battle.findById(battleId);
    if (!isBattleExists) {
      res.status(400).json({
        success: false,
        message: "No battle with the battle id provided exists!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Battle found",
      battleData: isBattleExists,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error while finding the battle" });
  }
};

export const likeBattle = async (req, res) => {
  const battleId = req.body.battleId;

  try {
    if (!battleId) {
      return res.status(400).json({ message: "Battle ID is required." });
    }

    const battle = await Battle.findById(battleId);

    if (!battle) {
      return res.status(404).json({ message: "Battle not found." });
    }

    battle.upVote = (battle.upVote || 0) + 1;
    await battle.save();

    res
      .status(200)
      .json({ message: "Battle liked successfully!", likes: battle.upVote });
  } catch (error) {
    console.error("Error liking battle:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const dislikeBattle = async (req, res) => {
  const battleId = req.body.battleId;

  try {
    if (!battleId) {
      return res.status(400).json({ message: "Battle ID is required." });
    }

    const battle = await Battle.findById(battleId);

    if (!battle) {
      return res.status(404).json({ message: "Battle not found." });
    }

    battle.downVote = (battle.downVote || 0) + 1;
    await battle.save();

    res.status(200).json({
      message: "Battle disliked successfully!",
      likes: battle.downVote,
    });
  } catch (error) {
    console.error("Error disliking battle:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const fetchAllBattles = async (req, res) => {
  try {
    const battles = await Battle.find();
    res.status(200).json({
      success: true,
      message: "Battles fetched successfully",
      battles,
    });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error fetching battles", error });
  }
};
