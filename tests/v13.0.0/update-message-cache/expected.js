import { Options } from "discord.js";
new Client({ makeCache: Options.cacheWithLimits({ MessageManager: 100 }) });
