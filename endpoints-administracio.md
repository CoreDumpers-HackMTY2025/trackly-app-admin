1. Patrones de movilidad
Endpoints
GET /api/mobility-patterns/{userId}
Obtiene los patrones de movilidad del usuario.

Response (JSON):

json
{
  "userId": "francis_001",
  "trayectoria": "Casa → Trabajo → Gimnasio → Casa",
  "lugares_donde_pasa_mas_tiempo": ["Casa", "Trabajo", "Gimnasio"],
  "lugares_que_visita_frecuentemente": ["Supermercado", "Parque", "Centro comercial"],
  "horas_en_lugares_frecuentes": {
    "casa": "20:00 - 07:00",
    "trabajo": "08:00 - 16:00",
    "otros": "Variable según día"
  },
  "distancias_recorre": {
    "promedio_dia_km": 12.5,
    "promedio_semana_km": 85.0,
    "promedio_mes_km": 340.0,
    "max_semana_km": 110.0,
    "min_semana_km": 60.0,
    "max_mes_km": 400.0,
    "min_mes_km": 290.0
  },
  "forma_en_que_se_mueve": ["A pie", "Bicicleta", "Uber"],
  "tiempo_de_recorridos": {
    "promedio_dia_min": 90,
    "promedio_semana_min": 630,
    "promedio_mes_min": 2520,
    "max_semana_min": 800,
    "min_semana_min": 500,
    "max_mes_min": 3000,
    "min_mes_min": 2000
  },
  "auto_propio": false,
  "usa_carpool_o_transporte_publico": "Sí, transporte público",
  "coincidencias_rutas_o_destinos": [
    {"usuario_id": "U123", "ruta": "Casa → Centro", "frecuencia": "3 veces por semana"},
    {"usuario_id": "U456", "destino": "Gimnasio", "frecuencia": "2 veces por semana"}
  ]
}
2. Actividades comerciales/compras
Endpoints
GET /api/commercial-activity/{userId}
Obtiene perfil de comercio y consumo del usuario.

Response (JSON):

json
{
  "userId": "francis_001",
  "lugares_donde_mas_gasta": ["Supermercado", "Restaurantes", "Tiendas de ropa"],
  "compras_frecuentes": ["Comida", "Ropa", "Productos electrónicos"],
  "monto_promedio_gastado": {"dia": 35.5, "semana": 210.0, "mes": 900.0},
  "tendencias_estacionales": {
    "invierno": "Mayor gasto en ropa y calefacción",
    "verano": "Aumento en ocio y comida fuera de casa",
    "primavera": "Incremento en productos personales y actividades al aire libre",
    "otoño": "Mayor compra de artículos para el hogar"
  },
  "horas_y_dias_mayor_actividad": {"dias": ["Viernes", "Sábado"], "horas": ["18:00 - 21:00"]},
  "tiempo_en_tiendas": {
    "promedio_por_tienda_min": 25,
    "promedio_general_min": 40,
    "relacion_dia_hora": "Mayor permanencia en tiendas durante fines de semana por la tarde"
  },
  "bancos_afiliados": ["BBVA", "Santander"],
  "tarjetas_con_las_que_cuenta": ["Débito", "Crédito"],
  "cantidad_compras_en_linea": 15,
  "preferencias_en_compras": {
    "tipo_tienda": "Tiendas físicas",
    "metodo_pago": "Tarjeta de débito",
    "tipo_producto": "Ropa y comida rápida"
  },
  "relacion_con_las_preferencias": "Prefiere compras presenciales en zonas cercanas a su trabajo; tiende a gastar más en productos de uso cotidiano y experiencias gastronómicas."
}
3. Sostenibilidad/uso responsable
Endpoints
GET /api/sustainability/{userId}
Analítica y perfil de sostenibilidad del usuario.

Response (JSON):

json
{
  "user_id": "USR_1001",
  "fecha_registro": "2025-10-25",
  "periodo_analizado": "Octubre 2025",
  "indice_sostenibilidad_general": 0.62,
  "transporte": {
    "modo_principal": "Transporte público",
    "otros_modos_usados": ["Bicicleta", "Uber"],
    "viajes_publicos_mensuales": 18,
    "viajes_privados_mensuales": 6,
    "auto_modelo_detectado_bluetooth": null,
    "anio_auto": null,
    "combustible": null,
    "eficiencia_vehiculo_km_l": null,
    "distancia_promedio_diaria_km": 11.2,
    "uso_bicicleta": true,
    "uso_patineta": false,
    "uso_electrico": false,
    "uso_transporte_compartido": true,
    "nivel_trafico_zona": "Medio",
    "co2_promedio_mensual_kg": 95,
    "huella_transporte": 0.54
  },
  "consumo_alimentacion": {
    "frecuencia_restaurantes": 8,
    "porcentaje_comida_local": 75,
    "porcentaje_comida_rapida": 10,
    "compras_en_supermercados_ecologicos": 2,
    "restaurantes_con_desperdicio_detectado": ["Fast Burger"],
    "frecuencia_pedidos_domicilio": 7,
    "porcentaje_veganos_o_vegetarianos": 11,
    "porcentaje_plasticos_en_pedidos": 18,
    "huella_alimentaria": 0.41
  },
  "compras_y_consumo": {
    "gasto_total_mensual": 870,
    "porcentaje_productos_ecologicos": 24,
    "porcentaje_productos_plastico": 30,
    "compras_segunda_mano": 4,
    "categorias_no_sustentables": ["Electrónicos desechables", "Ropa fast fashion"],
    "compras_locales_vs_internacionales": 70,
    "uso_reutilizables": true,
    "frecuencia_compras_online": 6,
    "huella_consumo": 0.38
  },
  "energia_y_hogar": {
    "tipo_energia_domestica": "CFE",
    "uso_panel_solar": false,
    "promedio_consumo_kwh_mensual": 210,
    "dispositivos_eficientes": 3,
    "uso_iluminacion_led": true,
    "huella_energia": 0.47
  },
  "uso_tecnologia": {
    "tiempo_pantalla_promedio_diario_h": 7.5,
    "numero_dispositivos_conectados": 6,
    "modelo_principal": "Galaxy S24",
    "eficiencia_energetica_dispositivo": "A+",
    "uso_modo_ahorro_energia": false,
    "huella_digital_estimada": 0.58
  },
  "residuos_y_reciclaje": {
    "residuos_mensuales_kg": 19.3,
    "porcentaje_reciclaje": 35,
    "participa_programas_reciclaje": true,
    "uso_botellas_reutilizables": true,
    "huella_residuos": 0.53
  },
  "contexto_ambiental_zona": {
    "tipo_zona": "Urbana",
    "nivel_contaminacion_zona": "Moderado",
    "acceso_a_transporte_publico": "Bueno",
    "porcentaje_areas_verdes": 13,
    "temperatura_promedio": 23,
    "densidad_poblacional": 7800,
    "infraestructura_peatonal": true,
    "eventos_ecologicos_cercanos": ["Ecomarket 2025", "Carrera Verde"]
  },
  "huella_total": {
    "co2_total_mensual_kg": 128,
    "agua_consumida_m3": 6.7,
    "residuos_generados_kg": 22.5,
    "energia_total_kwh": 215,
    "puntuacion_final": 62,
    "categoria_usuario": "Sostenible",
    "nivel_sostenibilidad": "Medio"
  },
  "ultima_actualizacion": "2025-10-25T23:50:00Z"
}
4. Usuario (potamo)
Endpoints
GET /api/user/{userId}
Información integral y perfil detallado del usuario hotspot.

Response (JSON) abreviado ejemplo:

json
{
  "user_id": "USR_9F28KQ",
  "usuario": {"tipo": "Padre", "subtipos": ["Empleado formal", "Urbano", "Consumidor racional"], "edad": 38, "genero": "Masculino"},
  "lifestyle": {"horario_actividad": "07:00–22:00", "lugares_frecuentes": ["Oficina", "Supermercado"]},
  "consumo": {"gasto_total_mensual": 18000, "gasto_promedio_compra": 850, "categorias_gasto": ["Alimentos", "Transporte"]},
  "tecnologia": {"dispositivo_principal": {"marca": "Samsung", "modelo": "Galaxy S24"}, "tiempo_conexion_diaria": 9},
  "movilidad": {"coordenadas_agregadas": {"lat": 19.389, "lng": -99.166}, "tipo_zona": "Residencial"},
  "privacidad": {"nivel_anonimato": "Alto", "compartir_datos": true}
}
5. Analytic ROI (análisis de zonas óptimas para negocios)
Endpoints
POST /api/roi-analysis
Recibe parámetros de entrada (filtros, criterios personalizados) y responde zonas óptimas y razones.

Request Example:

json
{
  "segmentacion": ["jóvenes", "trabajadores"],
  "tipo_negocio": ["Cafetería", "Papelería"],
  "preferencias_usuarios": ["bebidas", "estudiantes"]
}
Response (JSON):

json
{
  "zonas_recomendadas": [
    {
      "zona_id": "Z-001",
      "ubicacion": "Centro histórico",
      "tipo_negocio_recomendado": "Cafetería",
      "nivel_oportunidad": "Alto",
      "motivos": [
        "Alta concentración de clientes jóvenes y trabajadores",
        "Demanda elevada de bebidas y alimentos rápidos",
        "Baja competencia en un radio de 500 metros"
      ]
    },
    {
      "zona_id": "Z-002",
      "ubicacion": "Colonia Universidad",
      "tipo_negocio_recomendado": "Papelería / Tienda escolar",
      "nivel_oportunidad": "Medio",
      "motivos": [
        "Alta afluencia de estudiantes",
        "Preferencia de productos académicos",
        "Competencia moderada"
      ]
    }
  ]
}
Documentación rápida (Swagger-like estructura)
GET /api/mobility-patterns/{userId}

Descripción: Obtiene los datos de movilidad para un usuario

Response: JSON con info agregada de trayectorias, distancias, tiempos y coincidencias de rutas.

GET /api/commercial-activity/{userId}

Descripción: Perfil de las actividades comerciales más comunes, montos y tendencias.

GET /api/sustainability/{userId}

Descripción: Datos analíticos y scoring de sostenibilidad, huellas de consumo y contexto ambiental.

GET /api/user/{userId}

Descripción: Perfil completo de usuario (tipo, estilo de vida, consumo, movilidad, privacidad).

POST /api/roi-analysis

Descripción: Devuelve zonas recomendadas para nuevos negocios según criterios, demanda y competencia local.

**Nota de seguridad**
- Todos los endpoints de este módulo están protegidos con rol `admin`.
- Incluye `Authorization: Bearer <JWT>` con un usuario cuyo `app_metadata/user_metadata/role` contenga `admin`.
- Respuestas: `401` si no hay JWT, `403` si el usuario autenticado no tiene rol `admin`.