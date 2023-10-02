import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getDiscoverOf, getTopRatedOf, getTrendingAll } from "@/service/movie";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[];
  };
};
export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new Response("Bad Request", { status: 400 });
  }

  const [type, category, genres] = slug;

  let request = getTopRatedOf;
  if (category === "top_rated") {
    request = getTopRatedOf;
  } else if (type === "trending") {
    request = getTrendingAll;
  } else if (type === "discover" && genres != null) {
    request = getDiscoverOf;
  }

  return request({ type, category, genres }) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
