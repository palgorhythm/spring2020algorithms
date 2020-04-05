import sys
import os
from typing import List

cwd = os.path.abspath(os.getcwd())
sys.path.insert(1, cwd + "/commonpython")
import utils  # pylint: disable=fixme, line-too-long, import-error


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        if len(prices) == 0:
            return 0
        buyPrice = prices[0]
        profit = 0
        for curPrice in prices:
            curProfit = curPrice - buyPrice
            if curProfit > profit:
                profit = curProfit
            if curPrice < buyPrice:
                buyPrice = curPrice
        return profit


s = Solution()
testArr = [[[7, 1, 5, 3, 6, 4]]]
expectedArr = [5]
utils.test(s.maxProfit, testArr, expectedArr)
