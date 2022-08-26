// randomInt 函数返回一个大于等于 min，小于 max 的随机整数
export function randomInt(min, max) {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
}

// 随机选出数组中的一个元素(有可能上一次和本次选取的是同一个句子)
// export function randomPick(arr) {
//   const index = randomInt(0, arr.length);
//   return arr[index];
// }

// export function randomPick(arr) {
//   const len = arr.length - 1;
//   const index = randomInt(0, len);
//   [arr[index], arr[len]] = [arr[len], arr[index]];
//   return arr[index];
// }

export function createRandomPicker(arr) {
  arr = [...arr]; // copy 数组，以免修改原始数据
  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]];
    return picked;
  }
  randomPick(); // 抛弃第一次选择结果
  return randomPick;
}