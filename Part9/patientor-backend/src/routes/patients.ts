import express from "express";

import service from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  const data = service.getAllPatients();
  console.log(data);

  res.status(200).json(data);
});

export default router;
