from typing import List
import sys
import os

cwd = os.path.abspath(os.getcwd())
sys.path.insert(1, cwd + "/commonpython")
import utils


class Solution:
    def computeArea(self, a, b, heightA, heightB):
        return (b - a) * min(heightA, heightB)

    def maxArea(self, heights: List[int]) -> int:
        leftIndex = 0
        rightIndex = len(heights) - 1
        mostWater = self.computeArea(
            leftIndex, rightIndex, heights[leftIndex], heights[rightIndex]
        )
        while leftIndex < rightIndex:
            curArea = self.computeArea(
                leftIndex, rightIndex, heights[leftIndex], heights[rightIndex]
            )
            if curArea > mostWater:
                mostWater = curArea
            if heights[leftIndex] < heights[rightIndex]:
                leftIndex += 1
            else:
                rightIndex -= 1
        return mostWater


testArr = [
    [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
    [[1, 2, 1]],
    [[1, 3, 2, 5, 25, 24, 5]],
    [[2, 3, 10, 5, 7, 8, 9]],
]
expectedArr = [49, 2, 24, 36]

Solution = Solution()
utils.test(Solution.maxArea, testArr, expectedArr)
