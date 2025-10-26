# Trackly API — Documentación de Endpoints y Manejo de Datos

Base: `http://localhost:3000/api`
Autenticación: `Authorization: Bearer <JWT>` (Supabase). El hook global adjunta `req.user` y los endpoints protegidos derivan `usuario_id` de `req.user.id`.

## Convenciones
- Respuesta exitosa: `{ data: ... }` o `{ status: 'ok', ... }`.
- Errores: `401` (sin/expirado JWT), `400` (Zod), `404` (no encontrado), `500` (DB), `501` (Supabase no config).
- Validación: Zod asegura la forma del `body/query`. Campos como `usuario_id` nunca vienen del cliente; se derivan del JWT.
- Persistencia: Supabase (Postgres). Se usan tablas como `hotspots`, `urban_data`, `missions`, `missions_progress`, `leaderboard`, `rewards_shop`, `rewards_history`, `referrals`, `forum_posts`.
- RLS: Se recomienda habilitar políticas por `usuario_id` en Supabase; el backend no filtra explícitamente en algunos GET porque RLS aplica.

## Autenticación y Usuarios
Prefix: `/auth` (stubs de integración)
- `POST /auth/register` | `POST /auth/login` | `POST /auth/logout` | `POST /auth/refresh`: flujo gestionado normalmente por el cliente/Supabase.
- `GET /auth/profile` | `PUT /auth/profile`: stubs.

## Hotspots
Prefix: `/hotspots`
- `GET /hotspots/list` (público)
  - Query: ninguna.
  - Procesamiento: `select('*').order('fecha', { descending })`. Límite 500.
  - Respuesta: `{ data: Hotspot[] }`.
- `POST /hotspots/add` (protegido)
  - Body (Zod `HotspotSchema`): `{ lat:number, lng:number, tipo:string, fecha?:ISO }`.
  - Procesamiento: valida Zod → deriva `usuario_id` → `fecha` por defecto → `insert` en `hotspots` → `select('*')`.
- `POST /hotspots/scan` (protegido)
  - Body igual a `HotspotSchema`. Flujo idéntico a `add`.

## Datos Urbanos
Prefix: `/data`
- `POST /data/urban` (protegido)
  - Body (Zod `UrbanDataSchema`): `{ tipo:string, valor:string|number|record, zona?:string, fecha?:ISO }`.
  - Procesamiento: valida → `usuario_id` → default `fecha` → `insert` en `urban_data` → `select('*')`.
- `GET /data/urban` (protegido)
  - Query (Zod `UrbanDataQuerySchema`): `{ tipo?:string, zona?:string }`.
  - Procesamiento: arma query condicional por `tipo`/`zona` → `order('fecha', { descending })` → `limit(1000)`.
  - Nota: RLS en Supabase debe filtrar por `usuario_id`.

## Misiones
Prefix: `/missions`
- `GET /missions/list` (público)
  - Procesamiento: `select('*').eq('activa', true)`.
- `POST /missions/complete` (protegido)
  - Body (Zod `MissionCompleteSchema`): `{ mission_id:number }`.
  - Procesamiento:
    1) Lee misión `id,recompensa`.
    2) Upsert en `missions_progress` `{ usuario_id, mission_id, progreso:'completed', fecha }`.
    3) Lee `leaderboard` actual del usuario.
    4) Calcula `puntos` + recompensa y `nivel = floor(puntos/100)`.
    5) Upsert en `leaderboard` `{ usuario_id, puntos, nivel }`.
    6) Respuesta `{ status:'ok', puntos, nivel }`.
- `GET /missions/progress` (protegido)
  - Procesamiento: `select('*').eq('usuario_id', usuario_id)`.
- Stubs (públicos hoy): `POST /achievements/unlock`, `POST /streaks/update`, `GET /streaks/status`, `GET /map/progress`, `GET /map/compete`.

## Leaderboard
Prefix: `/leaderboard`
- `GET /leaderboard/global` (público)
  - Procesamiento: Top 100 por `puntos` desc.
- `GET /leaderboard/friends` (público)
  - Query (Zod `LeaderboardFriendsQuerySchema`): `ids?:string` (ej. `"1,2,3"` → `string[]`).
  - Procesamiento: sin `ids` → top 20 global; con `ids` → `in('usuario_id', ids)` ordenado por `puntos`.

## Recompensas
Prefix: `/rewards`
- `GET /rewards/shop` (público)
  - Procesamiento: catálogo `select('*').order('precio', { ascending })`.
- `POST /rewards/redeem` (protegido)
  - Body (Zod `RewardRedeemSchema`): `{ reward_id:number }`.
  - Procesamiento: valida → `{ usuario_id, reward_id, estado:'pendiente', fecha }` → `insert` en `rewards_history`.
- `GET /rewards/history` (protegido)
  - Query (`RewardsHistoryQuerySchema`): sin parámetros.
  - Procesamiento: listar histórico del usuario (RLS recomendado).

## Referidos
Prefix: `/referral`
- `POST /referral/invite` (protegido)
  - Body (Zod `ReferralInviteSchema`): `{ referido_id?:string|number }`.
  - Procesamiento: valida → `{ usuario_id, referido_id?, estado:'pendiente', fecha }` → `insert` en `referrals`.
- `GET /referral/rewards` (protegido)
  - Procesamiento: `select('*').eq('usuario_id', usuario_id).order('fecha', { descending }).limit(200)`.

## Foro
Prefix: `/forum`
- `POST /forum/posts` (protegido)
  - Body (Zod `ForumPostSchema`): `{ contenido:string }`.
  - Procesamiento: `{ usuario_id, contenido, fecha }` → `insert` en `forum_posts`.
- `POST /forum/chat/support` (público, stub) → `{ status:'ok' }`.

## Privacidad
Prefix: `/privacy`
- `GET /privacy/policy` (público) → `{ data: 'Política de privacidad (stub)' }`.
- `PUT /privacy/update` (público, stub) → `{ status:'ok' }`.
- `GET /privacy/download` (público, stub) → `{ status:'ok' }`.

## Admin (por proteger con rol)
Prefix: `/admin`
- `GET /admin/missions` | `POST /admin/missions` | `PUT /admin/missions` | `DELETE /admin/missions`.
  - Body Zod: `MissionCreateSchema` / `MissionUpdateSchema`; `DELETE` requiere `id` (query/body).
- Stubs: `events`, `users`, `rewards`, `map`, `leaderboard` (todos públicos hoy; deben requerir rol `admin`).

## WebSocket
- `socket.io` sobre el mismo servidor; evento `ping` responde `pong`.

## Esquemas Zod (resumen)
- `HotspotSchema`: `lat,lng,tipo,fecha?`.
- `UrbanDataSchema`: `tipo,valor,zona?,fecha?`.
- `UrbanDataQuerySchema`: `tipo?,zona?`.
- `MissionCreateSchema`, `MissionUpdateSchema`, `MissionCompleteSchema`.
- `LeaderboardFriendsQuerySchema`: `ids?`.
- `RewardRedeemSchema` y `RewardsHistoryQuerySchema`.
- `ReferralInviteSchema`.
- `ForumPostSchema`.

## Ejemplos
- Crear hotspot:
```bash
curl -X POST \
  -H "Authorization: Bearer $JWT" \
  -H "Content-Type: application/json" \
  -d '{"lat":-34.6,"lng":-58.4,"tipo":"reciclaje"}' \
  http://localhost:3000/api/hotspots/add
```
- Progreso de misiones:
```bash
curl -H "Authorization: Bearer $JWT" \
  http://localhost:3000/api/missions/progress
```

## Usuarios Unificados
Prefix: `/user`
- `GET /user/full-profile` (protegido)
  - Propósito: lectura integral del perfil unificado del usuario.
  - Origen de datos: `user_profile` (perfil y secciones json), `mobility_patterns` (trayectoria última), `commercial_activity` (lugares donde más gasta última semana), `sustainability` (índice último mes).
  - Respuesta (ejemplo):
    - `profile`: `{ tipo, edad, genero }`
    - `lifestyle`: `json`
    - `consumo`: `json`
    - `tecnologia`: `json`
    - `movilidad`: `{ trayectoria }`
    - `commercial_activity`: `{ lugares_donde_mas_gasta:string[] }`
    - `sustainability`: `{ indice_sostenibilidad_general:number|null }`
- `GET /user/dashboard` (protegido)
  - Propósito: resumen rápido para el panel.
  - Origen de datos: `user_profile.nickname`, `mobility_patterns` (último), `commercial_activity` (último), `sustainability` (último), `leaderboard` (puntos/nivel) y `rewards_history`/`rewards_shop` (nombres recientes).
  - Respuesta (ejemplo): `{ nombre, porcentaje_progreso, movilidad_dia, compras_semana, sustentabilidad, recompensas }`.
- `GET /user/public-view` (público)
  - Query: `userId?:string` (si se omite y hay JWT, usa `req.user.id`; si no, responde `400`).
  - Origen de datos: vista `user_public_profile` (une `user_profile` público + `leaderboard` con `ranking` + `mobility_patterns` para `movilidad_top`).
  - Respuesta (ejemplo): `{ nickname, nivel, ranking, ciudad, intereses, movilidad_top, ref }`.

Notas:
- Sólo operaciones de lectura están unificadas; cualquier actualización permanece en sus módulos específicos.
- Si se habilita RLS en Supabase, las políticas por `usuario_id` protegen la lectura de datos sensibles; la vista pública sólo expone campos no sensibles.