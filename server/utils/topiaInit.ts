import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { Topia, AssetFactory, DroppedAssetFactory, UserFactory, VisitorFactory, WorldFactory } from "@rtsdk/topia";

const config = {
  apiDomain: process.env.INSTANCE_DOMAIN || "api.topia.io",
  apiKey: process.env.API_KEY,
  apiProtocol: process.env.INSTANCE_PROTOCOL || "https",
  interactiveKey: process.env.INTERACTIVE_KEY,
  interactiveSecret: process.env.INTERACTIVE_SECRET,
};
console.log("🚀 ~ file: topiaInit.ts:13 ~ config:", config)

const myTopiaInstance = new Topia(config);

const Asset = new AssetFactory(myTopiaInstance);
const DroppedAsset = new DroppedAssetFactory(myTopiaInstance);
const User = new UserFactory(myTopiaInstance);
const Visitor = new VisitorFactory(myTopiaInstance);
const World = new WorldFactory(myTopiaInstance);

export { Asset, DroppedAsset, myTopiaInstance, User, Visitor, World };
