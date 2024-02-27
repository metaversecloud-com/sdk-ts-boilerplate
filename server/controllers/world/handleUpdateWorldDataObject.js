import { addProfileToWorldDataObject, errorHandler } from "../../utils/index.js";

export const handleUpdateWorldDataObject = async (req, res) => {
  try {
    const dataObject = await addProfileToWorldDataObject(req.query);
    return res.json({ dataObject, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleUpdateWorldDataObject",
      message: "Error updating world data object",
      req,
      res,
    });
  }
};
