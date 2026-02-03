console.log("Start");

async function asyncFunction() {
  console.log("Inside async function");

  await Promise.resolve();
  console.log("After await");
}

asyncFunction();

setTimeout(() => {
  console.log("Timeout");
}, 0);

console.log("End");


// //start
// inside async function
// after await
// end
// timeOut
