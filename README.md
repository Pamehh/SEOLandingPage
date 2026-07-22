# Riverline Ergonomic — Landing B2B

## 1. Estructura de carpetas

```
riverline-landing/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── images/          ← coloca aquí tus imágenes con estos nombres exactos
└── procesar-formulario.php   ← este archivo lo entrega el equipo de IT (ver sección 3)
```

## 2. Imágenes que debes subir a /images

Usa exactamente estos nombres de archivo (o edítalos en `index.html` si prefieres otros):

| Archivo | Uso | Medida sugerida (según spec) |
|---|---|---|
| `logo-riverline.svg` | Logo header (versión oscura) | — |
| `logo-riverline-light.svg` | Logo footer (versión clara) | — |
| `hero-desktop.jpg` | Fondo hero escritorio | 1280×830 |
| `hero-tablet.jpg` | Fondo hero tablet | 1024×830 |
| `hero-mobile.jpg` | Fondo hero mobile | 390×644 |
| `boot-desktop.jpg` | Bota — sección tecnología | 590×700 |
| `icon-ventas-volumen.jpg` | Beneficio: descuentos por volumen | 298×148 |
| `icon-entrega-inmediata.jpg` | Beneficio: entrega inmediata | 298×148 |
| `icon-envios.jpg` | Beneficio: envíos gratis | 298×148 |
| `icon-calidad.jpg` | Beneficio: calidad y garantía | 298×148 |
| `worker-desktop.jpg` | Imagen sección certificaciones | 650×920 |
| `feet-desktop.jpg` | Imagen CTA final | 1050×435 |

> Nota: dejé un único set de imágenes principales por sección (desktop) porque el CSS ya resuelve el recorte responsivo con `object-fit: cover`. Si prefieres servir archivos distintos por breakpoint (como en tu hoja de especificaciones, ej. `feet-tablet.jpg` 831×435, `boot-mobile.jpg` 310×390, etc.) puedo añadir las etiquetas `<picture>` / `srcset` adicionales — dímelo y las agrego.

## 3. Lógica del formulario (lo que debe darte IT)

El formulario ya está maquetado y listo, apuntando a un archivo que **todavía no existe en esta carpeta**:

```html
<form action="procesar-formulario.php" method="POST">
```

Cuando IT te entregue su script actual, necesitas confirmar 3 cosas para que "encaje" sin romperse:

1. **Nombre del archivo y ruta.** Si su script se llama distinto (p. ej. `enviar-contacto.php` o vive en otra carpeta como `/forms/procesar.php`), cambia el atributo `action` en **ambos** formularios de `index.html` (el inline de escritorio `#quoteFormDesktop` y el del modal `#quoteFormModal`) para que apunten exactamente ahí.

2. **Nombres de los campos (`name="..."`).** Un script PHP típico lee los datos con `$_POST['nombre_del_campo']`. Si su script espera nombres distintos a los que usé, hay que igualarlos. Actualmente uso:
   - `nombre`, `apellido`, `empresa`, `correo`, `telefono`, `estado`, `cantidad_empleados`, `especificaciones`

   Pídele a IT la lista exacta de `$_POST[...]` que su script espera, y te ajusto los `name` en un minuto (son solo esos 8 campos, están duplicados en el form de escritorio y en el del modal).

3. **Qué pasa después de enviar.** Pregúntales si el script:
   - hace un **redirect** a una página de "gracias" (lo más común, `header('Location: gracias.html')`), o
   - devuelve una respuesta que hay que mostrar con JavaScript (fetch/AJAX) sin recargar la página.

   Como me confirmaste que el archivo se queda igual, lo más probable es que sea la opción de redirect clásico — en ese caso no tienes que tocar nada más, el navegador se encarga solo. Si en cambio es AJAX, dímelo y agrego el `fetch()` en `main.js` para manejarlo sin recargar (útil sobre todo para que el modal no "salte" de la página al enviar).

Ese archivo PHP **no interfiere con tu trabajo de maquetación**: tú entregas el HTML/CSS/JS, y el archivo `.php` simplemente se coloca junto a `index.html` en el mismo servidor. Lo único que los conecta es el `action` del `<form>` y los `name` de los campos — de ahí que solo necesites esos 3 datos de IT.

## 4. Comportamiento del formulario por dispositivo

- **Escritorio / tablet:** el formulario aparece integrado (inline) junto al hero, como en el diseño de Figma ("Form Card/desktop").
- **Mobile:** el formulario vive dentro de un modal (ventana emergente). Se abre con cualquier botón **"Cotizar ahora"** (el del header y el de la sección final), y se cierra con la "×", el botón "Salir sin enviar", tecleando `Esc`, o tocando fuera del recuadro blanco.

## 5. Subir a cPanel

1. Sube toda la carpeta `riverline-landing/` (o su contenido) a `public_html/` (o a la subcarpeta que uses) vía el **Administrador de archivos** de cPanel o por FTP.
2. Sube ahí también el `procesar-formulario.php` que te dé IT, en la misma carpeta que `index.html` (a menos que ellos indiquen otra ruta — en ese caso ajusta el `action` como se explicó arriba).
3. Verifica permisos: los archivos `.php` normalmente necesitan permisos `644`; las carpetas `755`.
4. Prueba el formulario en vivo (llena y envía) antes de pedir el redirect de la URL antigua, para confirmar que los correos/leads sí están llegando a donde IT espera.
5. Pide al equipo de IT que redirija la URL anterior hacia la nueva con un **redirect 301** (permanente) — esto se configura normalmente en `.htaccess` o en la configuración de dominios de cPanel. Esto es responsabilidad de IT, pero puedes indicarles la URL final para que la parametricen.

## 6. Pendientes / decisiones que tomé por ti (avísame si prefieres otra cosa)

- El botón **"Cotizar ahora"** de la sección final abre el modal también en escritorio (aunque ya exista el form inline en el hero), para mantener el mismo flujo en toda la página. Si prefieres que en escritorio ese botón simplemente haga scroll hacia el formulario del hero en lugar de abrir el modal, es un cambio de una línea en `main.js`.
- Usé la tipografía **Inter** (Google Fonts) porque el diseño no especificaba una fuente; si tienes la fuente exacta de marca, la cambio en una línea del CSS.
- Los íconos "circulares" de la lista de sectores (`.sector-icon`) están como placeholders vacíos — si tienes los íconos reales de cada sector, los agrego como `<img>` dentro de ese `<span>`.
