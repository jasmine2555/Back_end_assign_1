import { calculatePortfolioPerformance } from "../src/portfolio/portfolioPerformance";

describe("calculatePortfolioPerformance", () => {
  test("should return excellent gain message at 30%+", () => {
    const result = calculatePortfolioPerformance(10000, 13000);
    expect(result.percentageChange).toBeCloseTo(30, 6);
    expect(result.performanceSummary).toContain("Excellent");
  });

  test("should return solid gain message at 10% to <30%", () => {
    const result = calculatePortfolioPerformance(10000, 12000);
    expect(result.percentageChange).toBeCloseTo(20, 6);
    expect(result.performanceSummary).toContain("Solid");
  });

  test("should return small gain message at 0% to <10%", () => {
    const result = calculatePortfolioPerformance(10000, 10500);
    expect(result.percentageChange).toBeCloseTo(5, 6);
    expect(result.performanceSummary).toContain("Small");
  });

  test("should return minor loss message at -10% to <0%", () => {
    const result = calculatePortfolioPerformance(10000, 9500);
    expect(result.percentageChange).toBeCloseTo(-5, 6);
    expect(result.performanceSummary).toContain("Minor");
  });

  test("should return significant loss message below -10%", () => {
    const result = calculatePortfolioPerformance(10000, 8000);
    expect(result.percentageChange).toBeCloseTo(-20, 6);
    expect(result.performanceSummary).toContain("Significant");
  });

  test("should throw error for invalid inputs", () => {
    expect(() => calculatePortfolioPerformance(0, 100)).toThrow();
    expect(() => calculatePortfolioPerformance(100, -1)).toThrow();
    expect(() => calculatePortfolioPerformance(NaN as any, 100)).toThrow();
  });
});
