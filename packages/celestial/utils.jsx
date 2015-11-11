
Celestial.updateItem = function (props, field, value) {
  const dotKey = props.dotKey ? `${props.dotKey}.${field}` : field;
  console.log(`updateItem: ${dotKey},${value},${props._id}`);
  let obj = {};
  obj[dotKey] = value;
  props.collection.update(props._id, {"$set": obj})
}

Celestial.updateItem2 = function (props, field, value, op="$set") {
  const dotKey = field ? `${props.dotKey}.${field}` : props.dotKey;
  console.log(`updateItem: ${op}, ${dotKey}, ${value}, ${props._id}`);
  let obj = {};
  obj[dotKey] = value;
  props.collection.update(props._id, {op: obj})
}

Celestial.util.convertToArrayOfObjects= function(arr) {
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

Celestial.util.convertToObjectOfObjects = function(arr) {
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

Celestial.util.replaceAll = function(str, find, replace) {
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


//var s = '/schema/:id/ConfigEditor';
//console.log('replace: ' + s.replace(':id', 'foo'));
//
//var a = 5;
//var b = 10;
//console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);