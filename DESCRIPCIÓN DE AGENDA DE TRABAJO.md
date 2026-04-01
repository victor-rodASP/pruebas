Planteamiento del Problema: 

Situación Actual: La operación de campo carece de una columna vertebral digital. La dependencia de procesos manuales, herramientas aisladas (como Jotform) y el reporte verbal genera una asimetría de información crítica. No existe un vínculo real entre lo que el asesor planea, lo que realmente ejecuta en ruta y lo que el CORE reporta como recuperado.
Puntos de Dolor Críticos:
Fragmentación y Re-trabajo: La información se captura varias veces en distintos medios, aumentando el error humano y el tiempo administrativo.


Invisibilidad Supervisora: Los gerentes no pueden validar la calidad de la ruta en tiempo real; la supervisión es reactiva y basada en datos que pueden ser alterados (falta de inmutabilidad).


Vulnerabilidad Operativa: Al no haber una validación de duplicidad ni una trazabilidad total, la base de datos es propensa a "basura" y el riesgo de fraude o simulación de visitas es elevado.


Incapacidad de Escalado: El modelo actual no soporta la integración de nuevos puestos operativos ni la complejidad de una cartera que requiere segmentación específica por niveles de mora (Buckets).
Necesidad: Migrar hacia una herramienta de Agenda Inteligente que funcione como un sistema de registro único, auditable, con lógica de negocio embebida y capacidad de operación offline, garantizando que cada paso en la calle sea un dato útil para la estrategia de la Dirección.
_________________________________________________________________________________



DINÁMICA GENERAL DE LA AGENDA
(Flujo Diario)
La agenda se concibe como un ciclo cerrado de tres fases, donde la información fluye de forma ascendente y descendente:
Fase A: Planificación y Autorización
Apertura de Jornada: El operativo (Asesor, Gestor, etc.) debe capturar su plan de trabajo en las pestañas correspondientes (Promoción, Evaluación o Seguimiento).


Validación del Jefe Inmediato: Antes de salir a ruta, el superior jerárquico revisa la agenda en su propia vista de mando.


Estatus de Validación: El sistema debe marcar la agenda como Enviada, Aprobada o Modificada. Un operativo no debería iniciar gestiones sin una agenda aprobada.
Fase B: Ejecución y Registro de Evidencias (En Ruta)
El sistema opera bajo tres pilares de captura de datos:
Captura de Actividad: Dependiendo del puesto, se registran visitas de promoción (contactos/prospectos) o gestiones de cobranza (preventiva, correctiva, presencial en domicilio, aval o trabajo).


Geolocalización Incrustada: Cada gestión requiere un check-in de coordenadas GPS, fecha, hora y dirección aproximada, vinculando al historial del cliente o prospecto.


Lógica de Compromisos: Si se registra una "Promesa de Pago", el sistema exige capturar el Cuánto y el Cuándo. Esta promesa debe aparecer automáticamente en la agenda del operativo el día que venza el plazo.


Fase C: Evaluación y Cierre de Jornada
Resumen de Cumplimiento: Una pantalla muestra lo cumplido vs. lo programado, separando los resultados por categoría de gestión.


Dictamen de Productividad: El jefe directo evalúa el cierre con etiquetas de desempeño: Excelente, Satisfactorio, Con oportunidad de mejora o Improductivo.
Sincronización: En caso de haber trabajado en modo offline, el sistema asegura que toda la evidencia (fotos y datos) se suba al servidor al recuperar conexión.


_________________________________________________________________________________
DINÁMICA OPERATIVA DE LA AGENDA
(Flujo Diario)

1. Flujo Operativo: Fase de Planeación
Cada mañana, el personal operativo debe registrar su plan de trabajo diario. El sistema permite la organización de actividades en cuatro segmentos estratégicos.
Reglas Generales de Captura
Gestión de Horarios: Selectores de 8:00 AM a 8:00 PM con intervalos de 15 minutos. Restricción estricta: No se permiten traslapes de horario entre segmentos ni dentro de la misma actividad.
Inteligencia de Datos: Al escribir un nombre, el sistema busca coincidencias en la base de datos de contactos/prospectos/clientes. Si no existe, se crea un nuevo registro automáticamente.
Geolocalización: Integración con Google Maps para confirmar direcciones físicas.
Metadatos de Control: El sistema registra automáticamente fecha/hora de captura, puesto, nombre del empleado y registro de modificaciones.

2. Segmentación de Agenda de Actividades
A. Promoción
Enfocado en la captación de nuevos contactos y prospectos.
Campos: Numeración automática, Hora, Nombre, Clasificación (Contacto/Prospecto), Producto (Microcrédito, Consumo, Pyme, Crédito Fácil, Captación), Actividad (Campo abierto), Dirección (Desglosada por Ciudad/Colonia/Calle con validación en mapa) y hasta 3 números telefónicos.
B. Evaluación e Integración
Seguimiento de procesos de autorización de crédito en sus distintas etapas.
Identificación: Numeración automática,Hora, Nombre, Clasificación (Prospecto/Cliente) y Tipo de Integración (Nuevo, Renovación, Tratamiento, Convenio).
Detalle Financiero: Producto (catalogo productos), Monto estimado (en pesos mexicanos), Tasa Anual (formato $00.00\%$).
Clasificación Técnica: Subproducto (Preferencial, Bolsón, Back to Back, Liquidez, Fastcredit) y Programa (Score 500, Atracción, Otro). Nota: Estos campos se inhabilitan si el producto es Captación.
Flujo de Proceso: Actividad (Lista desplegable: Integración, Validación, Verificación Telefónica/Presencial, Comité, Corrección, VoBo).
Estatus de Cartera: Solo lectura para clientes existentes (Abono, Compromiso de pago, Ilocalizable, etc. Ver catálogo de Estatus de cartera). Fecha última gestión.
C. Seguimiento de Cartera
Gestión preventiva y correctiva de cuentas vigentes y vencidas.
Campos: Numeración automática, Hora
Datos del Crédito: ID de crédito, Días de mora (Inicio de mes vs. Actual), Saldo en riesgo (Inicio de mes vs. Actual).
Inteligencia de Gestión: Categoría Gestión (automática) (Preventivo, Vigente, Vencido) basada en la mora.
Histórico: Último estatus, última fecha de pago, fecha de vencimiento y montos (Amortización y Requerido para corriente).
Acción: Herramienta aplicada (Tratamiento/Convenio) y Tipo de Gestión.
Herramientas de Regularización: Se habilitan opciones de cobranza/convenio solo si la categoría es "Vencido".
D. Gestión de Empresarias
Seguimiento específico según historial y antigüedad.
Campos: Numeración automática, Hora
Campos de Control: Fecha de ingreso, Días de mora, Saldo ocupado y Saldo disponible.
Tipología de Visita: Gestión programada: (Integral, Correctiva, Preventiva, Presencial Domicilio/Aval/Trabajo o Gestión Telefónica, ver catálogo Tipo de Gestión Empresarias).

3. Matriz de Visibilidad por Puesto Operativo
No todos los operativos tienen acceso a los mismos segmentos:
Puesto
Promoción
Evaluación
Cartera
Empresarias
Coordinador de Línea
✓
✓
✓
✓
Asesor Comercial
✓
✓
✓
✓
Asesor Financiero
✓
✓
✓
✗
Gestor Interno
✗
✓
✓
✗


4. Lógica de Validación y Estatus
Una vez completada la planeación, el usuario utiliza el botón "Enviar para Autorización". Existe un botón de "Resetear" (en rojo y distanciado) para borrar la captura actual.
Estados de la Agenda:
Pendiente: Enviada al jefe inmediato, en espera de revisión. (Edición bloqueada).
Autorizada: Aprobada por el jefe. (Solo lectura).
Requiere Modificación: El jefe devuelve la agenda con notas. El operativo recibe una notificación push, corrige según las observaciones y reenvía.













DINÁMICA DEL JEFE DIRECTO EN LA AGENDA
(Flujo Diario)


Estructura de Datos: Tablas de "Relación"
Para que el sistema sea consultable y escalable, los desarrolladores deben implementar las siguientes estructuras de tablas (Relaciones) que consolidan la información del día:
Relación de Contactos y Prospectos: Almacena el historial de prospección: nombres, teléfonos, productos posibles, montos y estatus de aprobación.


Relación de Evaluación e Integración: Historial del "tren de crédito". Registra quién integró el expediente, quién verificó telefónicamente y cuándo pasó por el comité.


Relación de Seguimiento de Cartera: Cruza los datos del CORE (ID Crédito, Saldo en Riesgo, Estatus) con la gestión humana (Tipo de visita, Herramienta aplicada).


Relación de Visitas a Empresarias: Específicamente para el seguimiento del uso del recurso y líneas de crédito.


Relación de Compromisos de Pago: Tabla dedicada a rastrear el cumplimiento de las promesas registradas.
_________________________________________________________________________________
Lineamientos Finales para Desarrollo (Trazabilidad y Blindaje)
Para garantizar que el negocio pueda consultar "cuántas veces se ha hecho qué, por quién y a quién", se establecen estas reglas:
IDs Históricos y Trazabilidad Total: Cada acción debe generar un registro único con IDs cruzados. Ejemplo: un ID de Promoción debe estar vinculado al ID del Operativo, al ID del Día (Agenda) y, si se convierte, al ID de Cliente futuro.


Inmutabilidad de Datos: Una vez que se envía una gestión de visita o una promesa de pago, el sistema no debe permitir borrar ni modificar el registro. Esto garantiza la integridad para auditorías futuras.


Jerarquía de Drill-Down: La arquitectura de datos debe permitir que un Director consulte el desempeño global y pueda "bajar" hasta ver la foto de la visita de un cliente específico realizada en una sucursal remota.


Modo Offline con Logs de Tiempo: El registro de la hora de la visita debe ser el del dispositivo (timestamp local) y no el de la subida al servidor, para evitar discrepancias en la métrica de productividad.

_________________________________________________________________________________

CATÁLOGOS DE NEGOCIO GENERALES



Equipos de Gestión de cartera:
Equipo Sucursal
Cobranza Administrativa
Cobranza Extrajudicial
Cobranza Judicial
Cobranza Judicial Especial
Fuera de Gestión

Etiquetas de crédito:
Castigado
Comercial
Para recuperación
Judicial
Extrajudicial
Para venta


BUCKETS GLOBAL
A
B
C
D
E
F
G
H


BUCKETS DETALLE
A
B1
B2
B3
C1
C2
D1
D2
E1
E2
F1
F2
G1
G2
H


RANGO MORA
Vig
1 a 7
8 a 30
31 a 60
61 a 89
90 a 120
121 a 150
151 a 180
> 180


RANGO MORA COMERCIAL

Vig
1 a 7
8 a 30
31 a 60

> 60



TABLA DE RANGOS

LÍMITE INFERIOR
LÍMITE SUPERIOR
BUCKET DETALLE
BUCKET GLOBAL
RANGO MORA
RANGO MORA COMERCIAL
0
0
A
A
Vig
Vig
1
7
B1
B
1 a 7
1 a 7
8
23
B2
B
8 a 30
8 a 30
24
30
B3
B
8 a 30
8 a 30
31
53
C1
C
31 a 60
31 a 60
54
60
C2
C
31 a 60
31 a 60
61
82
D1
D
61 a 89
> 60
83
89
D2
D
61 a 89
> 60
90
113
E1
E
90 a 120
> 60
114
120
E2
E
90 a 120
> 60
121
143
F1
F
121 a 150
> 60
144
150
F2
F
121 a 150
> 60
151
173
G1
G
151 a 180
> 60
174
180
G2
G
151 a 180
> 60
181
100000
H
H
> 180
> 60



ÁREA
SUB ÁREA
NOMBRE PUESTO ACTUAL
DIRECCIÓN DE CRÉDITO Y COBRANZA
DIRECCIÓN
DIRECTOR DE CREDITO Y COBRANZA
SUBDIRECTOR DE COBRANZA
OPERACIONES
SUBDIRECTOR DE OPERACIONES
COORDINADOR DE OPERACIONES
ANALISTA DE OPERACIONES
ANALISTA DE OPERACIONES SENIOR
COORDINADOR DE SUPERVISION
EJECUTIVO DE OPERACIONES JUNIOR
SUPERVISOR VOLANTE
MESA DE CONTROL
COORDINADOR DE MESA DE CONTROL
SUPERVISOR DE MESA DE CONTROL
EJECUTIVO DE MESA DE CONTROL
COBRANZA ADMINISTRATIVA
COORDINADOR DE RECUPERACION ADMINISTRATIVA
EJECUTIVO DE RECUPERACIÓN
GESTOR ADMINISTRATIVO
COBRANZA EXTRAJUDICIAL
COORDINADOR DE RECUPERACION JURIDICO
ABOGADO GESTOR
EJECUTIVO DE RECUPERACIÓN
COBRANZA JUDICIAL
COORDINADOR JURIDICO
EJECUTIVO DE RECUPERACIÓN
INTELIGENCIA DE NEGOCIOS
ANALISTA DE CALIDAD EN ORIGINACION
COORDINADOR DE INTELIGENCIA DE NEGOCIOS
DIRECCIÓN DE COMERCIALIZACIÓN
DIRECCIÓN
DIRECTOR COMERCIAL
SUBDIRECTOR DE FORMACION Y DESARROLLO
CAPTACIÓN
COORDINADOR DE INVERSION CORPORATIVA
GERENTE DE CAPTACION
SUCURSALES
SUBDIRECTOR COMERCIAL
GERENTE DIVISIONAL
GERENTE DE SUCURSAL
GERENTE VOLANTE
LIDER DE COORDINACION
COORDINADOR DE LÍNEA REVOLVENTE
ASESOR DIGITAL
ASESOR COMERCIAL
ASESOR FINANCIERO
CAJERO
CALL CENTER
SUPERVISOR DE CALL CENTER
EJECUTIVO CALL CENTER
RECURSOS HUMANOS
DIRECCIÓN
DIRECTOR DE RECURSOS HUMANOS
CAPACITACIÓN
COORDINADOR DE CAPACITACION
CAPITAL HUMANO
COORDINADORA DE CAPITAL HUMANO
EJECUTIVO DE CAPITAL HUMANO
AUXILIAR DE CAPITAL HUMANO
SEGURIDAD LABORAL
EJECUTIVO DE ADMINISTRACION Y SEGURIDAD LABORAL
INNOVACIÓN Y CULTURA
COORDINADOR DE INNOVACION Y CULTURA
AUDITORIA
AUDITORIA
DIRECCIÓN AUDITORIA
COORDINACIÓN AUDITORIA
AUDITOR
PROCESOS
RESPONSABLE DE PROCESOS



DATOS INDISPENSABLES DEL CRÉDITO



Datos indispensables de los créditos:
Control o ID de Crédito
Producto
Fecha Ministración
Tasa
Periodicidad
Tipo Persona
Formalidad
Monto
Amortización

DATOS DE CONTEXTO MENSUAL DEL CRÉDITO
Dias mora Inicio mes
Saldo Capital Inicio mes
Capital x cobrar (semana, quincena y mes)
Interés x cobrar (semana, quincena y mes)
Accesorios x cobrar (semana, quincena y mes)
Total x cobrar (semana, quincena y mes)
Capital Recuperado (semana, quincena y mes)
Interés Recuperado (semana, quincena y mes)
Accesorios Recuperado (semana, quincena y mes)
Total Recuperado (semana, quincena y mes)
Dias mora final mes
Saldo Capital final mes

OTRAS CARACTERÍSTICAS DEL CRÉDITO (no es una tabla)
Tiene o no tratamiento
Tiene o no convenio
última fecha de pago






DATOS INDISPENSABLES DEL CLIENTE:
Id Cliente
Nombre
Apellidos
Número de celular
Número de teléfono
Calificación
Tipo cliente
Domicilio

PRODUCTOS:
MICROCREDITO
PYME
CRÉDITO FÁCIL
EMPRESARIAL
CONSUMO

SUBPRODUCTOS:
PREFERENCIAL
BOLSÓN
BACK TO BACK
LIQUIDEZ
FASTCREDIT

Tipo Persona
Fisica
Moral

Formalidad:
Informal
Formal


Tipo Garantía:
Aval + Prendaria
Aval
Prendaria
Hipotecaria
Aval + Hipotecaria
Prendaria + Hipotecaria
Aval + Prendaria + Hipotecaria


TIPO DISPOSICIÓN:
REDISPOSICION NORMAL
AUTOMATICA FINANCIADA
REDISPOSICION ANTICIPADA
INICIAL
REDISPOSICION TRATAMIENTO
AUTOMATICA LIQUIDADA
REDISPOSICION CONSOLIDADA
REDISPOSICION ESPECIAL
“DISPERSIÓN”


PERIODICIDADES
SEMANAL
MENSUAL
QUINCENAL
CUATRIMESTRAL
ANUAL
TRIMESTRAL
SEMESTRAL
OCTOMESTRAL
SEPTIMESTRAL
DECAMESTRAL (10 MESES)
330 DIAS (11 MESES)
BIMESTRAL
720 DIAS
660 DIAS (22 MESES)
630 DIAS (21 MESES)
9 MESES(NONAMESTRAL)
QUINQUEMESTRAL
450 DIAS (15 MESES)
690 DIAS (23 MESES)
600 DIAS (20 MESES)
420 DIAS (14 MESES)
570 DIAS (19 MESES)
390 DIAS (13 MESES)
510 DIAS (17 MESES)

TIPO COMISIÓN:
APORTADA
COBRADA
N/A

PERIODOS DE REVISIÓN PARA DASHBOARDS Y REPORTES O PANTALLAS.
Día
Semana
Mes
Trimestre
Semestre
Anual



CALIFICACIÓN INTERNA CLIENTE
Pd
Mb
Ex
Bn
Nr
Rg




ESTATUS DE CARTERA
1. Abono/ Pago Parcial
2. Compromiso de pago 
3. Negativa de pago
4.Ilocalizable
5. Promesa de pago 
6. Sin contacto 
7. Convenio 
8. Finado

SUB ESTATUS
N/A
Insolvente
Solvente
No reconoce el crédito
Dice que ya pago
Liquidación
Normalización
Trat Especial
Cliente no estuvo 
Aviso debajo de la puerta 
Se cambio domicilio (Ilocalizable)
Convenio vigentes
Convenios Liquidados
Convenio cumplidos
Convenio pago parcial
Convenio incumplidos
Convenio generados mes


PERSONA COMPROMISO
Titular
Aval
Tercero

ETAPAS JUDICIALES
PRESENTACIÓN DEMANDA
ADMISIÓN -RADICACIÓN
EMPLAZAMIENTO
CONTESTACIÓN DEMANDA
OFRECIMIENTO DE PRUEBAS
PRESENTACIÓN DE PRUEBAS
ADMISIÓN DE PRUEBAS
DESAHOGO DE PRUEBAS
ALEGATOS
CITACIÓN PARA SENTENCIA
SENTENCIA
SENTENCIA FIRME
EJECUCIÓN DE SENTENCIA
ADJUDICACIÓN 
DICTAMEN
AMPARO
CONVENIO JUDICIAL 
EXHORTO
APELACIÓN
ALEGATOS

ESTATUS JUDICAL
Esperando acuerdo juzgado
Prevención tribunal
Agenda diligencia con actuario 
Demandando se defiende activamente
Embargo trabado sin bienes suceptibles
Negociación de convenio
Expediente sin movimiento mas de 30 días
Caducidad
Caducidad por falta de emplazamiento 
Oficios de búsqueda 
Convenio judicial firmado 
Desistimiento 
Dictamen
Emplazamiento 

SUB ESTATUS JUDICIAL (solo para emplazamientos)
Emplazamiento Aval/Titular
Cambio Domicilio
Diligencia negativa


CLASIFICACIÓN DE CARTERA
NORMAL
NO REDISPONIBLE
PARA DEMANDA


HERRAMIENTAS DE GESTIÓN DE CARTERA
Redisposición automática
Redisposición anticipada
Redisposición especial
Tratamiento
Convenio

SIMULADORES
Simulador de crédito tradicional
Simulador de línea de crédito fácil
Simulador de aumento de línea
Simulador de tratamiento
Simulador de convenio




ROLES
ADMINISTRADOR
DIRECTIVO
SUPERVISIÓN REGIONAL
GERENTE REGIONAL
LÍDER DE NEGOCIO
ADMINISTRATIVO
OPERATIVO
AUDITOR


VALIDACIÓN DE AGENDA (Al inicio del dia) - Jefe inmediato
Enviada
Aprobada
Modificada

EVALUACIÓN DEL CIERRE (Al final del día) - Jefe inmediato
Excelente
Satisfactorio
Con oportunidad de mejora
Improductivo

Tipo de Gestión
Visita integral
Visita correctiva
Visita preventiva
Visita presencial domicilio
Visita presencial aval
Visita presencial Trabajo
Gestión telefónica
Gestión envió de sms
Gestión telefónica aval
Gestión envió de sms aval


