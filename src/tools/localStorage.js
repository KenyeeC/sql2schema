export default {
  get(key) {
    const data = window.localStorage.getItem(key);
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  },
  set(key, value) {
    let data = null;
    try {
      data = JSON.stringify(value);
    } catch (e) {
      data = value;
    }
    window.localStorage.setItem(key, data);
  },
  del(key) {
    window.localStorage.removeItem(key);
  }
};
