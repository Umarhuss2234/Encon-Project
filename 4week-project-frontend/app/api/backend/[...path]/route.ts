type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

async function forwardRequest(
  request: Request,
  context: RouteContext
) {
  try {
    const API_BASE_URL =
      process.env.API_BASE_URL;

    const API_KEY =
      process.env.API_KEY;

    if (!API_BASE_URL) {
      return Response.json(
        {
          message:
            "API_BASE_URL is not configured",
        },
        {
          status: 500,
        }
      );
    }

    if (!API_KEY) {
      return Response.json(
        {
          message:
            "API_KEY is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const { path } =
      await context.params;

    const incomingUrl =
      new URL(request.url);

    const backendUrl =
      `${API_BASE_URL}/${path.join("/")}` +
      incomingUrl.search;

    const headers: HeadersInit = {
      "x-api-key": API_KEY,
    };

    let body:
      | string
      | undefined;

    if (
      request.method === "POST" ||
      request.method === "PATCH"
    ) {
      headers["Content-Type"] =
        "application/json";

      body =
        await request.text();
    }

    const response =
      await fetch(
        backendUrl,
        {
          method: request.method,
          headers,
          body,
          cache: "no-store",
        }
      );

    // DELETE may successfully return
    // 204 No Content.
    // A 204 response must not contain a body.
    if (response.status === 204) {
      return new Response(
        null,
        {
          status: 204,
        }
      );
    }

    const responseBody =
      await response.text();

    return new Response(
      responseBody,
      {
        status:
          response.status,

        headers: {
          "Content-Type":
            response.headers.get(
              "Content-Type"
            ) ??
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Backend proxy error:",
      error
    );

    return Response.json(
      {
        message:
          "The frontend server could not communicate with the backend.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  return forwardRequest(
    request,
    context
  );
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  return forwardRequest(
    request,
    context
  );
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  return forwardRequest(
    request,
    context
  );
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  return forwardRequest(
    request,
    context
  );
}