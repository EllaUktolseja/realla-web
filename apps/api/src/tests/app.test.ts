import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../app.js";

describe("API foundation", () => {
  it("returns a live health response", async () => {
    const response = await request(app).get("/api/v1/health/live");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        status: "alive",
      },
    });
  });

  it("returns a consistent 404 response", async () => {
    const response = await request(app).get("/api/v1/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe("NOT_FOUND");
  });

  it("rejects invalid contact submissions", async () => {
    const response = await request(app)
      .post("/api/v1/contact")
      .send({ name: "A", email: "invalid", message: "short" });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe("VALIDATION_ERROR");
  });
});
