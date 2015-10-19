function convertArrayofArraysToArrayOfObjects(arr) {
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

convertArrayofArraysToObjectOfObjects = function(arr) {
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

const test = [
  ['shape', 'color', 'pattern'],
  ['square', 'green', 'dots'],
  ['circle', 'red', 'lines'],
]
var res = convertArrayofArraysToObjectOfObjects(test)
console.log('test: ' + JSON.stringify(res));