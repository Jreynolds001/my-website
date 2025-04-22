const chokidar = require("chokidar");
const { exec } = require("child_process");

const watcher = chokidar.watch(".", {
  ignored: /(^|[\/\\])\../, // ignore dotfiles like .git
  persistent: true,
});

watcher.on("change", (path) => {
  console.log(`📄 File changed: ${path}`);
  exec(
    'git add . && git commit -m "auto update" && git push',
    (err, stdout, stderr) => {
      if (err) {
        console.error(`❌ Git error:\n${stderr}`);
      } else {
        console.log(`✅ Auto-pushed to GitHub:\n${stdout}`);
      }
    }
  );
});

console.log("👀 Watching for file changes... Press Ctrl + C to stop.");
