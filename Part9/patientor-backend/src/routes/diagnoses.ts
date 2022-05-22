import express from "express";

import service from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllData();
  console.log(data);

  res.status(200).json(data);
});

export default router;
