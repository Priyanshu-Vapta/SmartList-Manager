export const fetchLists = async () => {
  const res = await fetch('https://apis.ccbp.in/list-creation/lists');
  if (!res.ok) throw new Error('Failed to fetch lists');

  const data = await res.json();
  const result = {};

  data.lists.forEach((item) => {
    const listId = item.list_number.toString();

    if (!result[listId]) {
      result[listId] = [];
    }

    result[listId].push({
      id: item.id,
      name: item.name,
      scientificName: item.description,
    });
  });

  return result;
};
