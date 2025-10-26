export async function apiGet(path: string, accessToken: string) {
  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GET ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function apiPost(path: string, body: unknown, accessToken: string) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body ?? {}),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`POST ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function apiGetPublic(path: string) {
  const res = await fetch(path, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`GET ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}

export async function apiPostPublic(path: string, body: unknown) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body ?? {}),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`POST ${path} failed: ${res.status} ${text}`)
  }
  return res.json()
}