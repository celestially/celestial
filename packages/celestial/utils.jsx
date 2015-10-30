
celestial.updateItem = function (props, field, value) {
  const dotKey = `${props.dotKey}.${field}`;
  console.log(`updateItem: ${dotKey},${value},${props._id}`);
  let obj = {};
  obj[dotKey] = value;
  props.collection.update(props._id, {"$set": obj})
}