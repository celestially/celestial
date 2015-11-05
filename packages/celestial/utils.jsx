
celestial.updateItem = function (props, field, value) {
  const dotKey = props.dotKey ? `${props.dotKey}.${field}` : field;
  console.log(`updateItem: ${dotKey},${value},${props._id}`);
  let obj = {};
  obj[dotKey] = value;
  props.collection.update(props._id, {"$set": obj})
}

celestial.updateItem2 = function (props, field, value, op="$set") {
  const dotKey = field ? `${props.dotKey}.${field}` : props.dotKey;
  console.log(`updateItem: ${op}, ${dotKey}, ${value}, ${props._id}`);
  let obj = {};
  obj[dotKey] = value;
  props.collection.update(props._id, {op: obj})
}