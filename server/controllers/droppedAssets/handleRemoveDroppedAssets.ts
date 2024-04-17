import { errorHandler, getCredentials, getDroppedAsset } from "../../utils/index.js";
import { Request, Response } from "express";

export const handleRemoveDroppedAssets = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const droppedAsset = await getDroppedAsset(credentials);

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
