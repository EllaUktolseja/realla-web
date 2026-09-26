import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCommand = isWindows ? "npm.cmd" : "npm";

const children = [
  ["api", ["run", "dev", "--workspace=api"]],
  ["web", ["run", "dev", "--workspace=web"]],
].map(([name, args]) => {
  const child = spawn(npmCommand, args, {
    stdio: "inherit",
    env: { ...process.env, FORCE_COLOR: "1" },
  });

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;
    if (code !== 0 || signal) {
      console.error(`[${name}] stopped unexpectedly.`);
      shutdown("child exit");
    }
  });

  return child;
});

let shuttingDown = false;

function shutdown(reason) {
  if (shuttingDown) return;
  shuttingDown = true;

  console.log(`\nStopping development servers (${reason})...`);

  for (const child of children) {
    if (child.killed) continue;

    if (isWindows) {
      spawn("taskkill", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore",
      });
    } else {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(0), 500);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
