# Arquitectura de Informacion — Colegios Arquidiocesanos

## Principios
1. Max 7 items en menu principal (Ley de Miller)
2. Agrupar por intencion de usuario, no por departamento
3. Submenus max 2 niveles
4. Cada pagina = URL semantica + title unico + meta description + structured data
5. Contenido escaneable por IA: jerarquia H1-H2-H3, FAQ schema, tablas

## Menu Propuesto (7 items)

| # | Label | URL Base | Tipo |
|---|-------|----------|------|
| 1 | Quienes Somos | /quienes-somos | Dropdown |
| 2 | Colegios | /colegios | Link directo |
| 3 | Noticias | /noticias | Link directo |
| 4 | Servicios | /servicios | Dropdown |
| 5 | Admisiones | /admisiones | Link directo |
| 6 | Transparencia | /transparencia | Link directo |
| 7 | RUNACHAY | https://runachay.com | CTA externo |

## Submenu: Quienes Somos

| Pagina | URL | Estado |
|--------|-----|--------|
| Horizonte Institucional | /quienes-somos/horizonte | Nuevo |
| Pastoral Educativa | /quienes-somos/pastoral | Nuevo |
| Trabaja con Nosotros | /quienes-somos/trabaja-con-nosotros | Nuevo |
| Manuales y Politicas | /quienes-somos/manuales | Nuevo |
| Directorio Telefonico | /quienes-somos/directorio | Nuevo (PDF) |

## Submenu: Servicios

| Pagina | URL | Estado | Nota |
|--------|-----|--------|------|
| Portal Runachay | /servicios/runachay | Existente | Redireccion externa |
| Plataforma Agile | /servicios/agile | Nuevo | Redireccion externa |
| Certificados Tributarios | /servicios/certificados | Nuevo | Redireccion externa |
| Documentos IA | /documentos | Existente | Chat con PDFs |
| Buzon PQRSF | /servicios/pqrsf | Nuevo | Formulario |
| Proveedores | /servicios/proveedores | Nuevo | Popup/info |
| Notificaciones Judiciales | /servicios/notificaciones-judiciales | Nuevo | Info + imagen |
| Acoso Sexual | /servicios/acososexual | Nuevo | Pagina informativa |
| Comite de Convivencia | /servicios/comite-convivencia | Nuevo | Submenu: FAUU / FSIH |
| Regimen Tributario Especial | /servicios/regimen-tributario | Nuevo | Submenu: FAUU / FSIH |

## SEO/IA Checklist por Pagina

- [ ] Title unico (< 60 chars)
- [ ] Meta description (< 160 chars)
- [ ] H1 unico por pagina
- [ ] Breadcrumbs (structured data)
- [ ] Open Graph tags
- [ ] FAQ schema donde aplique
- [ ] Sitemap XML dinamico desde Prisma

## Fases de Implementacion

1. Crear rutas y paginas estaticas nuevas
2. Implementar dropdowns en Header
3. Generar sitemap.xml dinamico
4. Agregar metadata a todas las paginas
5. Implementar formulario PQRSF en DB
