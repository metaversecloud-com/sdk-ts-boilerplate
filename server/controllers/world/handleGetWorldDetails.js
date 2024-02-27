import { World, errorHandler } from "../../utils/index.js";

export const handleGetWorldDetails = async (req, res) => {
  try {
    const { urlSlug, interactiveNonce, interactivePublicKey, visitorId } = req.query;

    const world = World.create(urlSlug, {
      credentials: {
        interactiveNonce,
        interactivePublicKey,
        visitorId,
      },
    });
    await world.fetchDetails();

    return res.json({ world, success: true });
  } catch (error) {
    return errorHandler({
      error,
      functionName: "handleGetWorldDetails",
      message: "Error getting world details",
      req,
      res,
    });
  }
};
