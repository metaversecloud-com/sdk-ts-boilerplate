import { Request, Response } from "express";
import { errorHandler, getCredentials, World } from "../../utils"

export const handleRemoveDroppedAssetsByUniqueName = async (req: Request, res: Response): Promise<Record<string, any> | void> => {
  try {
    const credentials = getCredentials(req.query);
    const { assetId, interactivePublicKey, urlSlug } =  credentials

      let droppedAssetIds = [],
        droppedAssets;

    const world = World.create(urlSlug, { credentials });
    droppedAssets = await world.fetchDroppedAssetsWithUniqueName({
      isPartial: true,
      uniqueName: assetId,
    });

    for (const droppedAsset in droppedAssets) {
      droppedAssetIds.push(droppedAssets[droppedAsset].id);
    }
    if (droppedAssetIds.length > 0) {
      await Promise.all(
        // @ts-ignore
        World.deleteDroppedAssets(urlSlug, droppedAssetIds, {
          interactivePublicKey,
          interactiveSecret: process.env.INTERACTIVE_SECRET,
        })
      )
    }

    return res.json({ success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleRemoveDroppedAssets",
      message: "Error removing dropping assets",
      req,
      res,
    });
  }
};
