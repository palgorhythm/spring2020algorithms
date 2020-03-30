class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def rangeSumBST(self, root: TreeNode, L: int, R: int) -> int:
      # Handle base case, when root is None and recursion bottoms out
      if root is None:
          return 0
      # Handle valid node
      else:
        # Check if value is within bounds
        if L <= root.val <= R:
          return root.val + self.rangeSumBST(root.left, L, R) + self.rangeSumBST(root.right, L, R)
        else: # root value is NOT within bounds
          # Check bounds to determine which recursive calls not to call 
          leftCall = 0
          rightCall = 0
          if root.val < L: # if it's under bounds, don't recurse left
            rightCall = self.rangeSumBST(root.right, L, R)
          elif root.val > R: # if it's over bounds, don't recurse right.
            leftCall = self.rangeSumBST(root.left, L, R)
          return 0 + rightCall + leftCall



sol = Solution()
node = TreeNode(10)
node.left = TreeNode(5)
node.right = TreeNode(15)
node.left.left = TreeNode(3)
node.left.right = TreeNode(7)
node.right.right = TreeNode(18)

print(sol.rangeSumBST(node,7,15)) # returns 32