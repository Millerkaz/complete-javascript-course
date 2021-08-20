export async function getJSON(url) {
  try {
    const req = await fetch(url);

    const data = await req.json();

    if (req.status === 400) {
      throw new Error(`This recipe doesn't exist ! (${req.status})`);
    }

    if (req.status >= 300 || req.status < 200) {
      throw new Error(`${data.message} (${req.status})`);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

export async function postJSON(url, userRecipe) {
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRecipe),
    });

    const data = await req.json();

    if (req.status >= 300 || req.status < 200) {
      throw new Error(`${data.message} (${req.status})`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}
