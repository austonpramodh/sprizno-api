function resolveAfter2Seconds() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Rejected"));
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
  // console.log("hello world");
}, 500);
