import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  const url = `https://bing-news-search1.p.rapidapi.com/news/search?q=${body.query}&count=50&offset=${body.offset}&originalImg=true&freshness=Day&textFormat=Raw&safeSearch=Off`;
  const options = {
    method: "GET",
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);

    const data = await response.json();

    return NextResponse.json({ data: data });
  } catch (e) {
    console.error(e);
  }
  return NextResponse.json({ data: "nuh uh!!!!" });
}
