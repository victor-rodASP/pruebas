import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const AgendaContext = createContext();

export const AgendaProvider = ({ children }) => {
    const { session } = useAuth();
    
    const [clientsDatabase, setClientsDatabase] = useState([]);
    
    const [catalogs, setCatalogs] = useState({
        productos: [],
        canales: [],
        gestiones: [],
        destinos: []
    });

    useEffect(() => {
        if (!session?.isAuthenticated) return;

        const loadInitialData = async () => {
            try {
                const API_COBRANZA = import.meta.env.VITE_API_ORIGIN_COBRANZA;
                
                const [resCartera, resContactos, resProd, resCanales, resGestiones, resDestinos] = await Promise.all([
                    axios.get(`${API_COBRANZA}/cartera/usuario`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } })),
                    axios.get(`${API_COBRANZA}/contactos/usuario`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } })),
                    axios.get(`${API_COBRANZA}/catalogos/productos`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } })),
                    axios.get(`${API_COBRANZA}/catalogos/canales`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } })),
                    axios.get(`${API_COBRANZA}/catalogos/gestiones`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } })),
                    axios.get(`${API_COBRANZA}/catalogos/destinos`, { withCredentials: true }).catch(() => ({ data: { contenido: [] } }))
                ]);

                setCatalogs({
                    productos: resProd.data?.contenido || [],
                    canales: resCanales.data?.contenido || [],
                    gestiones: resGestiones.data?.contenido || [],
                    destinos: resDestinos.data?.contenido || []
                });

                let unifiedData = [];

                if (resCartera.data?.codigo === 'OK' && resCartera.data?.contenido) {
                    const clientes = resCartera.data.contenido.map(c => ({
                        idControl: c.control?.idControl,
                        idCliente: c.cliente?.idCliente,
                        name: c.cliente?.nombre?.toUpperCase() || 'S/N',
                        classification: 'Cliente',
                        city: '',
                        colony: '',
                        streets: c.cliente?.domicilio || c.control?.domicilio || '',
                        phones: [c.cliente?.telefono || c.control?.telefono || '', '', ''],
                        idCredito: c.control?.control || '',
                        saldoActual: c.control?.saldo || 0,
                        saldoInicioMes: c.control?.saldo || 0, 
                        moraActual: c.control?.diasMora || 0,
                        moraInicioMes: c.control?.diasMora || 0, 
                        ultimoEstatus: c.control?.estatus || 'VIGENTE'
                    }));
                    unifiedData = [...unifiedData, ...clientes];
                }

                if (resContactos.data?.codigo === 'OK' && resContactos.data?.contenido) {
                    const contactos = resContactos.data.contenido.map(c => ({
                        idContacto: c.idContacto,
                        name: c.nombre?.toUpperCase() || 'S/N',
                        classification: c.clasificacion === 'CONTACTO' ? 'Contacto' : 'Prospecto',
                        city: '',
                        colony: '',
                        streets: c.domicilio || '',
                        phones: [c.telefono || '', '', ''],
                        estimatedAmount: c.monto || 0,
                    }));
                    unifiedData = [...unifiedData, ...contactos];
                }

                setClientsDatabase(unifiedData);
            } catch (error) {
                console.error("Error cargando datos iniciales:", error);
            }
        };

        loadInitialData();
    }, [session?.isAuthenticated]);

    const createEmptyRows = (segmentName, count = 2) => {
        return Array.from({ length: count }, (_, i) => {
            const base = { id: Math.random().toString(36).substr(2, 9), time: '', name: '', isNew: true };
            
            const nameLower = segmentName.toLowerCase();

            if (nameLower.includes('promoción') || nameLower.includes('promocion')) {
                return { ...base, classification: 'Prospecto', product: '', activity: '', city: '', colony: '', streets: '', phones: ['', '', ''] };
            }
            if (nameLower.includes('evaluación') || nameLower.includes('integración')) {
                return {
                    ...base, classification: 'Prospecto', typeIntegration: 'Nuevo', product: '',
                    estimatedAmount: '', annualRate: '0.00%', subProduct: 'NINGUNO', program: 'NINGUNO',
                    activity: 'Integración', city: '', colony: '', streets: '', portfolioStatus: 'N/A'
                };
            }
            if (nameLower.includes('seguimiento') || nameLower.includes('cartera') || nameLower.includes('visita') || nameLower.includes('compromiso')) {
                return {
                    ...base, idCredito: '', moraInicioMes: '0', moraActual: '0', saldoInicioMes: '0', saldoActual: '0',
                    categoriaGestion: 'preventivo', ultimoEstatus: 'Puntual', ultimaFechaPago: '-', fechaVencimiento: '-',
                    montoAmortizacion: '0', montoRequeridoCorriente: '0', herramientaAplicada: 'Ninguna', herramientaAplicar: 'Ninguna', typeManagement: ''
                };
            }
            return base;
        });
    };

    const emptyKpi = {};

    const [currentAgenda, setCurrentAgenda] = useState({
        status: 'edicion', 
        segments: {}, 
        kpiCompromisos: { ...emptyKpi },
        kpiReal: {},
        checkIns: {},
        unplannedVisits: [],
        metadata: { captureDate: '', captureTime: '', role: '', userName: 'Usuario', hasModifications: false }
    });

    const [agendas, setAgendas] = useState([]);
    const [scheduledFollowUps, setScheduledFollowUps] = useState([]);

    const getVisibleSegments = () => {
        return Object.keys(currentAgenda.segments || {});
    };

    const updateVisit = (segmentName, index, field, value) => {
        setCurrentAgenda(prev => {
            const newSegments = { ...prev.segments };
            if (!newSegments[segmentName]) newSegments[segmentName] = [];
            
            const segmentRow = newSegments[segmentName][index];
            if (!segmentRow) return prev; 

            const updatedRow = { ...segmentRow, [field]: value };

            if (field === 'name' && value) {
                const match = clientsDatabase.find(item => item.name === value.toUpperCase());
                if (match) {
                    Object.keys(match).forEach(key => {
                        updatedRow[key] = match[key];
                    });
                }
            }

            newSegments[segmentName][index] = updatedRow;
            return { ...prev, segments: newSegments };
        });
    };

    const updateKpi = (field, value) => {
        setCurrentAgenda(prev => ({
            ...prev,
            kpiCompromisos: { ...prev.kpiCompromisos, [field]: value }
        }));
    };

    const updateKpiReal = (field, value) => {
        setCurrentAgenda(prev => ({
            ...prev,
            kpiReal: { ...prev.kpiReal, [field]: value }
        }));
    };

    const registerCheckIn = (visitId, data) => {
        setCurrentAgenda(prev => ({
            ...prev,
            checkIns: {
                ...prev.checkIns,
                [visitId]: { ...data, registeredAt: new Date().toISOString() }
            }
        }));
    };

    const addUnplannedVisit = (data) => {
        const id = Math.random().toString(36).substr(2, 9);
        setCurrentAgenda(prev => ({
            ...prev,
            unplannedVisits: [...(prev.unplannedVisits || []), { id, ...data, isUnplanned: true }]
        }));
    };

    const scheduleFollowUp = (visitSource, { fecha, monto }) => {
        setScheduledFollowUps(prev => [...prev, {
            ...visitSource,
            id: `fu-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            isFollowUp: true,
            time: null,
            compromisoFecha: fecha,
            compromisoCuanto: monto,
            isUnplanned: false,
            createdAt: new Date().toISOString(),
        }]);
    };

    const addRow = (segmentName) => {
        setCurrentAgenda(prev => {
            const newSegments = { ...prev.segments };
            if (!newSegments[segmentName]) newSegments[segmentName] = [];
            return { 
                ...prev, 
                segments: { ...newSegments, [segmentName]: [...newSegments[segmentName], createEmptyRows(segmentName, 1)[0]] } 
            };
        });
    };

    const removeRow = (segmentName, index) => {
        setCurrentAgenda(prev => {
            if (!prev.segments[segmentName]) return prev;
            const segment = [...prev.segments[segmentName]];
            segment.splice(index, 1);
            return { ...prev, segments: { ...prev.segments, [segmentName]: segment } };
        });
    };

    const validateAgenda = () => {
        const allVisits = Object.entries(currentAgenda.segments || {})
            .flatMap(([_, visits]) => visits.filter(v => v.name && v.time));

        const times = allVisits.map(v => v.time);

        if (times.length !== new Set(times).size) {
            return { valid: false, message: "No se pueden empalmar horarios exactos." };
        }

        const timeToMin = (t) => {
            const [h, m] = t.split(':').map(Number);
            return h * 60 + m;
        };

        const promoVisits = Object.entries(currentAgenda.segments || {})
            .filter(([name]) => name.toLowerCase().includes('promoción') || name.toLowerCase().includes('promocion'))
            .flatMap(([_, visits]) => visits.filter(v => v.name && v.time));

        for (const promo of promoVisits) {
            const pMin = timeToMin(promo.time);
            for (const other of allVisits) {
                if (promo.id === other.id) continue;
                const oMin = timeToMin(other.time);
                const diff = Math.abs(pMin - oMin);
                if (diff < 30) {
                    return {
                        valid: false,
                        message: `La visita de Promoción (${promo.time}) está muy cerca de "${other.name}" (${other.time}). Requiere al menos 30 min de espacio.`
                    };
                }
            }
        }

        return { valid: true };
    };

    const sendForAuthorization = async (bloquesConfig) => {
        const activeVisits = Object.entries(currentAgenda.segments || {})
            .flatMap(([_, visits]) => visits.filter(v => v.name));

        if (activeVisits.length === 0) {
            alert("Debes registrar al menos una visita para enviar la agenda.");
            return;
        }

        const validation = validateAgenda();
        if (!validation.valid) {
            alert(validation.message);
            return;
        }

        const fechaPlan = new Date().toISOString().split('T')[0]; 
        let acciones = [];

        Object.entries(currentAgenda.segments).forEach(([nombreBloque, visitas]) => {
            const bloqueInfo = bloquesConfig.find(b => b.nombre === nombreBloque);
            const idBloque = bloqueInfo ? Number(bloqueInfo.idBloque) : 0;
            const nameLower = nombreBloque.toLowerCase();
            
            const isCompromiso = nameLower.includes('compromiso');
            const isPromocion = nameLower.includes('promoción') || nameLower.includes('promocion');
            const isEval = nameLower.includes('evaluación') || nameLower.includes('integración');
            
            const isSeguimientoProspecto = Number(session.idArea) === 1; 

            visitas.filter(v => v.name && (v.time || isCompromiso)).forEach(v => {
                
                const isProspecto = isPromocion || isEval || (isSeguimientoProspecto && nameLower.includes('seguimiento'));
                
                const rawId = v.idControl || v.idCredito || v.idContacto;
                const idGenerico = rawId ? Number(rawId) : null;

                let accion = {
                    idBloque: idBloque,
                    idControl: isProspecto || isCompromiso ? null : idGenerico,
                    idContacto: isProspecto ? idGenerico : null,
                    
                    idDestino: v.destino ? Number(v.destino) : null,
                    idGestion: v.gestion ? Number(v.gestion) : null,
                    idCanal: v.canal ? Number(v.canal) : null,
                    idProducto: v.product ? Number(v.product) : null,
                    
                    hora: isCompromiso ? `${fechaPlan} 00:00` : `${fechaPlan} ${v.time}`,
                    actividad: v.activity || "",
                    direccion: v.streets || v.city || "",
                    telefono: v.phones?.[0] || ""
                };

                if (isCompromiso) {
                    accion.idControl = idGenerico;
                    accion.tipo = "PAGO";
                    accion.fechaCompromiso = v.fechaCompromiso || fechaPlan;
                    accion.monto = v.montoCompromiso || 0;
                } 

                acciones.push(accion);
            });
        });

        const payload = {
            idArea: Number(session.idArea),
            fecha: fechaPlan,
            acciones: acciones
        };

        console.log("🚀 Payload limpio y tipado para Spring Boot:", JSON.stringify(payload, null, 2));

        try {
            const API_COBRANZA = import.meta.env.VITE_API_ORIGIN_COBRANZA;
            const response = await axios.post(`${API_COBRANZA}/agenda/plan`, payload, {
                withCredentials: true
            });

            if (response.data.codigo === 'OK') {
                const now = new Date();
                setCurrentAgenda(prev => ({ 
                    ...prev, 
                    status: 'pendiente', 
                    metadata: { 
                        ...prev.metadata, 
                        captureDate: now.toLocaleDateString(), 
                        captureTime: now.toLocaleTimeString(), 
                        role: session?.nombrePuesto || 'Operativo' 
                    } 
                }));
            } else {
                alert("Atención del servidor: " + response.data.mensaje);
            }
        } catch (error) {
            console.error("Error al guardar plan:", error);
            const errorMsg = error.response?.data?.mensaje || "Hubo un error al certificar la jornada.";
            alert(`Error: ${errorMsg}`);
        }
    };

    const resetAgenda = () => {
        if (window.confirm("¿Seguro que deseas borrar toda la planificación? Esta acción no se puede deshacer.")) {
            setCurrentAgenda({ 
                status: 'edicion', 
                segments: {}, 
                kpiCompromisos: { ...emptyKpi }, 
                kpiReal: {}, 
                checkIns: {}, 
                unplannedVisits: [], 
                metadata: { ...currentAgenda.metadata, hasModifications: false } 
            });
            setScheduledFollowUps([]);
        }
    };

    const updateAgendaStatus = (id, status, notes = '') => {
        if (id === 'AJ-LOCAL') {
            setCurrentAgenda(prev => ({ ...prev, status, notes }));
        }
    };

    return (
        <AgendaContext.Provider value={{
            agendas, 
            currentAgenda, 
            updateVisit, 
            updateKpi,
            updateKpiReal,
            registerCheckIn,
            addUnplannedVisit,
            scheduleFollowUp,
            scheduledFollowUps,
            addRow, 
            removeRow, 
            sendForAuthorization, 
            resetAgenda, 
            getVisibleSegments,
            updateAgendaStatus,
            clientsDatabase,
            catalogs 
        }}>
            {children}
        </AgendaContext.Provider>
    );
};

export const useAgenda = () => useContext(AgendaContext);