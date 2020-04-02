import sys
import os

cwd = os.path.abspath(os.getcwd())
sys.path.insert(1, cwd + "/commonpython")
import utils


class Solution:
    def isHappy(self, n: int) -> bool:
        visited = set([])
        done = False
        curN = n
        while not done:
            result = 0
            for char in str(curN):
                result += int(char) ** 2
            if result == 1:
                done = True
                return True
            elif result in visited:
                done = True
                return False
            else:
                visited.add(result)
            curN = result


s = Solution()
testArr = [[19], [18]]
expectedArr = [True, False]
utils.test(s.isHappy, testArr, expectedArr)
