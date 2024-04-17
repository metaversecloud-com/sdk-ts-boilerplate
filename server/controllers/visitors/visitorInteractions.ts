import { getVisitor, errorHandler, getCredentials } from "../../utils/index.js";
import { Request, Response } from "express";

export const openIframe = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const { link, shouldOpenInDrawer, title } = req.body;

    const visitor = await getVisitor(credentials);
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

export const fireToast = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const { groupId, title, text } = req.body;

    const visitor = await getVisitor(credentials);
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

export const moveVisitor = async (req: Request, res: Response) => {
  try {
    const credentials = getCredentials(req.query);
    const { moveTo, shouldTeleportVisitor } = req.body;
    const visitor = await getVisitor(credentials);

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
