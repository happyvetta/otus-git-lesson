import { test, expect } from "@playwright/test";

const baseUrl = "https://demowebshop.tricentis.com";
test('Check "Books" nav link', async ({ page }) => {
  await page.goto(baseUrl);
  const topMenu = page.locator(".top-menu");
  await topMenu.getByRole("link", { name: "Books" }).first().click();
  await page.waitForURL("**/books");
  await expect(page).toHaveTitle("Demo Web Shop. Books");
});

test("Change page size selector value", async ({ page }) => {
  await page.goto(`${baseUrl}/books`);
  await expect(page.locator("[id=products-pagesize]")).toBeVisible();
  const itemsCount = await page.locator(".product-item").count();
  const expectedCount = await page
    .locator("[id=products-pagesize]")
    .getByRole("option", { selected: true })
    .textContent();
  expect(itemsCount).toBeLessThan(parseInt(expectedCount));
  await page.locator("[id=products-pagesize]").selectOption("4");
  await expect(page.locator(".product-item")).toHaveCount(4);
});

test("Check view change", async ({ page }) => {
  await page.goto(`${baseUrl}/books`);
  await expect(page.locator(".product-grid")).toBeVisible();
  await page.locator("[id=products-viewmode]").selectOption("List");
  await page.waitForURL("**/books?viewmode=list");
  await expect(page.locator(".product-list")).toBeVisible();
});

test("Check filter by price", async ({ page }) => {
  await page.goto(`${baseUrl}/books`);
  await page.locator(".price-range-selector li a").first().click();
  await page.waitForURL("**/books?price=-25");
  const priceElements = await page
    .locator('[class="price actual-price"]')
    .all();
  for (let index = 0; index < priceElements.length; index++) {
    const element = priceElements[index];
    expect(parseInt(await element.textContent())).toBeLessThan(25);
  }
});

test("Remove filter", async ({ page }) => {
  await page.goto(`${baseUrl}/books?price=-25`);
  await expect(page.locator(".product-item")).toHaveCount(5);
  await page.locator(".remove-price-range-filter").click();
  await page.waitForURL("**/books");
  await expect(page.locator(".product-item")).toHaveCount(6);
});
