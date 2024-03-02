import express, { Application, Request, Response } from "express";

const app: Application = express();


app.get("/", function(req: Request, res: Response){
  const obj: Record<string, string | number> = {}
  obj["name"] = "henshaw";
  obj["score"] = 580;
  obj["age"] = 40;

  res.status(200).json({data: obj});
});


app.listen(5555, () => {
  process.stdout.write("App is running on port 5555");
})

