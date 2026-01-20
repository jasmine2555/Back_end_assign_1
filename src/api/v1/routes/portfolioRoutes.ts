import { Router, Request, Response } from "express";
import { calculatePortfolioPerformance } from "../../../portfolio/portfolioPerformance";

const router = Router();

/**
 * GET /api/v1/portfolio/performance?initialInvestment=10000&currentValue=14000
 */
router.get("/performance", (req: Request, res: Response) => {
  const initialInvestmentRaw = req.query.initialInvestment;
  const currentValueRaw = req.query.currentValue;

  const initialInvestment = Number(initialInvestmentRaw);
  const currentValue = Number(currentValueRaw);

  // Validate query params existence + numeric
  if (
    initialInvestmentRaw === undefined ||
    currentValueRaw === undefined ||
    !Number.isFinite(initialInvestment) ||
    !Number.isFinite(currentValue)
  ) {
    return res.status(400).json({
      error: "Bad Request",
      message:
        "Query params required: initialInvestment (> 0) and currentValue (>= 0). Example: /api/v1/portfolio/performance?initialInvestment=10000&currentValue=10999.9",
    });
  }

  try {
    const result = calculatePortfolioPerformance(initialInvestment, currentValue);
    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(400).json({
      error: "Bad Request",
      message: err?.message ?? "Invalid input.",
    });
  }
});

export default router;
