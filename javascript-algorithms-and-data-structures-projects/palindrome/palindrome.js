checkForPalindrome = text => {
  text = text.toLowerCase().replace(/[^a-z0-9]/g, ''); //convert to LowerCase. Replace all non-alphanumeric characters with "".
  let revText = text
    .split('')
    .reverse()
    .join(''); //split() text into an array, reverse() it, then join() back into a string.

  if (text === revText) {
    //return true if original text is equal to the reversed text
    //console.log(text + ' is a palindrome')
    return true;
  }
  //console.log(text + ' is not a palindrome')
  return false; //else return false
};

checkForPalindrome('race car');
checkForPalindrome('not a palindrome');
checkForPalindrome('0_0 (: /- :) 0-0');
checkForPalindrome('five|_/|four');
