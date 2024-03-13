import { Request, Response } from "express";
import { DroppedAsset, errorHandler, getCredentials, initializeDroppedAssetDataObject } from "../../utils";
import { IDroppedAsset } from '../../types/DroppedAssetInterface';

export const handleGetDroppedAsset = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const droppedAsset = await DroppedAsset.get(credentials.assetId, credentials.urlSlug, { credentials });

    // If the application will make any updates to a dropped asset's data object we need to
    // first instantiate to ensure it's existence and define it's proper structure.
    // The same should be true for World, User, and Visitor data objects
    await initializeDroppedAssetDataObject(droppedAsset as IDroppedAsset);

    return res.json({ droppedAsset, success: true });
  } catch (error) {
    errorHandler({
      error,
      functionName: "getDroppedAssetDetails",
      message: "Error getting dropped asset instance and data object",
      req,
      res,
    });
  }
};