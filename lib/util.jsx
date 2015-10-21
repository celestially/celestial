convertToArrayOfObjects= function(arr) {
  var result = []
  var keyRow = arr[0]
  arr.splice(0,1)
  arr.map( function(row) {
    var obj = {}
    keyRow.map ( function(field, i) {
      obj[field] = row[i]
    })
    result.push(obj)
  })
  return result;
}

convertToObjectOfObjects = function(arr) {
  var result = {}
  var keyRow = arr[0]
  keyRow.splice(0,1)
  var arr2 = arr;
  arr2.splice(0,1)
  arr2.map( function(row) {
    var key = row[0]
    row.splice(0,1)
    var obj = {}
    keyRow.map ( function(field, i) {
      obj[field] = row[i]
    })
    result[key] = obj;
  })
  return result;
}

replaceAll = function(str, find, replace) {
  //var find = ;
  return str.replace(new RegExp(find, 'g'), replace);
}

//const test = [
//  ['shape', 'color', 'pattern'],
//  ['square', 'green', 'dots'],
//  ['circle', 'red', 'lines'],
//]
//var res = convertToObjectOfObjects(test)
//console.log('test: ' + JSON.stringify(res));

//console.log('test replaceAll: ' + replaceAll('this. is. a. test', '\\.', ''));


var s = '/schema/:id/NewSchemaKey';
console.log('replace: ' + s.replace(':id', 'foo'));

var a = 5;
var b = 10;
console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);