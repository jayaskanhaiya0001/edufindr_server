import express from "express";

import { isAuthenticatedUser } from "../middleware/auth.js";

import { createFreeBees, deleteFreeBees, getAllFreeBees, getOneFreeBees, updateFreeBees } from "../controllers/freeBeesController.js";
import singleUpload from "../middleware/multter.js";
const router = express.Router();

router.route("/createFreebees").post(singleUpload, createFreeBees);
router.route("/getAllFreebees").get(getAllFreeBees);
router.route("/updateCFreebee/:id").put(singleUpload,updateFreeBees);
router.route("/deleteFreebee/:id").delete(deleteFreeBees);
router.route("/Freebee/:id").get(getOneFreeBees)

// router.route("/createUser").post(createUser);
// router.route("/loginUser").post(loginUser);
// router.route("/logoutUser").get(logOut);
// router.route("/changePassword").post(isAuthenticatedUser, changePassword);

export default router;
