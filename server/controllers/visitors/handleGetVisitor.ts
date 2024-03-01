import { errorHandler, getVisitor } from "../../utils/index.ts"

export const handleGetVisitor = async (req, res) => {
  try {
    const visitor = await getVisitor(req.query);
    return res.json({ visitor, success: true });
  } catch (error) {
    return errorHandler({ error, functionName: "handleGetVisitor", message: "Error getting visitor", req, res });
  }
};
