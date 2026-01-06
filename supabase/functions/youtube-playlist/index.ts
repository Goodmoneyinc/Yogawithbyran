interface YouTubeVideo {
  title: string;
  description: string;
  embedUrl: string;
  videoId: string;
  publishedAt: string;
  thumbnailUrl: string;
}

interface YouTubePlaylistResponse {
  items: Array<{
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        default?: {
          url: string;
        };
        medium?: {
          url: string;
        };
        high?: {
          url: string;
        };
      };
      resourceId: {
        videoId: string;
      };
    };
  }>;
  nextPageToken?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  try {
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (req.method !== "GET") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const url = new URL(req.url);
    const playlistId = url.searchParams.get("playlistId");

    if (!playlistId) {
      return new Response(
        JSON.stringify({ error: "playlistId query parameter is required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const youtubeApiKey = Deno.env.get("YOUTUBE_API_KEY");
    if (!youtubeApiKey) {
      return new Response(
        JSON.stringify({ error: "YouTube API key not configured" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    const allVideos: YouTubeVideo[] = [];
    let nextPageToken = "";
    const maxResults = 50;

    do {
      const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${youtubeApiKey}&maxResults=${maxResults}${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const errorData = await response.json();
        return new Response(
          JSON.stringify({ 
            error: "Failed to fetch playlist data", 
            details: errorData 
          }),
          {
            status: response.status,
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      }

      const data: YouTubePlaylistResponse = await response.json();

      const videos: YouTubeVideo[] = data.items
        .filter((item) => item.snippet.title !== 'Private video' && item.snippet.title !== 'Deleted video')
        .map((item) => ({
          title: item.snippet.title,
          description: item.snippet.description,
          embedUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}`,
          videoId: item.snippet.resourceId.videoId,
          publishedAt: item.snippet.publishedAt,
          thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url || '',
        }));

      allVideos.push(...videos);
      nextPageToken = data.nextPageToken || "";

    } while (nextPageToken);

    return new Response(
      JSON.stringify({
        success: true,
        count: allVideos.length,
        videos: allVideos
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error) {
    console.error("Error fetching YouTube playlist:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        message: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  }
});