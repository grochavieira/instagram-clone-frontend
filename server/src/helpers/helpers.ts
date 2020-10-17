import util, { format } from "util";
import gc from "../config/cloud";
import crypto from "crypto";
const bucket = gc.bucket("instagram_server_images");

const uploadImage = (file: any) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;

    const hash = crypto.randomBytes(16).toString("hex");
    const key = `${hash}-${originalname}`;

    const blob = bucket.file(key);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });

export default uploadImage;
