import { Visitor } from "../topiaInit.ts"
import { errorHandler } from "../errorHandler.ts"

export const getVisitor = async (credentials) => {
  try {
    const { interactivePublicKey, interactiveNonce, urlSlug, visitorId } = credentials;

    const visitor = await Visitor.get(visitorId, urlSlug, {
      credentials: {
        interactiveNonce,
        interactivePublicKey,
        visitorId,
      },
    });

    if (!visitor || !visitor.username) throw "Not in world";

    return visitor;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "getVisitor",
      message: "Error getting visitor",
    });
  }
};
