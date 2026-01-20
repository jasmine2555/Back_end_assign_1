import { Router } from "express";
import healthRoutes from "./healthRoutes";
import portfolioRoutes from "./portfolioRoutes";

const router = Router();

router.use("/health", healthRoutes);
router.use("/portfolio", portfolioRoutes);

export default router;
