import { createContext } from "react";
import { ActionType, InitialState } from "./types";

export const GlobalStateContext = createContext<InitialState>({ hasInteractiveParams: false });

export const GlobalDispatchContext = createContext<React.Dispatch<ActionType> | null>(null);
