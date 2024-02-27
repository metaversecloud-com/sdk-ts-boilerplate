import { errorHandler, getDroppedAsset } from "../../utils/index.js";

export const handleRemoveDroppedAssets = async (req, res) => {
  try {
    const droppedAsset = await getDroppedAsset(req.query);

    if (!droppedAsset) throw { message: "No dropped asset found" };
    droppedAsset.deleteDroppedAsset();

    return res.json({ success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleRemoveDroppedAssets",
      message: "Error removing dropping asset",
      req,
      res,
    });
  }
};
