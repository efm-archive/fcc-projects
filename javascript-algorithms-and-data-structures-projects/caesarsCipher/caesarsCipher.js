function rot13(str) {
  // LBH QVQ VG!
  const results = [];
  //convert the str to an array
  const strArr = str.split('');
  //loop over each element of the array
  strArr.forEach(element => {
    //use regular Expression to check if the element is Capital Letter
    const regEx = /^[A-Z]/;
    if (regEx.test(element)) {
      //get the charCode from the element
      let code = element.charCodeAt();
      //if the charCode is greater than 64 and smaller or equal to 77 (M), then add 13, and push the resulting char onto results
      if (code > 64 && code <= 77) {
        results.push(String.fromCharCode(code + 13));
      }
      //if the charCode is bigger than 77 (M) and smaller than 91, then substract 13, and push the resulting char onto results
      if (code > 77 && code < 91) {
        results.push(String.fromCharCode(code - 13));
      }
    } else {
      results.push(element);
    }
  });
  return results.join('');
}

// Change the inputs below to test
console.log(rot13('SERR PBQR PNZC')); //should decode to FREE CODE CAMP!
console.log(rot13('SERR CVMMN!')); // should decode to FREE PIZZA!
