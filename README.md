
---

# 🐚 nsh — Node.js Shell

A REPL-powered Node.js shell that combines the flexibility of JavaScript with shell-like capabilities via [ShellJS](https://github.com/shelljs/shelljs). Supports `.nsh` scripts, async functions, argument passing, and user plugins.

---

## 📦 Install

Install globally via NPM:

```bash
npm install -g biensure-nsh
```

To run it locally (without installing globally):

```bash
npx nsh path/to/script.nsh
```

## 🚀 Usage

### Launch Interactive Shell

```bash
nsh
```

You'll see a prompt like:

```bash
nsh:/your/current/directory >
```

Try some shell commands:

```js
ls();
cd('code');
pwd();
```

These are available because shelljs is loaded into the context of every .nsh script.

You can use any JavaScript too:

```js
[1, 2, 3].map(x => x * 2);
```

---

### Run a `.nsh` Script

```bash
nsh path/to/script.nsh
```

Or pass arguments:

```bash
nsh test/myscript.nsh hello world
```

---

## 📁 Script Example

```js
// test/example.nsh

console.log("Hello from nsh script!");

// Access CLI args
args.forEach((a, i) => console.log(`arg[${i}] = ${a}`));

// Use shelljs commands
console.log('Directory listing:');
console.log(ls().stdout);

// Async support
await new Promise(r => setTimeout(r, 1000));
console.log("Waited 1 second.");
```

---

## 🧠 Passing Arguments to Scripts

Arguments passed on the command line are available as `args`:

```bash
nsh myscript.nsh foo bar
```

```js
// inside myscript.nsh
console.log(args);  // ['foo', 'bar']
```

---

## ⏳ Async/Await Support

All `.nsh` scripts run inside an `async` IIFE. So you can:

✅ Use `await` at top-level
✅ Perform file operations, HTTP requests, etc.

```js
const { readFile } = require('fs/promises');
const content = await readFile('README.md', 'utf-8');
console.log(content);
```

---

## ✨ Make .nsh Scripts Executable

To run .nsh scripts like regular shell scripts:
1. Add a Shebang

At the very top of your .nsh script, add:

#!/usr/bin/env nsh

2. Make It Executable

Give it execute permissions:

chmod +x yourscript.nsh

3. Run It

./yourscript.nsh arg1 arg2

It will behave just like a Bash or Python script — but powered by Node.js and ShellJS.

---

## 🔌 Writing Plugins

You can inject functionality into `nsh` via plugins.

### Step 1: Create a `.js` file exporting functions

```js
// plugins/myplugin.js
module.exports = {
  hello: () => console.log("Hello from plugin!"),
  double: x => x * 2
};
```

### Step 2: Load it in `.nsh` script

```js
Object.assign(globalThis, require('../plugins/myplugin.js'));

hello();       // → Hello from plugin!
console.log(double(5));  // → 10
```

Or make it globally available in `nsh.js` if you want persistent commands.

---

## 📝 Roadmap

* Plugin system autoloading
* Command aliasing
* Tab completion improvements
* Script testing framework

---

## 🧑‍💻 Author

Made by [@biensurerodezee](https://github.com/biensurerodezee)

MIT License

---

### Troubleshooting

* **Maximum Call Stack Size Exceeded**: This can happen if there's an infinite loop or recursion in your script. Make sure your scripts are not recursively calling themselves or running into circular dependencies.
* **File Not Found**: If you get an error saying `File not found`, ensure the script path is correct and the file exists.
* **Command Not Found**: Ensure you’ve correctly added `shelljs` commands into the REPL context.

---

### Contributing

You can extend or contribute to `nsh` by:

* Adding more shell commands or modifying existing ones.
* Creating plugins to add custom functionality.
* Opening an issue or submitting a pull request with improvements.

---

This should give you a full understanding of how to use, extend, or even set up `nsh` as your default shell :). Let me know if anything is unclear or if you need further improvements!
