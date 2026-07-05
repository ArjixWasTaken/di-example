import { createContainer, applyMiddleware, Type } from "di-wise";
import { resolveAllSafe } from "di-wise/middlewares";
import type { PluginSettings } from "./types.js";

export const container = applyMiddleware(createContainer(), [resolveAllSafe]);
export const tokens = {
    PluginSettings: Type<PluginSettings>("PluginSettings"),
} as const;
