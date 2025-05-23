import { logger } from "../logger";
import { updateCheck } from "../update-check";
import { fgGreenColor, resetColor } from "./constants";

/**
 * Write a message to the log that tells the user what they might do after we have reported an unexpected error.
 */
export async function logPossibleBugMessage() {
	if (process.versions.bun) {
		logger.warn(
			`Wrangler does not support the Bun runtime. Please try this command again using Node.js via \`npm\` or \`pnpm\`. Alternatively, make sure you're not passing the \`--bun\` flag when running \`bun run wrangler ...\``
		);
		return;
	}
	logger.log(
		`${fgGreenColor}%s${resetColor}`,
		"If you think this is a bug then please create an issue at https://github.com/cloudflare/workers-sdk/issues/new/choose"
	);
	const latestVersion = await updateCheck();
	if (latestVersion) {
		logger.log(
			`Note that there is a newer version of Wrangler available (${latestVersion}). Consider checking whether upgrading resolves this error.`
		);
	}
}
