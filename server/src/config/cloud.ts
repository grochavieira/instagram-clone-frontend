import { Storage } from "@google-cloud/storage";
import path from "path";
const serviceKey = path.join(
  __dirname,
  "..",
  "..",
  "inspired-truth-290016-36640481f5a5.json"
);

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "inspired-truth-290016",
});

export default storage;
