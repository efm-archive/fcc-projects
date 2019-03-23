//get/extract all digits from the given string
function digits(str) {
  return str.replace(/[^0-9]+/g, '');
}
//check if string start with one
function startsWithOne(str) {
  return /^1/.test(str);
}
//check if the string has the correct format
function checkFormat(str) {
  if (
    /^[(][0-9]{3}[)]{1}[0-9]{3}[- ]{1}[0-9]{4}/.test(str) ||
    /^[(][0-9]{3}[) ]{2}[0-9]{3}[- ]{1}[0-9]{4}/.test(str) ||
    /^[0-9]{3}[- ]{1}[0-9]{3}[- ]{1}[0-9]{4}/.test(str) ||
    /^[0-9]{3}[0-9]{3}[0-9]{4}/.test(str)
  ) {
    return true;
  } else {
    return false;
  }
}

function telephoneCheck(str) {
  //create new String variable to modify values
  let newStr = str;
  //check if the sum of all digits is 10 || or 11 and starts with 1, return false if it doesn't meet the criteria
  if (
    digits(str).length === 10 ||
    (digits(str).length === 11 && startsWithOne(str))
  ) {
    if (startsWithOne(str)) {
      //if it starts with one, replace the leading 1 and trim the whitespace
      newStr = str.replace(/^1/, '').trim();
    }
    //if it matches the correct patterns, return true, else return false
    if (checkFormat(newStr)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

console.log(telephoneCheck('555-555-5555')); // should return a boolean.
console.log(telephoneCheck('1 555-555-5555')); // should return true.
console.log(telephoneCheck('1 (555) 555-5555')); // should return true.
console.log(telephoneCheck('5555555555')); // should return true.
console.log(telephoneCheck('555-555-5555')); // should return true.
console.log(telephoneCheck('(555)555-5555')); // should return true.
console.log(telephoneCheck('1(555)555-5555')); // should return true.
console.log(telephoneCheck('1 555 555 5555')); // should return true.
console.log(telephoneCheck('1 456 789 4444')); // should return true.
//console.log(telephoneCheck('555-5555')); // should return false.
//console.log(telephoneCheck('5555555')); // should return false.
console.log(telephoneCheck('1 555)555-5555')); // should return false.
console.log(telephoneCheck('123**&!!asdf#')); // should return false.
console.log(telephoneCheck('55555555')); // should return false.
console.log(telephoneCheck('(6054756961)')); // should return false
console.log(telephoneCheck('2 (757) 622-7382')); // should return false.
// console.log(telephoneCheck('0 (757) 622-7382')); // should return false.
// console.log(telephoneCheck('-1 (757) 622-7382')); // should return false
// console.log(telephoneCheck('2 757 622-7382')); // should return false.
// console.log(telephoneCheck('10 (757) 622-7382')); // should return false.
// console.log(telephoneCheck('27576227382')); // should return false.
// console.log(telephoneCheck('(275)76227382')); // should return false.
// console.log(telephoneCheck('2(757)6227382')); // should return false.
// console.log(telephoneCheck('2(757)622-7382')); // should return false.
// console.log(telephoneCheck('555)-555-5555')); // should return false.
console.log(telephoneCheck('(555-555-5555')); // should return false.
// console.log(telephoneCheck('(555)5(55?)-5555')); // should return false.
