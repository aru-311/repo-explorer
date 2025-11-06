export const saveToLocalStorage = (key, value) => {
  try {
    // Extract only IDs if the value is an array of objects
    const idsOnly = Array.isArray(value)
      ? value.map((item) => (typeof item === "object" ? item.id : item))
      : value;
    localStorage.setItem(key, JSON.stringify(idsOnly));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};


export const loadFromLocalStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};
