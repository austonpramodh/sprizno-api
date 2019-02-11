function resolveAfter2Seconds() {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject(new Error("Rejected"));
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  // console.log("calling");
  const result = await resolveAfter2Seconds().catch(err => err);
  // eslint-disable-next-line no-console
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
setInterval(() => {
  // eslint-disable-next-line no-console
  console.log("hello world");
}, 500);
