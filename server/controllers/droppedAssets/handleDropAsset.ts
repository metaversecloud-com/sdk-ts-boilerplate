import { Asset, DroppedAsset, errorHandler } from "../../utils/index.ts"

export const handleDropAsset = async (req, res) => {
  try {
    const { interactiveNonce, interactivePublicKey, urlSlug, visitorId } = req.query;
    const { assetId, isInteractive, position, uniqueName } = req.body;

    const asset = Asset.create(assetId, {
      credentials: {
        interactiveNonce,
        interactivePublicKey,
        visitorId,
      },
    });

    const droppedAsset = await DroppedAsset.drop(asset, {
      isInteractive,
      interactivePublicKey: process.env.INTERACTIVE_KEY,
      position: position || { x: 0, y: 0 },
      uniqueName,
      urlSlug,
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
