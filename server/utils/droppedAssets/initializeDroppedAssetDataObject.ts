import { IDroppedAsset } from "../../types/DroppedAssetInterface";
import { errorHandler } from "../errorHandler"

export const initializeDroppedAssetDataObject = async (droppedAsset: IDroppedAsset) => {
  try {
    await droppedAsset.fetchDataObject();

    if (!droppedAsset?.dataObject?.count) {
      // adding a lockId and releaseLock will prevent race conditions and ensure the data object is being updated only once until either the time has passed or the operation is complete
      const lockId = `${droppedAsset.id}-${new Date(Math.round(new Date().getTime() / 60000) * 60000)}`;
      await droppedAsset.setDataObject({ count: 0 }, { lock: { lockId } });
    }

    return;
  } catch (error) {
    errorHandler({
      error,
      functionName: "initializeDroppedAssetDataObject",
      message: "Error initializing dropped asset data object",
    });
    return await droppedAsset.fetchDataObject();
  }
};
