export const parseHashFragment = (hash: string) => {
  // Remove the leading '#'
  const fragment = hash.substring(1);
  
  // Split into key-value pairs
  const pairs = fragment.split('&');
  
  // Convert to object
  const params: { [key: string]: string } = {};
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value);
  });
  
  return params;
};