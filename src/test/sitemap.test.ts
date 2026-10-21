import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("public sitemap discovery", () => {
  const sitemap = readFileSync("public/sitemap.xml", "utf8");
  const app = readFileSync("src/App.tsx", "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  it("includes every explicit public route exactly once", () => {
    const routes = [...app.matchAll(/<Route path="([^"]+)"/g)].map((match) => match[1]).filter((path) => path !== "*");
    expect(locations.sort()).toEqual(routes.map((path) => `https://resttech33.lovable.app${path}`).sort());
    expect(new Set(locations).size).toBe(locations.length);
  });

  it("includes turnkey kitchen outfitting", () => {
    expect(locations).toContain("https://resttech33.lovable.app/osnashchenie-pod-klyuch");
  });
});