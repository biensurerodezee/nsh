#!/usr/bin/env node
// nsh: NodeJS Shell

// Require defaults
const repl = require('repl');
const shell = require('shelljs');
const fs = require('fs');
const path = require('path');
const os = require('os');
const vm = require('vm');

// Location for storing REPL history
const historyFile = path.join(os.homedir(), '.nsh_history');

// Start REPL
let currentDir = process.cwd();
const r = repl.start({
  prompt: `nsh:${currentDir} > `,
  completer: completer
});

// Inject shelljs commands into the REPL context
Object.assign(r.context, shell);

// Override `cd` to update prompt
r.context.cd = function (dir) {
  const result = shell.cd(dir);
  if (result.code === 0) {
    currentDir = shell.pwd().stdout;
    r.setPrompt(`nsh:${currentDir} > `);
    r.displayPrompt();
  } else {
    console.error(`cd: ${result.stderr}`);
  }
};

// Add a `run` command
r.context.run = async function (file, args = []) {
  const scriptPath = path.resolve(file);
  if (fs.existsSync(scriptPath)) {
    const code = fs.readFileSync(scriptPath, 'utf8');

    r.context.args = args;

    try {
      const result = vm.runInContext(`(async () => { ${code} })()`, r.context, {
        filename: scriptPath,
      });

      if (result && typeof result.then === 'function') {
        await result;
      } else if (result !== undefined) {
        console.log(result);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    } finally {
      delete r.context.args;
    }
  } else {
    console.error(`File not found: ${file}`);
  }
};

// Add a `pwd` helper
r.context.pwd = () => {
  console.log(shell.pwd().stdout);
};

// Load command history
if (fs.existsSync(historyFile)) {
  const historyLines = fs.readFileSync(historyFile, 'utf8').split('\n').reverse();
  r.history.push(...historyLines.filter(line => line.trim() !== ''));
}

// Save history on exit
r.on('exit', () => {
  try {
    fs.writeFileSync(historyFile, r.history.reverse().join('\n'), 'utf8');
  } catch (err) {
    console.error('Error saving history:', err);
  }
  console.log('\nGoodbye!');
  process.exit();
});

// Auto-completion
function completer(line) {
  const shellCommands = Object.keys(shell);
  const fsEntries = fs.readdirSync(currentDir);
  const allOptions = shellCommands.concat(fsEntries);

  const hits = allOptions.filter(cmd => cmd.startsWith(line));
  return [hits.length ? hits : allOptions, line];
}

// Handle direct execution
const args = process.argv.slice(2);
if (args.length >= 1) {
  const script = args[0];
  const scriptArgs = args.slice(1);
  // Await the promise of the run
  (async () => {
    try {
      await r.context.run(script, scriptArgs);
    } catch (err) {
      console.error(err);
    } finally {
      r.context.exit();
    }
  })();
}
