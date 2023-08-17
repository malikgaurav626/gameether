import { setAuthToken } from "./store";

async function getgames(auth_token, offset) {
  try {
    const response = await fetch("api/getgames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth_token, offset }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getsimilarGames(auth_token, similar_ids) {
  try {
    const response = await fetch("api/getsimilargames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth_token, similar_ids }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
async function getSearch(auth_token, query) {
  try {
    const response = await fetch("api/getsearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ auth_token, query }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

async function getAuthToken(dispatch) {
  const queryParams = new URLSearchParams();
  queryParams.append("client_id", process.env.NEXT_PUBLIC_ID);
  queryParams.append("client_secret", process.env.NEXT_PUBLIC_SECRET);
  queryParams.append("grant_type", "client_credentials");
  const options = {
    method: "POST",
  };
  try {
    const res = await fetch(
      `https://id.twitch.tv/oauth2/token?${queryParams}`,
      options
    );
    const data = await res.json();
    dispatch(setAuthToken(data));
  } catch (err) {
    console.error(err);
  }
}

async function getGamingNews(query, offset) {
  try {
    const response = await fetch("api/getnews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, offset }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export { getAuthToken, getgames, getsimilarGames, getSearch, getGamingNews };
