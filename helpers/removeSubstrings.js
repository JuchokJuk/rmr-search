function removeSubstrings(originalStrings) {
  let strings = [...originalStrings];
  strings.forEach((element, index) => {
    strings[index] = { value: element, duplicate: false };
  });

  for (let i = 0; i < strings.length; i++) {
    for (let j = 0; j < strings.length; j++) {
      if (
        strings[i].value.includes(strings[j].value) &&
        strings[i].value !== strings[j].value
      ) {
        strings[j].duplicate = true;
      }
    }
  }

  let fillteresStrings = [];
  for (let i = 0; i < strings.length; i++) {
    if (!strings[i].duplicate) {
      fillteresStrings.push(strings[i].value);
    }
  }

  return [...new Set(fillteresStrings)];
}
export default removeSubstrings;
