import { ROUTE } from "@/configs/route";
import { expect, test } from "@playwright/test";

test("홈페이지가 정상적으로 렌더링되어야 합니다.", async ({ page }) => {
  await page.goto(ROUTE.HOME);

  await expect(page.getByText("Home")).toBeVisible();
});
