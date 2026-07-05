import { container, tokens } from "./container.js";
import "./plugins/plugin-a.js";
import "./plugins/plugin-b.js";

const settings = container.resolveAll(tokens.PluginSettings);
console.log(settings);
