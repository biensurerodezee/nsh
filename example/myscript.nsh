// My Script
console.log('Arguments passed to this script:');
args.forEach((arg, i) => console.log(`arg[${i}] = ${arg}`));

console.log('Directory listing:');
//console.log(ls());
console.log(ls().stdout);
