import { DroppedAsset, errorHandler } from "../index.js";

export const getDroppedAsset = async (credentials) => {
  try {
    const { assetId, interactivePublicKey, interactiveNonce, urlSlug, visitorId } = credentials;

    const droppedAsset = await DroppedAsset.get(assetId, urlSlug, {
      credentials: {
        interactiveNonce,
        interactivePublicKey,
        visitorId,
      },
    });

    if (!droppedAsset) throw "Dropped asset not found";

    return droppedAsset;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "getDroppedAsset",
      message: "Error getting dropped asset",
    });
  }
};
