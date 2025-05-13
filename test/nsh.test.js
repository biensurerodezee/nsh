import { describe, it, expect } from 'vitest';
import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'fs';
import os from 'os';

const fixture = p => path.join(__dirname, 'fixtures', p);

describe('nsh', () => {

  // version check
  it('prints version from CLI', () => {
    const out = execSync('node nsh.js --version').toString();
    expect(out).toMatch(/\d+\.\d+\.\d+/);
  });

  // arguments
  it('runs a script with args', () => {
    const output = execSync(`node nsh.js ${fixture('echoArgs.nsh')} foo bar`).toString();
    expect(output).toContain('foo');
    expect(output).toContain('bar');
  });

  // async await
  it('handles await in scripts', () => {
    const out = execSync(`node nsh.js ${fixture('asyncTest.nsh')}`).toString();
    expect(out).toContain('Async complete');
  });

  // script missing
  it('errors on missing script', () => {
    try {
      execSync(`node nsh.js ${fixture('doesNotExist.nsh')}`);
    } catch (e) {
      expect(e.stdout.toString()).toContain('File not found');
    }
  });

  // script broken
  it('shows error on invalid script', () => {
    try {
      execSync(`node nsh.js ${fixture('invalidSyntax.nsh')}`);
    } catch (e) {
      expect(e.stderr.toString()).toContain('Error');
    }
  });

  // script runtime error
  it('shows runtime error from script', () => {
    try {
      execSync(`node nsh.js ${fixture('runtimeError.nsh')}`);
    } catch (e) {
      expect(e.stderr.toString()).toContain('This is a runtime failure');
    }
  });

  // runs a script passed via CLI
  it('runs a script passed via CLI and exits cleanly', async () => {
    const out = execSync(`printf "run('${fixture('cliRunTest.nsh')}')\nexit()\n" | node nsh.js`, {encoding: 'utf8'}).toString();
    expect(out).toContain('ran from CLI');
  });

  // stripping shebang
  it('runs a script with a shebang line correctly', async () => {
    const out = execSync(`node nsh.js ${fixture('shebangScript.nsh')}`).toString();
    expect(out).toContain('ran');
  });

  // REPL start
  it('starts REPL', () => {
    const out = execSync(`echo "exit" | node nsh.js`).toString();
    expect(out).toMatch(/nsh:.*>/);
  });

  // REPL history
  it('saves and loads REPL history', () => {
    const historyPath = path.join(os.homedir(), '.nsh_history');
    
    // Empty current history file
    //if (fs.existsSync(historyPath)) fs.unlinkSync(historyPath);
    fs.writeFileSync(historyPath, '', 'utf8');

    // Run a command in the REPL and exit
    execSync(`printf "pwdl()\nexit()\n" | node nsh.js`, {encoding: 'utf8', stdio: 'inherit'});
    
    // Ensure history file was created
    const history = fs.readFileSync(historyPath, 'utf8');
    expect(history).toContain('pwdl()');
  });

  // path update on `cd`
  it('updates prompt after cd', () => {
    const out = execSync(`printf "cd('test')\nexit()\n" | node nsh.js`, {encoding: 'utf8'}).toString();
    //console.log("path update on `cd`", out);
    expect(out).toMatch(/nsh:.*test.*/);
  });

  // error on invalid `cd`
  it('prints error on invalid cd', async () => {
    try {
      execSync(`node nsh.js ${fixture('cdFailTest.nsh')}`, {encoding: 'utf8'})
    } catch (e) {
      //console.log("prints error on invalid `cd`", e.stderr.toString());
      expect(e.stderr.toString()).toContain('This is a runtime failure');
      //expect(e.err).toMatch(/cd: .+/);
    }
  });

});

