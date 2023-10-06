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

// setTimeout(() => {
//   console.log(1);
// });
//
// new Promise((resolve, reject) => {
//   console.log(2);
//   resolve();
// }).then(() => {
//   console.log(3);
// });
//
// console.log(4);

// -------------------------------------------------

// setTimeout(() => {
//   console.log("s1");
// }, 0);
//
// setTimeout(() => {
//   console.log("s2");
// }, 1000);
//
// new Promise((res, rej) => {
//   console.log("p1");
//   res();
//   console.log("p2");
// }).then(() => {
//   console.log("p3");
// });
//
// console.log("w1");
//
// async function test1() {
//   console.log("a1");
//   await test2();
//   console.log("a2");
// }
//
// async function test2() {
//   console.log("a3");
// }
//
// test1();
//
// console.log("w2");

// console.log(1);
//
// setTimeout(() => {
//   console.log(2);
//   Promise.resolve().then(() => {
//     console.log(3);
//   });
// });
//
// new Promise((res, rej) => {
//   console.log(4);
//   res(5);
// }).then((data) => {
//   console.log(data);
//   Promise.resolve()
//     .then(() => {
//       console.log(6);
//     })
//     .then(() => {
//       console.log(7);
//
//       setTimeout(() => {
//         console.log(8);
//       }, 0);
//     });
// });
//
// setTimeout(() => {
//   console.log(9);
// });
//
// console.log(10);

// 1 4 10
