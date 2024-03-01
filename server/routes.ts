import express from "express";
import {
  handleDropAsset,
  handleGetDroppedAssetsWithUniqueName,
  handleGetWorldDetails,
  handleGetDroppedAsset,
  handleGetVisitor,
  handleUpdateWorldDataObject,
  moveVisitor,
  handleRemoveDroppedAssets,
} from "./controllers/index.ts"
import { getVersion } from "./utils/getVersion.ts"

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

router.get("/system/health", (req, res) => {
  return res.json({
    appVersion: getVersion(),
    status: "OK",
  });
});

// Dropped Assets
router.get("/dropped-asset-with-unique-name", handleGetDroppedAssetsWithUniqueName);
router.post("/dropped-asset", handleDropAsset);
router.get("/dropped-asset", handleGetDroppedAsset);
router.delete("/dropped-asset", handleRemoveDroppedAssets);

// Visitor
router.get("/visitor", handleGetVisitor);
router.put("/visitor/move", moveVisitor);

// World
router.get("/world", handleGetWorldDetails);
router.put("/world/data-object", handleUpdateWorldDataObject);

export default router;
