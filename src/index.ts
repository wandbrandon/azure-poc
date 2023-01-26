import express, { Express, Request, Response } from "express";
import { JourneyPin, JourneyPinAsync } from "./JourneyPin.library";

const app: Express = express();
const port = 3000;

class JourneyPinTester {
  private variable: number;
  static second_variable: number = 50;

  constructor() {
    this.variable = 40;
  }

  @JourneyPin("TEST01", "This is a test JPIN", 0, "Data Interface")
  public static methodTest(variable1: number, variable2: number) {
    return variable1 + variable2 + this.second_variable;
  }

  @JourneyPinAsync("TEST02", "This is a test JPIN", 1, "Data Interface")
  public static async methodTest2(variable1: number, variable2: number) {
    await new Promise((f) => setTimeout(f, 2000));
    return variable1 + variable2 + this.second_variable;
  }

  @JourneyPin("TEST03", "This is a test JPIN", 2, "Data Interface")
  public static methodTest3(variable1: number, ucid: string) {
    if (variable1 === 10) {
      throw new Error("Whoops");
    }
    return variable1;
  }

  @JourneyPinAsync("TEST04", "This is a test JPIN", 3, "Data Interface")
  public static async methodTest4(variable1: number, ucid: string) {
    if (variable1 === 10) {
      await new Promise((f) => setTimeout(f, 1500));
      throw new Error("Whoops Async");
    }
    await new Promise((f) => setTimeout(f, 1500));
    return variable1;
  }
}

app.get("/newcheck", async (req: Request, res: Response) => {
  console.log("GET /newcheck");

  const value1 = JourneyPinTester.methodTest(23, 37);
  const value2 = await JourneyPinTester.methodTest2(23, 27);
  let value3 = 0;
  try {
    value3 = JourneyPinTester.methodTest3(10, "U12091029831938");
  } catch (e: any) {
    console.log("error:", e.message);
  }
  let value4 = 0;
  try {
    value4 = await JourneyPinTester.methodTest4(10, "U12091029831938");
  } catch (e: any) {
    console.log("error:", e.message);
  }

  return res.json({
    value1,
    value2,
    value3,
    value4,
  });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
