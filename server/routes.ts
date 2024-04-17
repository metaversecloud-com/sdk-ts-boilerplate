import express from "express";
import {
  handleDropAsset,
  handleGetDroppedAsset,
  handleGetVisitor,
  handleRemoveDroppedAssetsByUniqueName,
  handleGetWorldDetails,
  handleUpdateWorldDataObject,
} from "./controllers/index.js";
import { getVersion } from "./utils/getVersion.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get("/system/health", (req, res) => {
  return res.json({
    appVersion: getVersion(),
    status: "OK",
    envs: {
      NODE_ENV: process.env.NODE_ENV,
      INSTANCE_DOMAIN: process.env.INSTANCE_DOMAIN,
      INTERACTIVE_KEY: process.env.INTERACTIVE_KEY,
      S3_BUCKET: process.env.S3_BUCKET,
    },
  });
});

// Dropped Assets
router.post("/dropped-asset", handleDropAsset);
router.get("/dropped-asset", handleGetDroppedAsset);
router.post("/remove-dropped-assets", handleRemoveDroppedAssetsByUniqueName);

// Visitor
router.get("/visitor", handleGetVisitor);

// World
router.get("/world", handleGetWorldDetails);
router.put("/world/data-object", handleUpdateWorldDataObject);

export default router;
