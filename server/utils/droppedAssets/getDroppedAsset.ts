import { Credentials, IDroppedAsset } from "../../types/index.js";
import { errorHandler } from "../errorHandler.js";
import { DroppedAsset } from "../topiaInit.js";
import { initializeDroppedAssetDataObject } from "./initializeDroppedAssetDataObject.js";

export const getDroppedAsset = async (credentials: Credentials) => {
  try {
    const { assetId, urlSlug } = credentials;

    const droppedAsset = await DroppedAsset.get(assetId, urlSlug, { credentials });
    await initializeDroppedAssetDataObject(droppedAsset as IDroppedAsset);

    if (!droppedAsset) throw "Dropped asset not found";

    await droppedAsset.fetchDataObject();

    return droppedAsset;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "getDroppedAsset",
      message: "Error getting dropped asset",
    });
  }
};
