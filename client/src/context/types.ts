export const SET_INTERACTIVE_PARAMS = "SET_INTERACTIVE_PARAMS";

export type InteractiveParams = {
  assetId: string | null;
  displayName: string;
  interactiveNonce: string;
  interactivePublicKey: string;
  profileId: string;
  sceneDropId: string;
  uniqueName: string;
  urlSlug: string;
  username: string;
  visitorId: string;
}

export interface InitialState {
  hasInteractiveParams: boolean;
  selectedWorld: { [key: string]: any };
  urlSlug: string;
}

export type ActionType = {
  type: string;
  payload?: any;
};