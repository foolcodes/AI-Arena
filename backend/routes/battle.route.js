import express from "express";
import {
  createBattle,
  dislikeBattle,
  fetchAllBattles,
  findBattle,
  likeBattle,
} from "../controllers/battle.controller.js";
import { startBattle } from "../controllers/startBattle.controller.js";

const router = express.Router();

router.post("/battle-chat", startBattle);
router.post("/battle", createBattle);
router.post("/like", likeBattle);
router.post("/dislike", dislikeBattle);
router.post("/battle/:battleId", findBattle);
router.get("/all-battles", fetchAllBattles);
router.get("/", (req, res) => {
  res.send("Working");
});

export default router;
