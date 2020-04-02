x = 10


def test(f, testArr, expectedArr):
    if len(testArr) != len(expectedArr):
        print("arrays are not the same size!!!")
        return
    print("---------------Running Tests---------------")
    for i in range(len(testArr)):
        result = f(*testArr[i])
        expected = expectedArr[i]
        emoji = "✅" if result == expected else "❌"
        print(
            emoji,
            "[Test %s]" % (i),
            "Expected: %s" % (expected),
            "Actual: %s" % (result),
            "result",
            emoji,
        )
