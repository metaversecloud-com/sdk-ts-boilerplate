import { errorHandler } from "../errorHandler.ts"
import { getVisitor } from "./getVisitor.ts"

export const updateLastVisited = async (credentials) => {
  try {
    const visitor = await getVisitor(credentials);
    // Optionally pass in a lock object as third argument of type
    // { lockId: string, releaseLock?: boolean }
    await visitor.updateDataObject({ lastInteraction: Date.now() });
    return visitor;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "updateLastVisited",
      message: "Error updating last visited",
    });
  }
};

export const incrementVisitorDataObjectValue = async (credentials, amount, path) => {
  try {
    const visitor = await getVisitor(credentials);
    await visitor.incrementDataObjectValue(path, amount);
    return visitor;
  } catch (error) {
    return errorHandler({
      error,
      functionName: "incrementVisitorDataObjectValue",
      message: "Error incrementing visitor data object",
    });
  }
};
