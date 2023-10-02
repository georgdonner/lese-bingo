export const shuffle = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; 
  } 
  return newArray; 
};

export const colors = [
  '#fcc8c0',
  '#e0ecff',
  '#efe1fa',
  '#f7fae1',
  '#edfae1',
  '#e0ffe2',
  '#f9fcf7',
  '#faf3e8',
  '#f1edf5',
  '#e0fffa',
  '#d7f2fc',
  '#dce9fa',
  '#dce1fa',
  '#e8dcfa',
  '#f1dcfa',
  '#fadcf9',
  '#fce6f2',
  '#fad9dd',
  '#ffebeb',
];
