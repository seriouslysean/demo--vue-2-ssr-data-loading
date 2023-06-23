export function fetchItem() {
  const mockItem = {
    title: 'Mock Item',
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockItem);
    }, 1000);
  });
}
