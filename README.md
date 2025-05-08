# nsh - NodeJS Shell

`nsh` is a simple, customizable shell built using Node.js and `shelljs`. It allows you to run shell commands interactively in a REPL environment, execute `.nsh` scripts, and even extend its functionality with plugins.

### Features

* **Interactive Shell**: Execute shell commands in an interactive Node.js shell.
* **Script Execution**: Run `.nsh` script files, passing arguments if needed.
* **History**: Command history is saved and loaded automatically.
* **Extensibility**: Extend the shell using Node.js and `shelljs` commands.
* **Plugins**: Easily create plugins to extend functionality.

---

### Requirements

* **Node.js**: You will need to have Node.js installed.
* **shelljs**: `shelljs` is used for all shell commands in the REPL, such as `ls`, `cd`, `pwd`, etc.

---

### Installation

1. **Clone or Download** this repository to your machine.

2. **Install Dependencies**:
   In the project directory, run:

   ```bash
   npm install
   ```

3. **Make the Script Executable**:
   Add a shebang (`#!/usr/bin/env node`) at the top of the script (`nsh.js`), so it can be run as a standalone executable.

   Change the permissions to make the script executable:

   ```bash
   chmod +x /path/to/nsh.js
   ```

4. **Create a Symlink**:
   For easier access, you can create a symlink to make the script available globally:

   ```bash
   sudo ln -s /path/to/nsh.js /usr/local/bin/nsh
   ```

5. **Set `nsh` as Your Default Shell** (Optional):
   To set `nsh` as your default shell, you can update the shell in `/etc/passwd` or use the following command:

   ```bash
   chsh -s /usr/local/bin/nsh
   ```

   After doing this, you may need to restart your terminal or log out and back in for the changes to take effect.

---

### Usage

#### Starting the Interactive Shell

Once you’ve set it up, you can run `nsh` directly in your terminal:

```bash
nsh
```

This will start the interactive shell, and you'll see the prompt like this:

```
nsh:/home/username > 
```

You can execute any shell commands available via `shelljs` such as `ls`, `cd`, `pwd`, etc.

#### Running `.nsh` Scripts

You can also run `.nsh` script files using the `run` command:

```bash
nsh myscript.nsh arg1 arg2
```

This will execute `myscript.nsh` with the provided arguments. The `run` function allows you to pass arguments to your scripts, making it very flexible.

#### Plugin Support

You can extend `nsh` with additional functionality by creating plugins. Simply create JavaScript files that use `shelljs` and add them to your `nsh` shell. You can then run your custom commands from within `nsh`.

For example, you can create a custom `.nsh` script for your own functions and load it using the `run` command.

---

### How It Works

1. **REPL Environment**: The REPL starts with the current directory as the prompt. `shelljs` commands are injected into the REPL, and you can use them just like you would in a typical shell.

2. **`run` Command**: You can pass `.nsh` script files to the `run` command along with any arguments. The script will be executed in the REPL context, allowing you to interact with the shell as the script runs.

3. **History Management**: Your shell history is saved automatically to `.nsh_history` in your home directory. This means you can access previously executed commands easily.

4. **Extending the Shell**: By default, `nsh` uses `shelljs`, which offers a variety of shell commands. You can also create custom extensions or modify the behavior of `nsh` to suit your needs.

---

### Example

Here’s an example of a simple `.nsh` script that creates a file and lists the current directory contents:

#### `createFile.nsh`

```javascript
// Create File
var fs = require('fs');
var data = 'This is a created file';

// Write file
fs.writeFileSync('file.txt', data);
console.log('File is created successfully.');

// List the current directory
ls();
```

To run it:

```bash
nsh createFile.nsh
```

This will create a file named `file.txt` and list the contents of the current directory.

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

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This should give you a full understanding of how to use, extend, and set up `nsh` as your default shell. Let me know if anything is unclear or if you need further improvements!
