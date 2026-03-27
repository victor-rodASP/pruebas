# Lógica de Roles y Puestos

Este documento define las vistas, permisos y flujos específicos para cada usuario dentro del sistema Business Control.

El sistema tiene una logica de segementación de información dependiendo el puesto del usuario:

ejemplo, un Asesor Financiero es de sucursal "Cabo San Lucas" y Pertenece a la Zona II (por la sucursal) y su jefe directo es el Gerente de la sucursal "Cabo San Lucas" que a su vez pertenece a la Zona II y su jefe directo es el Subdirector Comercial de la Zona II, tambien hay otros puestos como Asesor Comercial, Coordinador de Línea Revolvente (el Líder de Coordinación, que es el jefe directo de los Coordinadores de Línea Revolvente (esto solo funciona asi en este puesto, es ocmo un jefe medio), todos los de una sucursal le responden al gerente y por ende al subdirector)

Esto es cuando una sucursal pertenece a lo que llamaremos internamente (Modelo Tradicional donde hay sucursales Físicas)

Pero tambien hay sucursales Digitales en otros estados, tambien tienen su propia Zona y todo, pero aqui no hay tantos puestos, operativos solo el Coordinador de Línea Revolvente, en  algunas tienen su Lider de coordinación, pero aqui no hay "gerentes" ni analistas sino que hay un Gerente Divisional, que tiene un alcance mucho mayor, practicamente igual al de un Subdirector pero con mayor ingerencia operativa.

Y el tema de los gestores de cobranza igual, pertenecen a una sucursal y por ende a una zona, pero ellos solo son administrados como  recurso y responden al gerente, pero en realidad trabajan y son dirigidos por un Ejecutivo de Recuperación que vendria siendo iogual de alcance regional, y esto aoplica para las versiones tradicvional y digital.

este Ejecutivo de Recuperación tiene mucho alcance , pero not tiene un rango mayor al de un gerente divisional y menos igual al de un subdirector comercial.

en el caso de cobranza hay 4 segmentos o equipos importantes, Cobranza Administrativa, Extrajudicial, Judicial y Judicial Espécial (cada uno con sus Coordinadores (estos tienen un alcance de direccion es decir de todas las zonas y sucursalles (cada uno) poero en rearquia son mas como un gerente dividisional pero de todo lo de su propio equipo.))

ZONA	SUCURSAL
ZONA I	CABORCA
ZONA I	GUAYMAS
ZONA I	HERMOSILLO
ZONA I	HUATABAMPO
ZONA I	NAVOJOA
ZONA I	OBREGON
ZONA I	PUERTO PEÑASCO
ZONA II	CABO SAN LUCAS
ZONA II	CONSTITUCIÓN
ZONA II	LA PAZ
ZONA II	LORETO
ZONA II	SAN JOSE DEL CABO
ZONA II	SANTA ROSALIA
ZONA II	VIZCAINO
ZONA III	ENSENADA
ZONA VII	GOMEZ PALACIO
ZONA III	GUADALUPE VICTORIA
ZONA III	MEXICALI
ZONA III	MOD ENSENADA
ZONA III	SAN LUIS RIO COLORADO
ZONA III	SAN QUINTÍN
ZONA III	TIJUANA
ZONA IV	CHIHUAHUA
ZONA IV	DELICIAS
ZONA IV	GUAMUCHIL
ZONA IV	MAZATLÁN
ZONA V	POZA RICA
ZONA IV	PUERTO VALLARTA
ZONA V	TAMPICO NORTE
ZONA VI	TEPIC
ZONA IV	TORREON
ZONA V	TUXPAN
