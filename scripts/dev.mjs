import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";
const npmCli = process.env.npm_execpath;

const commands = [
  ["api", ["run", "dev", "--workspace=api"]],
  ["web", ["run", "dev", "--workspace=web"]],
];

let shuttingDown = false;
const children = [];

function spawnWorkspace(name, args) {
  const child = npmCli
    ? spawn(process.execPath, [npmCli, ...args], {
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "1" },
      })
    : spawn(isWindows ? "npm.cmd" : "npm", args, {
        stdio: "inherit",
        env: { ...process.env, FORCE_COLOR: "1" },
      });

  child.on("error", (error) => {
    console.error(`[${name}] failed to start:`, error);
    shutdown("child error");
  });

  child.on("exit", (code, signal) => {
    if (shuttingDown) return;

    if (code !== 0 || signal) {
      console.error(`[${name}] stopped unexpectedly.`);
      shutdown("child exit");
    }
  });

  children.push(child);
}

function shutdown(reason) {
  if (shuttingDown) return;

  shuttingDown = true;
  console.log(`\nStopping development servers (${reason})...`);

  for (const child of children) {
    if (!child.pid) continue;

    if (isWindows) {
      spawn("taskkill.exe", ["/pid", String(child.pid), "/t", "/f"], {
        stdio: "ignore",
        windowsHide: true,
      });
    } else {
      child.kill("SIGTERM");
    }
  }

  setTimeout(() => process.exit(0), 500);
}

for (const [name, args] of commands) {
  spawnWorkspace(name, args);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));