import express, { Application, Request, Response } from "express";
import {Upload}  from "@aws-sdk/lib-storage"
import { S3Client,  } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import busboy, { FileInfo } from "busboy";
import { Readable, Stream } from "stream";
import { createWriteStream } from "fs";

dotenv.config();

const app: Application = express();


const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  }
});



app.get("/", function(req: Request, res: Response){
  const obj: Record<string, string | number> = {}
  obj["name"] = "henshaw";
  obj["score"] = 580;
  obj["age"] = 40;

  res.status(200).json({data: obj});
});


app.post("/upload", (req: Request, res: Response) => {
  const bb = busboy({headers: req.headers});

  bb.on("file", async (name: string, stream, info: FileInfo) => {



     const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.AWS_BUCKET as string,
        Key: `${Date.now()}_${info.filename}`,
        Body: stream,
        ContentType: info.mimeType
      }
     });

     let response  = await upload.done();
     console.log(response)
    //  res.status(200).json({message: "success"})
     
  });

  bb.on("finish", () => {
     res.end("file uploaded")
  })


  req.pipe(bb);

  

});


app.listen(5555, () => {
  process.stdout.write("App is running on port 5555");
})

