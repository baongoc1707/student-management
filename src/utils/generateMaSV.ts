export function generateCounter() {
  let counter = 0;

  return function () {
    counter++;
  };
}
