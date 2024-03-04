import { getVisitor, errorHandler } from "../../utils/index.ts"

export const openIframe = async (req, res) => {
  try {
    const { link, shouldOpenInDrawer, title } = req.body;

    const visitor = await getVisitor(req.query);
    await visitor.openIframe({ link, shouldOpenInDrawer, title });

    return res.json({ visitor, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "openIframe",
      message: "Error opening iFrame in visitor UI",
      req,
      res,
    });
  }
};

export const fireToast = async (req, res) => {
  try {
    const { groupId, title, text } = req.body;

    const visitor = await getVisitor(req.query);
    await visitor.fireToast({ groupId, title, text });

    return res.json({ visitor, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "fireToast",
      message: "Error firing toast in visitor UI",
      req,
      res,
    });
  }
};

export const moveVisitor = async (req, res) => {
  try {
    const { moveTo, shouldTeleportVisitor } = req.body;
    const visitor = await getVisitor(req.query);

    await visitor.moveVisitor({ x: moveTo.x, y: moveTo.y, shouldTeleportVisitor });

    return res.json({ visitor, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "moveVisitor",
      message: "Error moving visitor",
      req,
      res,
    });
  }
};
