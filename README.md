
---

# 🐚 nsh — Node.js Shell

A REPL-powered Node.js shell that combines the flexibility of JavaScript with shell-like capabilities via [ShellJS](https://github.com/shelljs/shelljs).
Supports CLI, `.nsh` scripts, argument passing, async functions, REPL history and auto-complete, persistent variables and ShellJS based plugins.

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

These are available because ShellJS is loaded into the context of every .nsh script.

You can use any JavaScript too:

```js
[1, 2, 3].map(x => x * 2);
```

---

### Why the big output object?

The reason why, after typing ls(), you see a very big object like this:

```bash
nsh:/home/user/directory > ls()
[
  'LICENSE',
  'README.md',
  'node_modules',
  'nsh.js',
  'package-lock.json',
  'package.json',
  'test',
  stdout: 'LICENSE\n' +
    'README.md\n' +
    'node_modules\n' +
    'nsh.js\n' +
    'package-lock.json\n' +
    'package.json\n' +
    'test\n',
  stderr: null,
  code: 0,
  cat: [Function: bound ],
  exec: [Function: bound ],
  grep: [Function: bound ],
  head: [Function: bound ],
  sed: [Function: bound ],
  sort: [Function: bound ],
  tail: [Function: bound ],
  to: [Function: bound ],
  toEnd: [Function: bound ],
  uniq: [Function: bound ]
]
```

is because ShellJS commands return objects that contain possible sub functions:

```bash
nsh:/home/administrator/Projects/nsh > ls().sort()
[String: 'LICENSE\n' +
  'node_modules\n' +
  'nsh.js\n' +
  'package-lock.json\n' +
  'package.json\n' +
  'README.md\n' +
  'test\n'] {
...
}

```

if you only want the output just type:

```bash
console.log(ls().stdout)
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

## 🧮 Persistent Variables

Variables defined in the REPL are persisted across commands during the session, just like in a regular JavaScript environment:

```bash
nsh
nsh:/home/user > var TESTVAR = 1;
nsh:/home/user > console.log(TESTVAR);
1
nsh:/home/user > echo(TESTVAR);
1
[String: '1\n'] {
  stdout: '1\n',
  stderr: null,
  code: 0,
  ...
}
```

These variables remain in memory until you exit the session. This makes it easy to store values, reuse them across shell and JS commands, and experiment interactively.

You can use both standard JavaScript functions and ShellJS utilities with your variables.

---

## ✨ Make .nsh Scripts Executable

To run .nsh scripts like regular shell scripts:

1. Add a Shebang

At the very top of your .nsh script, add:

```bash
#!/usr/bin/env nsh
```

2. Make It Executable

Give it execute permissions:

```bash
chmod +x yourscript.nsh
```

3. Run It

```bash
./yourscript.nsh arg1 arg2
```

It will behave just like a Bash or Python script — but powered by Node.js and ShellJS.

---

## 🔌 Customized commands `pwdl` and `lsl`

For testing purpose the `pwdl()` and `lsl()` command were added:
```js
// Add a console logged `pwd` helper
r.context.pwdl = () => {
  console.log(shell.pwd().stdout);
};

// Add a console logged `ls` helper
r.context.lsl = () => {
  console.log(shell.ls().stdout);
};
```

This way the result was quite a bit shorter and directly effective.

Of courses you can wrap any ShellJS command in console.log() and choose to only log the error by adding .stderr instead of .stdout

---

## 🔌 Plugins

You can inject functionality into `nsh` via the plugin system of ShellJS.
Every plugin installed in ShellJS will be available within `nsh`.
Read the [wiki](https://github.com/shelljs/shelljs/wiki/Using-ShellJS-Plugins) of how to install, write and share plugins.

---

## 🧑‍💻 Author

Made by [@biensurerodezee](https://github.com/biensurerodezee)

MIT License

---

## 🛠️ Troubleshooting

* **Maximum Call Stack Size Exceeded**: This can happen if there's an infinite loop or recursion in your script. Make sure your scripts are not recursively calling themselves or running into circular dependencies.
* **File Not Found**: If you get an error saying `File not found`, ensure the script path is correct and the file exists.
* **Command Not Found**: Ensure you’ve correctly added `shelljs` commands into the REPL context.

---

## 🤝 Contributing

You can extend or contribute to `nsh` by:

* Sharing your-created.nsh scripts by adding them to the example folder and create a pull request.
* Creating [ShellJS](https://github.com/shelljs/shelljs) based plugins to add custom functionality.
* Opening an issue or submitting a pull request with any improvements.

---

## ✅ Test Coverage

The project includes a robust test suite (using Vitest) to validate:

- [x] Version output
- [x] Script execution with and without args
- [x] Async/await handling
- [x] Missing and invalid scripts
- [x] Runtime error messages
- [x] Script execution via REPL
- [x] Shebang handling
- [x] REPL prompt updates on cd
- [x] REPL history load/save

Tests are located in nsh.test.js and cover both CLI and REPL functionality.

This should give you a full understanding of how to use, extend, or even set up `nsh` as your default shell :). Let me know if anything is unclear or if you need further improvements!
