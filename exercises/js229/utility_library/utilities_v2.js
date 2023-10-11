function _(underArg) {
  return {
    first: () => underArg[0],

    last: () => underArg[underArg.length - 1],

    without: (...vals) => underArg.filter(elem => !vals.includes(elem)),

    lastIndexOf: (val) => underArg.length - 1 - underArg.slice().reverse().indexOf(val),

    sample(num) {
      if (num === undefined) return underArg[Math.floor(Math.random() * underArg.length)];

      let results = []
      let arrSlice = underArg.slice();

      while (num > 0) {
        results.push(arrSlice.splice(Math.floor(Math.random() * arrSlice.length), 1));
        num -= 1;
      }

      return results;
    },

    findWhere: (obj) => _(underArg).where(obj)[0],

    where(obj) {
      let filteredArr = underArg.slice();

      Object.keys(obj).forEach(key => {
        filteredArr = filteredArr.filter(elem => elem[key] === obj[key])
      });

      return filteredArr;
    },

    pluck: (key) => underArg.map(obj => obj[key]).filter(elem => elem !== undefined),

    keys: () => Object.keys(underArg),

    values: () => Object.values(underArg),

    pick(...keys) {
      let resultObj = {};
      keys.forEach(key => {
        if (Object.keys(underArg).includes(key)) resultObj[key] = underArg[key];
      });

      return resultObj;
    },

    omit(...keys) {
      let resultObj = Object.assign({}, underArg);
      keys.forEach(key => delete resultObj[key]);

      return resultObj;
    },

    has: (key) => Object.keys(underArg).includes(key),

    isElement:  () => underArg && underArg.nodeType === 1,
    isArray:    () => Array.isArray(underArg),
    isFunction: () => typeof underArg === 'function',
    isString:   () => typeof underArg === 'string'  || underArg.constructor === String,
    isNumber:   () => typeof underArg === 'number'  || underArg.constructor === Number,
    isBoolean:  () => typeof underArg === 'boolean' || underArg.constructor === Boolean,
    isObject() {
      return (typeof underArg === 'object' || typeof underArg === 'function') &&
             underArg !== null;
    },

  };
}

_.range = function(start, end) {
  if (end === undefined) [ start, end ] = [ 0, start ];

  let results = [];
  for (let i = start; i < end; i += 1) {
    results.push(i);
  }

  return results;
}

_.extend = function(...objs) {
  // return Object.assign(...objs);
  let resultObj = objs[0];
  objs.slice(1).reverse().forEach(obj => {
    Object.keys(obj).forEach(key => resultObj[key] = obj[key]);
  });

  return resultObj;
}

_.isElement  = (arg) => arg && arg.nodeType === 1;
_.isArray    = (arg) => Array.isArray(arg);
_.isFunction = (arg) => typeof arg === 'function';
_.isString   = (arg) => typeof arg === 'string'  || arg.constructor === String;
_.isNumber   = (arg) => typeof arg === 'number'  || arg.constructor === Number;
_.isBoolean  = (arg) => typeof arg === 'boolean' || arg.constructor === Boolean;
_.isObject   = function(arg) {
  return (typeof arg === 'object' || typeof arg === 'function') && arg !== null;
}

window._ = _;