# Guía de Conexión n8n <-> PubliAI

Tu sistema web ya está listo para "hablar" con n8n. Aquí tienes cómo debes configurar tu flujo:

## 1. El Nodo "Trigger" (Cron / Horario)
Configura un nodo de tipo **Schedule** para que se ejecute **cada hora**.

## 2. El Nodo "HTTP Request" (Consultar Tareas)
Este nodo le preguntará a la web: "¿Quién tiene que publicar ahora?".

- **URL:** `http://localhost:3000/api/automation?secret=tu_secret_aqui`
- **Method:** `GET`
- **Autenticación:** El `secret` es el valor de `NEXTAUTH_SECRET` en tu archivo `.env`.

### Respuesta esperada (JSON):
```json
[
  {
    "userId": "uuid",
    "fbToken": "...",
    "fbPageId": "...",
    "niche": "Fitness",
    "watermark": "@gym_vida",
    "remainingToday": 5
  }
]
```

## 3. El Bucle (Split In Batches)
Si la respuesta tiene datos, usa un nodo **Split In Batches** para procesar a cada usuario uno por uno.

## 4. El Nodo "HTTP Request" (Notificar Éxito)
Al final de tu flujo, después de que Facebook acepte la publicación, debes avisarle a la web para que reste 1 al contador del día:

- **Method:** `POST`
- **URL:** `http://localhost:3000/api/automation`
- **Body (JSON):**
```json
{
  "userId": "{{$node[\"Consultar\"].json[\"userId\"]}}",
  "caption": "Texto generado por IA",
  "imageUrl": "URL de la imagen usada",
  "fbPostId": "ID_DE_FB",
  "secret": "tu_secret_aqui"
}
```

## Beneficios
- **Multi-Cuenta:** n8n ahora puede manejar 100 usuarios con un solo flujo.
- **Límites Inteligentes:** Si el usuario es "Lite", la web solo le dará 6 tareas al día.
- **Sin Errores:** Si el token de Facebook expira, n8n lo sabrá de inmediato porque la web se lo entrega actualizado.
