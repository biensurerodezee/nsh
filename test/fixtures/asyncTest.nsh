// test/fixtures/asyncTest.nsh
console.log('Async complete');
await new Promise(r => setTimeout(r, 10));
