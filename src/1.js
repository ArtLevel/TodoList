// setTimeout(function a() {
//   console.log("t1");
// }, 1000);
//
// setTimeout(function c() {
//   console.log("t2");
// }, 500);
//
// setTimeout(function c() {
//   console.log("t3");
// }, 0);
//
// function d() {
//   console.log("d");
// }
//
// d();

// callstack, micro, animation, macro

// function a() {
//   console.log("a");
// }

// function b() {
//   console.log("b");
// }
//
// function c() {
//   console.log("c");
// }
//
// a();
//
// setTimeout(function timer() {
//   console.log("timeout");
// }, 2000);
//
// b();
// c();

// function a() {
//   console.log("a");
// }
//
// function b() {
//   console.log("b");
// }
//
// function c() {
//   console.log("c");
// }
//
// a();
//
// new Promise((res, rej) => {
//   console.log("create promise");
//   setTimeout(() => {
//     res(console.log("timeout"));
//   }, 5000);
// });
//
// b();
// c();

// a create promise b c timeout
