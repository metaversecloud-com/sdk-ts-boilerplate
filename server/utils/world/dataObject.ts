import { World } from "../topiaInit.js"
import { errorHandler } from "../errorHandler.js"
import { Credentials } from "../../types/Credentials.js";

export const addProfileToWorldDataObject = async (credentials: Credentials) => {
  try {
    const { assetId, urlSlug, username, profileId } = credentials;

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

export const incrementWorldDataObjectValue = async (credentials: Credentials, amount, path) => {
  try {
    const { urlSlug } = credentials;

    const world = World.create(urlSlug, { credentials });

    // path should equal the exact path to the item you'd like to increment i.e. `keyAssets.${assetId}.gamesPlayedByUser.${profileId}.count`
    await world.incrementDataObjectValue(path, amount);

    return world.dataObject;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "incrementWorldDataObjectValue",
      message: "Error incrementing world data object",
    });
  }
};
