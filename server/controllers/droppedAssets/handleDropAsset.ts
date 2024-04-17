import { Request, Response } from "express";
import { Asset, DroppedAsset, errorHandler, getCredentials } from "../../utils/index.js";

export const handleDropAsset = async (req: Request, res: Response): Promise<Record<string, any> | void> => {
  try {
    const {
      assetId,
      isInteractive,
      position,
      uniqueName,
    }: { assetId: string; isInteractive: boolean; position: { x: number; y: number }; uniqueName: string } = req.body;

    const credentials = getCredentials(req.query);

    const asset = Asset.create(assetId, { credentials });

    const droppedAsset = await DroppedAsset.drop(asset, {
      isInteractive,
      interactivePublicKey: process.env.INTERACTIVE_KEY,
      position,
      uniqueName,
      urlSlug: credentials.urlSlug,
    });

    return res.json({ droppedAsset, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleDropAsset",
      message: "Error dropping asset",
      req,
      res,
    });
  }
};
