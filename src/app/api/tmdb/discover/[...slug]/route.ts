import { getServerSession } from "next-auth";
import { getDiscoverOf } from "@/service/movie";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

  const [category, genre] = slug;
  console.log(`type:${category} genre:${genre}`);

  return getDiscoverOf({ category, genre }) //
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
