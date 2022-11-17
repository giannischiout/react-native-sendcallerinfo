export const sortArray = (array) => {
  let sorted = array.sort((a, b) => (a.TRDR > b.TRDR) ? 1 : (a.TRDR < b.TRDR) ? -1 : 0);
  return sorted;
}