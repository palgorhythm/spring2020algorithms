const { test } = require('../common/utils');

const maxProfit = (prices) => {
  if (prices.length === 0) {
    return 0;
  }
  let total = 0;
  let currentMaxProfit = 0;
  let currentBuyPrice = prices[0];
  // let currentSellPrice = 0;
  for (let i = 1; i < prices.length; i++) {
    const currentProfit = prices[i] - currentBuyPrice;
    if (currentProfit >= currentMaxProfit) {
      // change our sell price to the current price
      currentMaxProfit = currentProfit;
    } else if (currentProfit < currentMaxProfit) {
      // make the sale for the previous price (i - 1)
      total = total + currentMaxProfit;
      currentMaxProfit = 0;
      currentBuyPrice = prices[i];
    } else if (prices[i] < currentBuyPrice) {
      // change our buy price to the current price
      currentBuyPrice = prices[i];
    }
  }
  total = total + currentMaxProfit;
  return total;
};

var maxProfitFancy = function (prices) {
  // fancy leetcode solution https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/discuss/292619/JavaScript-reduce-Solution-faster-than-97.29-less-than-93.19
  // If P1 <= P2 <= P3 and these prices are consecutive, it's the same to buy P1, sell P2, buy P2, then sell P3
  // as it is to buy P1 and sell P3.
  let diff = 0;
  if (prices.length > 0) {
    // []
    prices.reduce((acc, next) => {
      if (next > acc) {
        diff += next - acc;
      }
      return next;
    });
  }
  return diff;
};

const testArr = [
  [[7, 1, 5, 3, 6, 4]],
  [[1, 2, 3, 4, 5]],
  [[7, 6, 4, 3, 1]],
  [[3, 2, 6, 5, 0, 3]],
];
const expectedArr = [7, 4, 0, 7];
const comparisonFunction = (a, b) => a === b;
test(maxProfit, comparisonFunction, testArr, expectedArr);
