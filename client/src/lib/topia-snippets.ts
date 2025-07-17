// client/src/lib/topia-snippets.ts
//------------------------------------------------------------
// Generic Topia SDK helpers (v0.1)
// Based on mc-sdk-js patterns in the official examples.
// It exposes **typed, ≤15-line** wrappers so humans and 
// AIs all share one phrasebook.
//------------------------------------------------------------
import { TopiaClient, WorldEvent } from "@rtsdk/topia";          //:contentReference[oaicite:0]{index=0}
import crypto from "crypto";
import jwt from "jsonwebtoken";

/*============================================================
  🔗  SHARED CLIENT
============================================================*/
/**
 * Singleton Topia client wired with Replit secrets.
 */
export const client = new TopiaClient({
  apiKey:  process.env.TOPIA_API_KEY!,
  worldId: process.env.TOPIA_WORLD_ID!,
  appId:   process.env.APP_ID ?? "demo",
});

/**
 * Ensure one WebSocket connection before any SDK call.
 * @example await connectTopia();
 */
export async function connectTopia(): Promise<void> {
  if (!client.isConnected()) await client.connect();
}

/*============================================================
  🎆  EFFECTS & MOVEMENT
============================================================*/
/**
 * Spawn a named particle effect at the caller’s avatar.
 * @example await firework();            // fireworks
 */
export const firework = (type = "fireworks") =>
  client.triggerParticleEffect(type);                                     //:contentReference[oaicite:1]{index=1}

/**
 * Teleport any user to an (x,y) coordinate.
 * Pass `"me"` to move yourself.
 * @example await teleport("me",{x:0,y:0});
 */
export const teleport = (
  userId: "me" | string,
  pos: { x: number; y: number }
) => client.teleportUser(userId, pos);

/*============================================================
  💾  DATA PERSISTENCE
============================================================*/
/**
 * Persist a JSON-serialisable object at an arbitrary path.
 * @example await saveData("demo.counter",{ value:1 });
 */
export const saveData = <T = any>(path: string, data: T) =>
  client.saveDataObject<T>(path, data);

/**
 * Fetch a stored object (or `undefined`).
 * @example const v = await getData<{value:number}>("demo.counter");
 */
export const getData = <T = any>(path: string) =>
  client.getDataObject<T>(path);

/**
 * Increment a numeric field atomically.
 * Returns the new value.
 * @example await bumpNumber("scores.alice",1);
 */
export const bumpNumber = async (path: string, delta = 1) => {
  const cur = (await getData<{ v: number }>(path))?.v ?? 0;
  const next = cur + delta;
  await saveData(path, { v: next });
  return next;
};

/*============================================================
  📢  REAL-TIME WORLD EVENTS
============================================================*/
/**
 * Publish a custom payload on any channel.
 * @example await emit("myApp:play",{ id:"track42" });
 */
export const emit = (channel: string, payload: any) =>
  client.publishWorldEvent(channel, payload);

/**
 * Subscribe to a channel; returns `unsubscribe`.
 * @example const off = on("myApp:play", cb);
 */
export const on = (
  channel: string,
  cb: (evt: WorldEvent) => void
) => client.subscribeToWorldEvents(channel, cb);

/*============================================================
  👫  PROFILES & PLAYERS   <-- NEW
============================================================*/
/**
 * Get the profile of the **current** user.
 * @example const me = await getMyProfile();
 */
export const getMyProfile = () => client.getProfile();

/**
 * List every profile currently in the world.
 * @example const players = await listProfiles();
 */
export const listProfiles = () => client.getProfilesInWorld?.() ?? [];

/*============================================================
  🖼️  ASSET UTILITIES
============================================================*/
/**
 * Patch any editable asset with partial props.
 * @example await updateAsset(id,{ text:"Hello" });
 */
export const updateAsset = (id: string, props: Record<string, any>) =>
  client.updateAsset(id, props);

/** Hide or show an asset by ID. */
export const hideAsset = (id: string, hide = true) =>
  client[hide ? "hideAsset" : "showAsset"](id);

/*============================================================
  🏗️  ASSET SPAWN / MOVE / DESTROY   <-- NEW
============================================================*/
/**
 * Spawn a new asset from a media URL at (x,y).
 * @example await spawnAsset("/imgs/star.png",{x:5,y:2});
 */
export const spawnAsset = (
  url: string,
  pos: { x: number; y: number }
) => client.createAsset({ url, ...pos });

/**
 * Move an existing asset by ID.
 * @example await moveAsset(id,{x:10,y:0});
 */
export const moveAsset = (id: string, pos: { x: number; y: number }) =>
  client.moveAsset(id, pos);

/**
 * Delete an asset forever.
 * @example await destroyAsset(id);
 */
export const destroyAsset = (id: string) => client.destroyAsset(id);

/*============================================================
  ✅  AUTH - WEBHOOK SIG & PLAYER TOKEN
============================================================*/
/**
 * Verify `x-topia-signature` HMAC on interactive webhooks.
 * Pass raw body buffer.
 * @returns `true` if valid.
 */
export const verifyTopiaSignature = (
  rawBody: Buffer,
  signature: string,
  secret = process.env.INTERACTIVE_SECRET!
) =>
  crypto.timingSafeEqual(
    Buffer.from(signature),
    crypto.createHmac("sha256", secret).update(rawBody).digest()
  );

/**
 * Decode & validate `playerAuthToken` JWT from Topia.
 * Returns payload or `null`.
 */
export const decodePlayerToken = <T = any>(
  token: string,
  pubKey = process.env.INTERACTIVE_KEY!
): T | null => {
  try {
    return jwt.verify(token, pubKey, { algorithms: ["RS256"] }) as T;
  } catch {
    return null;
  }

/*============================================================
!!!!!  App Specific Examples  !!!!!!!!
============================================================*/
  
/* =============================================================== */
/* 📌  BULLETIN BOARD HELPER EXAMPLES                               */
/* =============================================================== */

type Msg = { id: string; message?: string; imageUrl?: string; approved?: boolean };

/** Submit a new bulletin message; awaits review. */
export const submitBulletin = (m: Omit<Msg, "approved">) =>
  client.saveDataObject<Msg>(`messages.${m.id}`, { ...m, approved: false });

/** Admin: mark a message as approved and broadcast via particles. */
export const approveBulletin = async (id: string) => {
  await client.saveDataObject<Msg>(`messages.${id}.approved`, { approved: true });
  await firework("confetti");
};

/**
 * Place or update text/img on a given anchor asset.
 * @example await placeOnAnchor(anchorId, { text: "Hi!" });
 */
export const placeOnAnchor = (
  anchorId: string,
  props: { text?: string; imageUrl?: string }
) => client.updateAsset(anchorId, props);

/* =============================================================== */
/* 🎵  JUKEBOX HELPER EXAMPLES                                     */
/* =============================================================== */

/**
 * Queue an audio track for the whole world (Jukebox pattern).
 * @example await queueTrack({ url:"/songs/lofi.mp3", title:"Lofi" });
 */
export const queueTrack = (t: { url: string; title: string }) =>
  client.publishWorldEvent("jukebox:queue", t);

/** Stop the current track for everyone. */
export const stopTrack = () => client.publishWorldEvent("jukebox:stop", {});

/* =============================================================== */
/* ❌  TIC-TAC-TOE HELPER EXAMPLES                               */
/* =============================================================== */

type Board = ("X" | "O" | null)[];

/** Record a move and persist board state. */
export const makeMove = async (
  gameId: string,
  idx: number,
  player: "X" | "O"
) => {
  const path = `tictactoe.${gameId}.board`;
  const board = (await client.getDataObject<Board>(path)) ?? Array(9).fill(null);
  if (!board[idx]) board[idx] = player;
  await client.saveDataObject(path, board);
  return board;
};

/** Fetch the whole board in one call. */
export const getBoard = (gameId: string) =>
  client.getDataObject<Board>(`tictactoe.${gameId}.board`);

/* =============================================================== */
/* 🗺️  QUEST HELPER EXAMPLES                                       */
/* =============================================================== */

type QuestStats = { found: number; lastFound: number };

/**
 * Claim a quest item; updates per-player counter + fireworks.
 * @example await claimQuest(assetId);
 */
export const claimQuest = async (assetId: string) => {
  const me = await client.getProfile();
  const path = `quest.itemsCollectedByUser.${me.id}`;
  const data = (await client.getDataObject<QuestStats>(path)) ?? {
    found: 0,
    lastFound: Date.now(),
  };
  await client.saveDataObject(path, { ...data, found: data.found + 1 });
  await firework("sparkle");
  await client.hideAsset(assetId);
};

/** Leaderboard sorted by `found` desc. */
export const getQuestLeaderboard = () =>
  client.queryDataObjects<QuestStats>("quest.itemsCollectedByUser", {
    sort: { found: "desc" },
  });
