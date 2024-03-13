import { World } from "../topiaInit"
import { errorHandler } from "../errorHandler"
import { Credentials } from "../../types";

export const addProfileToWorldDataObject = async (credentials: Credentials) => {
  try {
    const { assetId, profileId, urlSlug, username } = credentials;

    const world = World.create(urlSlug, { credentials });

    // Include the complete path to the property you'd like to update in the data object to prevent the entire object from being erroneously updated
    await world.updateDataObject({ [`keyAssets.${assetId}.profiles.${profileId}`]: username });

    return world.dataObject;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "addProfileToWorldDataObject",
      message: "Error updating world data object",
    });
  }
};