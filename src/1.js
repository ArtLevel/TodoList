setTimeout(function a() {
  console.log("t1");
}, 1000);

setTimeout(function c() {
  console.log("t2");
}, 500);

setTimeout(function c() {
  console.log("t3");
}, 0);

function d() {
  console.log("d");
}

d();

// callstack, micro, animation, macro
