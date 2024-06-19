export const handleGetLocalStorage = (key) => {
  const localString = localStorage.getItem(key);
  return localString ? JSON.parse(localString) : null;
};

export const saveLocalStorage = (key, value) => {
  var stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
};

export const getLocalStorage = (key) => {
  const localString = localStorage.getItem(key);
  return localString ? JSON.parse(localString) : null;
};
