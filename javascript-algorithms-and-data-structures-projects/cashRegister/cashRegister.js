//Set the Currency Unit values
const values = {
  'ONE HUNDRED': 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01,
};

//function that returns the available funds for the selected "key"
const getFunds = (cid, key) => {
  //return the fund value -> ([0][1]) from the item that matches the key
  return cid.filter(item => {
    return item[0] === key;
  })[0][1];
};
//function that returns the total funds in the cid array
const getTotalFunds = arr => {
  let total = 0;
  //go over each item and add their values
  arr.forEach(item => {
    total = total + item[1];
  });
  return total.toFixed(2);
};

//function that updates the change in the CID array, then call the updateChangeArr function to update the changeArr
const updateChangeCID = (cid, key, value, changeArr) => {
  //get the corresponding item to update
  let item = cid.filter(item => {
    return item[0] === key;
  })[0];
  //substract the value from the item in the cid Array
  item[1] = Number((item[1] - value).toFixed(2));
};
//function that updates the changeArr
const updateChangeArr = (changeArr, key, value) => {
  //check if the item already exists
  let item = changeArr.filter((item, index) => {
    return item[0] === key;
  })[0];
  //if the item exists, add its new value to the current value
  if (item) {
    item[1] = Number((item[1] + value).toFixed(2));
  }
  //if the item doesn't exist, push it to the array
  else {
    changeArr.push([key, value]);
  }
};

//function the set the status to CLOSED if there are no funds left in the CID array
const closeCashier = (cid, changeArr) => {
  //loop over the changeArr
  changeArr.forEach(item => {
    //if the value exists in the CID array
    let element = cid.filter(ele => {
      return ele[0] === item[0];
    })[0];
    //overwrite the value in the CID array with the value from the changeArr array
    element[1] = item[1];
  });
  //reset the changeArr array
  changeArr.length = 0;
  //and replace with the values from the updated CID array
  cid.forEach(item => {
    changeArr.push(item);
  });
  //return the updated changeArr with included empty value Currency Units
  return changeArr.reverse();
};

function checkCashRegister(price, cash, cid) {
  //get the total amount of change
  let rest = (cash - price).toFixed(2);
  //initialize variables
  const change = { status: 'OPEN', change: [] };
  const changeArr = [];
  cid.reverse();

  //loop over the values
  for (const key in values) {
    const val = values[key];
    //while the rest is greater than 0
    for (let i = rest; i > 0; ) {
      //while the rest - val is greater than 0 and there are still funds in the CID array for the current Currency Unit
      while ((rest - val).toFixed(2) >= 0 && getFunds(cid, key) >= val) {
        //substract the current value from the rest
        rest -= val.toFixed(2);
        //and update the CID and changeArr arrays
        updateChangeCID(cid, key, val);
        updateChangeArr(changeArr, key, val);
      }
      i = rest;
      break;
    }
  }

  // Here is your change, ma'am.

  //if the total funds of the cid array are equal to 0, change the status to CLOSED and call the closeCashier function
  if (getTotalFunds(cid) == 0) {
    change.status = 'CLOSED';
    closeCashier(cid, changeArr);
  }
  //if the total funds of the cid array smaller than 0, or if the total funds of the changeArr array smaller than the rest, change status to INSUFFICIENT_FUNDS and reset the changeArr array
  if (getTotalFunds(cid) < 0 || getTotalFunds(changeArr) < rest) {
    change.status = 'INSUFFICIENT_FUNDS';
    change.change.length = 0;
  }
  //else update the change.change array
  else {
    change.change = changeArr;
  }
  //return the change array
  return change;
}

console.log(
  checkCashRegister(19.45, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
);

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
); // should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

console.log(
  checkCashRegister(3.26, 100, [
    ['PENNY', 1.01],
    ['NICKEL', 2.05],
    ['DIME', 3.1],
    ['QUARTER', 4.25],
    ['ONE', 90],
    ['FIVE', 55],
    ['TEN', 20],
    ['TWENTY', 60],
    ['ONE HUNDRED', 100],
  ])
); //should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
); // should return {status: "INSUFFICIENT_FUNDS", change: []}

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.01],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 1],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
); // should return {status: "INSUFFICIENT_FUNDS", change: []}

console.log(
  checkCashRegister(19.5, 20, [
    ['PENNY', 0.5],
    ['NICKEL', 0],
    ['DIME', 0],
    ['QUARTER', 0],
    ['ONE', 0],
    ['FIVE', 0],
    ['TEN', 0],
    ['TWENTY', 0],
    ['ONE HUNDRED', 0],
  ])
); // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
