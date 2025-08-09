
export const exerciseOptions = {
  method: 'GET',
  headers: {
  'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
}
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  let data;
  try {
    data = await response.json();
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    data = null;
  }
  console.log('RAW API response:', data);
  if (!Array.isArray(data)) {
    console.error('API response is not an array:', data);
  }
  return data;
};