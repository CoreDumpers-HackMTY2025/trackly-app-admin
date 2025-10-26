import { notFound } from "next/navigation"

import { users } from "@/lib/users-data"
import UserDetailContent from "./user-detail-content"

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = users.find((u) => u.id === id)

  if (!user) {
    notFound()
  }

  return <UserDetailContent user={user} />
}
