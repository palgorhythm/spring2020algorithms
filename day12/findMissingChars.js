// we'll assume that all inputs are lowercase alpha.
// later we can implement the trivial validation for other inputs, edge cases.
// assume no duplicates for now.
const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const a = {};
for (let i = 0; i < alphabet.length; i++) {
  const letter = alphabet[i];
  a[letter] = i;
  a[i] = letter;
}

const findMissingParts = (s) => {
  let missing = '';
  let expected = 'a';
  for (let i = 0; i < s.length; i++) {
    if (expected !== s[i]) {
      const eIndex = a[expected]; // index of a, which is 0
      const curIndex = a[s[i]]; // index of c, which is 2
      for (let j = eIndex; j < curIndex; j++) {
        // is eIndex always actually less than curIndex???
        missing += a[j];
      }
    }
    expected = a[parseInt(a[s[i]]) + 1]; // expected is the next letter in the alpha after current
  }
  return missing === '' ? null : missing;
};
console.log(findMissingParts('abde'), 'c');
console.log(findMissingParts('abcdefgijk'), 'h');
console.log(findMissingParts('abcdef'), null);
console.log(findMissingParts('acdefghijklmnoqrsuv'), 'bpt');
console.log(findMissingParts('c'), 'ab');

// one for loop approach
// look at s[s.length - 1], and find its index in our alphabet.
// if it's v, then it's 21.
// for loop will go from 0 to 21 (inclusive)
// az
