import { Credentials } from "../types/index.js";

export const getCredentials = (query: any): Credentials => {
  const requiredFields = ["interactiveNonce", "interactivePublicKey", "urlSlug", "visitorId"];
  const missingFields = requiredFields.filter((variable) => !query[variable]);
  if (missingFields.length > 0) {
    throw new Error(`Missing required body parameters: ${missingFields.join(", ")}`);
  }

  return {
    assetId: query.assetId as string,
    interactiveNonce: query.interactiveNonce as string,
    interactivePublicKey: query.interactivePublicKey as string,
    profileId: query.profileId as string,
    urlSlug: query.urlSlug as string,
    username: query.username as string,
    visitorId: Number(query.visitorId),
  };
};
