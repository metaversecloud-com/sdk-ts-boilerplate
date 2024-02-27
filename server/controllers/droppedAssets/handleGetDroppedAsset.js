import { errorHandler, getDroppedAsset, initializeDroppedAssetDataObject } from "../../utils/index.js";

export const handleGetDroppedAsset = async (req, res) => {
  try {
    const droppedAsset = await getDroppedAsset(req.query);
    // If the application will make any updates to a dropped asset's data object we need to
    // first instantiate to ensure it's existence and define it's proper structure.
    // The same should be true for World, User, and Visitor data objects
    await initializeDroppedAssetDataObject(droppedAsset);
    return res.json({ droppedAsset, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleGetDroppedAsset",
      message: "Error getting dropped asset instance and data object",
      req,
      res,
    });
  }
};
