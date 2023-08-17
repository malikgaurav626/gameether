import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const idString = `(${body.similar_ids.join(",")})`;
  const queryString = `where id = ${idString};`;

  const baseUrl = "https://api.igdb.com/v4/games";
  const headers = {
    Accept: "application/json",
    "Client-ID": process.env.NEXT_PUBLIC_ID,
    Authorization: `Bearer ${body.auth_token}`,
  };
  const query = `fields age_ratings.*,aggregated_rating,aggregated_rating_count,alternative_names,artworks.*,bundles,category,checksum,collection,cover.*,created_at,dlcs,expanded_games,expansions,external_games.*,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes.*,genres.*,hypes,involved_companies.*,keywords.*,language_supports.*,multiplayer_modes.*,name,parent_game,platforms.*,player_perspectives,ports,rating,rating_count,release_dates.*,remakes,remasters,screenshots.*,similar_games.*,slug,standalone_expansions,status,storyline,summary,tags,themes.*,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos.*,websites.*; limit 10; ${queryString}`;
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: headers,
      body: query,
    });

    const data = await response.json();
    return NextResponse.json({ data: data });
  } catch (e) {
    console.error(e);
  }
  return NextResponse.json({ data: "nuh uh!!!!" });
}
