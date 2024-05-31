// Helper
function commonPrefixLength(suffix, original) {
  let length = 0;

  for (let i = 0; i < suffix.length; i += 1) {
    if (suffix[i] === original[i]) {
      length += 1;
    } else {
      break;
    }
  }

  return length;
}

// Main function
function findCommonPrefixLengths(strings) {
  if (strings?.length === 0) {
    return undefined;
  }

  return strings.map((str) => {
    let totalLength = 0;

    for (let i = 0; i <= str.length; i += 1) {
      let suffix = str.substring(i);
      totalLength += commonPrefixLength(suffix, str);
    }

    return totalLength;
  });
}
