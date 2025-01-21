require("dotenv").config();
const request = require("supertest");
const app = require("./../app");
const {
  connectDatabase,
  disconnectDatabase,
} = require("./../database/database");

describe("Launc API", () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await disconnectDatabase();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launch", () => {
    test("It should respond with 201 created", async () => {
      const launch = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-296 A f",
        launchDate: "January 4, 2028",
      };

      const launchDataWithoutDate = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-296 A f",
      };

      const response = await request(app)
        .post("/launches")
        .send(launch)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(launch.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();

      expect(responseDate).toBe(requestDate);
      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should respond with 400 bad request for missing properties", async () => {
      const launch = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
      };

      const response = await request(app)
        .post("/launches")
        .send(launch)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid date", async () => {
      const launchDataWithInvalidDate = {
        mission: "USS Enterprise",
        rocket: "NCC-1701-D",
        target: "Kepler-186 f",
        launchDate: "not a date",
      };

      const response = await request(app)
        .post("/launches")
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
