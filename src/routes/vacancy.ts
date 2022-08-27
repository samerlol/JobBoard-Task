import { Router } from "express";
import {
    createVacancy,
    closeVacancy,
    getAllVacancies,
    searchVacany,
    applyOnVacany
} from "../controllers/vacancy";
import { createVacancy as createVacancyMiddleware, searchVacancy, applyOnVacany as applyOnVacanyMiddleware } from "../middleware";

const router = Router();
router.get("/", getAllVacancies);
router.get("/search", [searchVacancy], searchVacany);

router.post("/", [createVacancyMiddleware], createVacancy);
router.post("/:id/apply", [applyOnVacanyMiddleware], applyOnVacany);

//search
//close vacancy
router.put("/:id", closeVacancy);

// router.delete("/:id", deleteVacancy);


export default router;