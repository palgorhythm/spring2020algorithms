// The question: given a song lyric, can we spell a word this way?
// e.g. can_spell("boom", "be everybody's looking for something") -> True
// Each word can match at most one letter (because the word must be presented vertically).
// Letter matches must be in order.
// Assume lyrics are separated by whitespace.

// n = length of second input string.
// O(n) runtime complexity
// O(n) space complexity
// convert second input into list, split on whitespace.
// iterate through characters of first input, and at each iteration, look at the corresponding
// word in the list and check is the current character is in that list.
// i = 0, b, search through “everybody’s” to find a b

const canSpell = (target, words) => {
  if (target === '') {
    return true;
  } else if (words === '') {
    return false;
  }
  let targetIndex = 0;
  const wordList = words.split('');
  for (let i = 0; i < wordList.length; i++) {
    const curTargetChar = target[targetIndex];
    const curWord = wordList[i];
    for (let j = 0; j < curWord.length; j++) {
      if (curWord[j] === curTargetChar) {
        targetIndex++;
        break;
      }
    }
    if (targetIndex === target.length) {
      return true;
    }
  }
  return false;
};
console.log(
  canSpell('boom', "be everybody's looking for something nice"),
  true
);
console.log(canSpell('boom', 'buy one get one'), false);
console.log(canSpell('', 'buy one get one'), true);
console.log(canSpell('boom', ''), false);
