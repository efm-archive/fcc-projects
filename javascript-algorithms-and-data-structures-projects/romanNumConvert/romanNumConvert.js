// M.O.: start check if 1000 fits in 3999, if true substract the 1000 and store "M",
// then loop through the Array again and check if 1000 can be substracted again,
// if true "print" another "M", repeat until it cannot be substracted again,
// then move to next unique number/letter combo (900) in the array and check again

function convertToRoman(num) {
  // Return error if num is not a positive & integer number
  if (isNaN(num) || num < 1) {
    return 'Not a positive integer Number!';
  }
  // Object: Roman letters and number equivalents
  const letters = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let count = num;
  const roman = [];
  // Run as long as count is greater than 0
  for (let i = count; i > 0; ) {
    // Loop through the letters and check if one fits in the given num
    for (const key in letters) {
      const element = letters[key];
      //if count minus the current value is greater or equal to 0
      if (count - element >= 0) {
        //then push the key onto the "roman" array
        roman.push(key);
        //and substract the value from count
        count = count - element;
        //exit the loop
        break;
      }
      //reset i to equal the count
      i = count;
    }
  }
  //convert roman array to string and return it
  return roman.join('');
}

console.log(convertToRoman(29)); //should return "XXIX"
console.log(convertToRoman(36)); //should return "XXXVI"
console.log(convertToRoman(649)); //should return "DCXLIX"
console.log(convertToRoman(1004)); //should return "MIV"
console.log(convertToRoman(3999)); //should return "MMMCMXCIX"
