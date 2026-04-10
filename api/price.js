export async function POST(req) {
  try {
    const { name } = await req.json();

    const tokenRes = await fetch(
      "https://api.ebay.com/identity/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.EBAY_CLIENT_ID +
                ":" +
                process.env.EBAY_CLIENT_SECRET
            ).toString("base64"),
        },
        body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
      }
    );

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const searchRes = await fetch(
      `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(
        name
      )}&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const searchData = await searchRes.json();

    const prices =
      searchData.itemSummaries?.map((item) =>
        Number(item.price.value)
      ) || [];

    if (prices.length === 0) {
      return new Response(JSON.stringify({ price: "N/A" }));
    }

    const avg =
      prices.reduce((a, b) => a + b, 0) / prices.length;

    return new Response(
      JSON.stringify({ price: `$${Math.round(avg)}` }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.error("EBAY ERROR:", err);

    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500 }
    );
  }
}