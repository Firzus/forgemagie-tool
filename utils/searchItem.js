export async function searchItem(name) {
  const queryParam = `slug.fr[$search]=${encodeURIComponent(
    name
  )}&$skip=0&lang=fr`;
  const url = `https://api.dofusdb.fr/items?${queryParam}`;

  console.log("URL de la requête:", url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la recherche:", error);
    throw error;
  }
}
