const chokidar = require("chokidar");
const { exec } = require("child_process");

const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`📄 File changed: ${path}`);

  // Only commit and push if there are real changes
  exec(
    'git diff --quiet && git diff --cached --quiet || (git add . && git commit -m "auto update" && git push)',
    (err, stdout, stderr) => {
      if (err && !stdout && !stderr) {
        console.log("⚠️ No new changes to commit.");
      } else if (err) {
        console.error(`❌ Git error:\n${stderr}`);
      } else {
        console.log(`✅ Auto-pushed to GitHub:\n${stdout}`);
      }
    }
  );
});

console.log("👀 Watching for file changes... Press Ctrl + C to stop.");
