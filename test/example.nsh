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
