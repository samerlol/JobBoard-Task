import { Router } from "express";
import {
    createCompany as createCompanyController,
} from "../controllers/company";

import createCompany from "../middleware/company";
const router = Router();

router.post("/", [createCompany], createCompanyController);

export default router;