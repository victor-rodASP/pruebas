# Recordatorio: Lógica Jerárquica del Sistema

> Documento de referencia para el asistente. Explica cómo funciona la jerarquía de roles en ambos canales para no tener que redescrubrir esta lógica en futuras sesiones.

---

## Principio Fundamental

El sistema tiene **dos canales** con estructuras jerárquicas completamente distintas:

| Canal | Agrupación base | Lógica de territorio |
|---|---|---|
| **Comercial** | Zona → Sucursal → Operativo | Geográfica, fija y estructurada |
| **Cobranza** | Ejecutivo → Gestores | Personal, flexible, sin importar zona |

---

## Canal Comercial

La jerarquía sigue una estructura geográfica estricta:

```
Director General (N3)
  └── ve ZONAS (Zona I, II, III, IV...)
        └── Subdirector / Gerente Divisional (N2)
              └── ve SUCURSALES dentro de su zona
                    └── Gerente de Sucursal (N1)
                          └── ve OPERATIVOS de su sucursal
                                └── Asesor Comercial / Asesor Financiero / Coord. Revolvente
```

**Roles operativos:** Asesor Comercial, Asesor Financiero, Coordinador de Línea Revolvente.

Todos los operativos pertenecen a **una sola sucursal**, y cada sucursal pertenece a **una sola zona**.

---

## Canal Cobranza — ⚠️ Lógica diferente

La diferencia crítica es que **los gestores NO se rigen por sucursal ni zona**. Un Ejecutivo puede tener gestores en sucursales de distintas zonas geográficas. Lo que define su territorio es quién está asignado a él, no dónde está ubicado.

```
Subdirector de Cobranza (N3)
  └── ve COORDINADORES de cobranza
        └── Coordinador de Cobranza (N2)
              └── ve sus EJECUTIVOS y sus regiones
                    └── Ejecutivo de Cobranza (N1)
                          └── ve directamente sus GESTORES INTERNOS asignados
                                └── Gestor Interno (Operativo)
```

### El territorio de un Ejecutivo = "Región Ejecutivo [nombre]"

Un ejemplo real del sistema:
- **Ejecutivo ROBERTO DÍAZ** → gestores en Hermosillo y Guaymas (ambas Zona I)
- **Ejecutivo MARINA FUENTES** → gestores en Obregón (Zona I) **y** La Paz (Zona II)
  - Esto es válido y correcto. Las zonas comerciales no aplican aquí.

El campo `sucursalesRef` en los datos es **solo referencial/informativo**, no estructural.

---

## Estructura de Datos en Código

### `agendaMockData.js`

| Export | Descripción |
|---|---|
| `AGENDAS_COMERCIAL` | Agendas del canal comercial. Cada una tiene `zona` y `sucursal`. |
| `AGENDAS_COBRANZA` | Agendas del canal cobranza. Cada una tiene `ejecutivoId` además de zona/sucursal (solo referencial). |
| `EJECUTIVOS_COBRANZA` | Array de ejecutivos. Cada uno tiene `id`, `nombre`, `coordinadorId`, `agendaIds`, `sucursalesRef`. |
| `COORDINADORES_COBRANZA` | Array de coordinadores. Cada uno tiene `id`, `nombre`, `ejecutivoIds`. |
| `agruparPorZona(agendas)` | Helper para agrupar agendas comerciales por zona → sucursal. |
| `agruparPorSucursal(agendas)` | Helper para agrupar por sucursal. |
| `agendasDeEjecutivo(agendas, ejecutivoId)` | Helper para filtrar agendas de cobranza por ejecutivo. |
| `contarEstados(agendas)` | Retorna `{ total, pendiente, aprobada, requiere_modificacion }`. |

### `RoleContext.jsx`

Cada rol tiene:
- `id`: clave única
- `name`: nombre visible
- `category`: `'Operativo'` o `'Jefe'`
- `canal`: `'comercial'` o `'cobranza'`
- `nivel`: `1`, `2` o `3` (solo roles Jefe)

### `PlaneacionJefe.jsx`

El componente raíz hace un split inmediato por `canal`:

```jsx
if (canal === 'cobranza') {
  // N1 → VistaEjecutivoCobranza (sus gestores directos)
  // N2 → VistaCoordCobranza     (sus ejecutivos)
  // N3 → VistaSubdirCobranza    (todos los coordinadores)
}
// else: canal comercial
// N1 → VistaGerente      (sucursal)
// N2 → VistaSubdirector  (zona)
// N3 → VistaDirector     (nacional / todas las zonas)
```

---

## Vistas implementadas (Planeación)

| Componente | Canal | Nivel | Qué muestra |
|---|---|---|---|
| `VistaGerente` | Comercial | N1 | Agendas de operativos de su sucursal |
| `VistaSubdirector` | Comercial | N2 | Sucursales de su zona con drill-in |
| `VistaDirector` | Comercial | N3 | Todas las zonas con drill-in |
| `VistaEjecutivoCobranza` | Cobranza | N1 | Sus gestores asignados (sin importar zona) |
| `VistaCoordCobranza` | Cobranza | N2 | Sus ejecutivos y sus regiones |
| `VistaSubdirCobranza` | Cobranza | N3 | Todos los coordinadores nacionales |

---

## Datos mock actuales (Feb 2026)

### Gestores de Cobranza y sus ejecutivos

| Gestor | Sucursal (ref) | Ejecutivo asignado |
|---|---|---|
| OSVALDO MENDOZA | Hermosillo | ej-01 ROBERTO DÍAZ |
| KARINA MONTOYA | Hermosillo | ej-01 ROBERTO DÍAZ |
| ALBERTO OCHOA | Obregón | ej-02 MARINA FUENTES |
| FERNANDA LEYVA | La Paz | ej-02 MARINA FUENTES |
| PASCUAL DOMÍNGUEZ | Tijuana | ej-03 CLAUDIA TORRES |

### Ejecutivos y coordinadores

| Ejecutivo | Coordinador |
|---|---|
| ej-01 ROBERTO DÍAZ | coord-01 HÉCTOR SALINAS |
| ej-02 MARINA FUENTES | coord-01 HÉCTOR SALINAS |
| ej-03 CLAUDIA TORRES | coord-02 PATRICIA CARO |

---

## Reglas para futuras expansiones

1. **Agregar un gestor de cobranza:** añadir a `AGENDAS_COBRANZA` con el `ejecutivoId` correcto. No importa la zona o sucursal.
2. **Agregar un ejecutivo:** añadir a `EJECUTIVOS_COBRANZA` con su `coordinadorId`. Agregar sus `agendaIds`.
3. **Agregar un coordinador:** añadir a `COORDINADORES_COBRANZA` con su lista de `ejecutivoIds`.
4. **Agregar operativo comercial:** añadir a `AGENDAS_COMERCIAL` con `zona` y `sucursal` según la estructura geográfica de `ZONAS`.
5. **Nunca mezclar** la lógica de cobranza (por ejecutivo) con la de comercial (por zona/sucursal).
