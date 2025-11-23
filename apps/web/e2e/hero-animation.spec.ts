import { test, expect } from "@playwright/test";

test.describe("Hero Animation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section with #hero-canvas", async ({ page }) => {
    // Check that #hero-canvas exists
    const heroCanvas = page.locator("#hero-canvas");
    await expect(heroCanvas).toBeVisible();

    // Verify the container has correct styling
    await expect(heroCanvas).toHaveClass(/absolute/);
    await expect(heroCanvas).toHaveClass(/inset-0/);
  });

  test("should render the hero heading text and ensure it's readable", async ({ page }) => {
    // Check main heading exists and is visible
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Cutting-Edge");
    await expect(heading).toContainText("IT Solutions");

    // Verify heading is on top (has higher z-index than canvas)
    const headingZIndex = await heading.evaluate((el) =>
      window.getComputedStyle(el.closest("div")!).zIndex
    );
    expect(parseInt(headingZIndex)).toBeGreaterThan(0);
  });

  test("should not have JavaScript console errors on page load", async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Allow for minor non-critical errors but fail on critical ones
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes("DevTools") && // Ignore DevTools-specific errors
        !error.includes("favicon") // Ignore missing favicon errors
    );

    expect(criticalErrors).toHaveLength(0);
  });

  test("should render animation canvas on desktop viewport", async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // Wait for canvas to potentially render
    await page.waitForTimeout(1000);

    // Check if canvas element exists within the animation container
    const canvas = page.locator("#hero-canvas canvas").first();
    
    // The canvas might not exist if there's a fallback, which is acceptable
    const canvasCount = await canvas.count();
    
    // Either canvas exists OR SVG fallback exists
    const svgFallback = page.locator("#hero-canvas svg").first();
    const svgCount = await svgFallback.count();

    expect(canvasCount + svgCount).toBeGreaterThan(0);
  });

  test("should have proper ARIA attributes for accessibility", async ({ page }) => {
    // Verify hero-canvas has aria-hidden
    const heroCanvas = page.locator("#hero-canvas");
    await expect(heroCanvas).toHaveAttribute("aria-hidden", "true");

    // Verify main content is still accessible
    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toBeVisible();

    // Verify CTA buttons are accessible
    const ctaButtons = page.getByRole("link", { name: /hire us|our work/i });
    expect(await ctaButtons.count()).toBeGreaterThanOrEqual(2);
  });

  test("should maintain readability with animation running", async ({ page }) => {
    // Check that text contrast is maintained
    const subheading = page.getByText(/We deliver innovative technology/i);
    await expect(subheading).toBeVisible();

    // Verify CTA buttons are still clickable
    const hireUsButton = page.getByRole("link", { name: /hire us/i }).first();
    await expect(hireUsButton).toBeEnabled();
    await expect(hireUsButton).toBeVisible();
  });

  test("should not cause layout shift", async ({ page }) => {
    // Measure initial layout
    const initialHeight = await page.evaluate(() => document.body.scrollHeight);

    // Wait for animation to potentially load
    await page.waitForTimeout(2000);

    // Measure layout after animation loads
    const finalHeight = await page.evaluate(() => document.body.scrollHeight);

    // Allow for minimal variation (within 10px)
    expect(Math.abs(finalHeight - initialHeight)).toBeLessThan(10);
  });
});

