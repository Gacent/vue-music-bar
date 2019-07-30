const util = {
  isArray(val) {
    return Object.prototype.toString.call(val) === '[object Array]';
  },
  isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  }
}

export default  {
  setItem(key, val) {
    let value = val;
    if (util.isObject(val) || util.isArray(val)) {
      value = JSON.stringify(val);
    }
    localStorage.setItem(key, value);
  },
  getItem(key, def = null) {
    let val = localStorage.getItem(key);
    if (val) {
      try {
        return JSON.parse(val)
      } catch (err) {
        return val || def;
      }
    } else {
      return def;
    }
  }
}
