import express from "express";

import { isAuthenticatedUser } from "../middleware/auth.js";
import { createTeacher, deleteTeacher, getParticularTeacher, updateTeacher ,getAllTeachers} from "../controllers/teacherController.js";
import singleUpload from "../middleware/multter.js";
const router = express.Router();

router.route("/createTeacher").post(singleUpload,createTeacher);
router.route("/getAllTeachers").get(getAllTeachers);
router.route("/updateTeacher/:id").put(singleUpload,updateTeacher);
router.route("/deleteTeacher/:id").delete(deleteTeacher);
router.route("/teacher/:id").get(getParticularTeacher)

// router.route("/signUp").post(createUser);

// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;
