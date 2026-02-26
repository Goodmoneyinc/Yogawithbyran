import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { asset_id } = await req.json();

    if (!asset_id) {
      throw new Error("asset_id is required");
    }

    const MUX_TOKEN_ID = Deno.env.get("MUX_TOKEN_ID");
    const MUX_TOKEN_SECRET = Deno.env.get("MUX_TOKEN_SECRET");

    if (!MUX_TOKEN_ID || !MUX_TOKEN_SECRET) {
      throw new Error("Mux credentials not configured");
    }

    const authHeader = btoa(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`);

    let assetReady = false;
    let attempts = 0;
    let assetData;

    while (!assetReady && attempts < 30) {
      const response = await fetch(`https://api.mux.com/video/v1/assets/${asset_id}`, {
        method: "GET",
        headers: {
          "Authorization": `Basic ${authHeader}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Mux API error: ${errorText}`);
      }

      const data = await response.json();
      assetData = data.data;

      if (assetData.status === "ready" && assetData.playback_ids && assetData.playback_ids.length > 0) {
        assetReady = true;
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
        attempts++;
      }
    }

    if (!assetReady) {
      throw new Error("Asset processing timeout");
    }

    return new Response(
      JSON.stringify(assetData),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error getting Mux asset:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
