import { notFound } from "next/navigation"

import { users } from "@/lib/users-data"
import UserDetailContent from "./user-detail-content"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = users.find((u) => u.id === params.id)

  if (!user) {
    notFound()
  }

  return <UserDetailContent user={user} />
}
