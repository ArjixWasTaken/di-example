// prettier-ignore
export type PluginSettings = (
    | { type: "boolean", name: string, default: boolean }
    | { type: "number", name: string, default: number }
)[]
