const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Rejected"));
    // resolve("everything worked");
  }, 3000);
});

promise
  .then((result) => {
    // console.log("RESOLVE");
    // eslint-disable-next-line no-console
    console.log(result);
  })
  .catch((err) => {
    // console.log("REJECT");
    // eslint-disable-next-line no-console
    console.log(err);
  });

setInterval(() => {
  // console.log("hello world");
}, 1000);
