const duplicateObjValueIndex = (array, item, key) => {
  const index = array.findIndex(obj => obj[key] === item[key]);

  return typeof index !== 'undefined' ? index : -1;
};

export { duplicateObjValueIndex };
