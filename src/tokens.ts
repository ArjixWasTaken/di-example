import { Type } from "di-wise";

export interface Clock {
    now(): Date;
}

export interface Logger {
    info(message: string): void;
    warn(message: string): void;
}

export interface Settings {
    bool(name: string): boolean;
    num(name: string): number;
}

// prettier-ignore
export type SettingDefinition =
    | { type: "boolean"; name: string; default: boolean }
    | { type: "number";  name: string; default: number };

export interface Plugin {
    readonly name: string;
    run(): void;
}

export const tokens = {
    Clock: Type<Clock>("Clock"),
    Logger: Type<Logger>("Logger"),
    Settings: Type<Settings>("Settings"),
    PluginSettings: Type<SettingDefinition[]>("PluginSettings"),
    Plugin: Type<Plugin>("Plugin"),
} as const;
