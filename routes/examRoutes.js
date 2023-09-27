import express from "express";

import { isAuthenticatedUser } from "../middleware/auth.js";
import { createExam, deleteExam, getAllExams, getParticularExam, updateExam } from "../controllers/examController.js";
const router = express.Router();

router.route("/createTest").post(createExam);
router.route("/getAllTest").get(getAllExams);
router.route("/updateTest/:id").put(updateExam);
router.route("/deleteTest/:id").delete(deleteExam);
router.route("/Test/:id").get(getParticularExam)

// router.route("/createUser").post(createUser);
// router.route("/loginUser").post(loginUser);
// router.route("/logoutUser").get(logOut);
// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;
