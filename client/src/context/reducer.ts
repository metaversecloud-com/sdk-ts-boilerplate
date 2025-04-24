import {
  ActionType,
  InitialState,
  SET_ERROR,
  SET_GAME_STATE,
  SET_HAS_SETUP_BACKEND,
  SET_INTERACTIVE_PARAMS,
} from "./types";

const globalReducer = (state: InitialState, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case SET_INTERACTIVE_PARAMS:
      return {
        ...state,
        hasInteractiveParams: true,
        profileId: payload.profileId,
        sceneDropId: payload.sceneDropId,
      };
    case SET_HAS_SETUP_BACKEND:
      return {
        ...state,
        ...payload,
        hasSetupBackend: true,
      };
    case SET_GAME_STATE:
      return {
        ...state,
        droppedAsset: payload.droppedAsset,
        visitor: payload.visitor,
        error: "",
      };
    case SET_ERROR:
      return {
        ...state,
        error: payload?.error,
      };

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export { globalReducer };
