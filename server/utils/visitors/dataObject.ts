import { Credentials } from "../../types/Credentials.js";
import { errorHandler } from "../errorHandler.js";
import { getVisitor } from "./getVisitor.js";

export const updateLastVisited = async (credentials: Credentials) => {
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

export const incrementVisitorDataObjectValue = async (credentials: Credentials, amount: number, path: string) => {
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
