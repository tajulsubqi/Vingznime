import prisma from "@/lib/prisma"

export async function POST(request) {
  const { anime_mal_id, user_email } = await request.json()
  const data = { anime_mal_id, user_email }

  const createCollection = await prisma.collection.create({ data })

  if (!createCollection)
    return Response.json({ error: "Failed to create collection" }, { status: 500 })
  else {
    return Response.json({ success: "Collection created" }, { status: 200 })
  }
}
