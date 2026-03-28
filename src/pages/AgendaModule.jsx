import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; 
import {
    ClipboardList,
    MapPin,
    CheckCircle2,
    UserCircle2
} from 'lucide-react';
import PlaneacionOperativo from './Agenda/PlaneacionOperativo';
import PlaneacionJefe from './Agenda/PlaneacionJefe';
import EjecucionOperativo from './Agenda/EjecucionOperativo';
import EjecucionJefe from './Agenda/EjecucionJefe';

const AgendaModule = () => {
    const { session } = useAuth();
    const [activeTab, setActiveTab] = useState('planeacion');

    const tabs = [
        { id: 'planeacion', label: 'Planeación', icon: ClipboardList },
        { id: 'ejecucion', label: 'Ejecución', icon: MapPin },
        { id: 'cierre', label: 'Cierre', icon: CheckCircle2 },
    ];

    const isOperativo = () => {
        if (!session?.nombrePuesto) return true; 
        
        const puesto = session.nombrePuesto.toUpperCase();
        const rolesJefe = ['GERENTE', 'DIRECTOR', 'COORD', 'EJECUTIVO', 'JEFE', 'SUBDIR'];
        
        const isJefe = rolesJefe.some(rol => puesto.includes(rol));
        return !isJefe; 
    };

    const isUserOperativo = isOperativo();

    const renderContent = () => {
        switch (activeTab) {
            case 'planeacion':
                return isUserOperativo ? <PlaneacionOperativo /> : <PlaneacionJefe />;
            case 'ejecucion':
                return isUserOperativo ? <EjecucionOperativo /> : <EjecucionJefe />;
            case 'cierre':
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h2 className="text-2xl font-black text-primary uppercase">Fase C: Cierre de Jornada</h2>
                        <div className="mt-12 p-20 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-300">
                            <CheckCircle2 size={48} className="mb-4 opacity-20" />
                            <p className="font-bold uppercase tracking-widest text-xs">Módulo en Desarrollo</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            {/* Header Info Actualizado con Datos Reales */}
            <div className="flex justify-between items-end mb-1">
                <div className="flex flex-col">
                    <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Módulo de Operación</h1>
                </div>
                
                {/* Pintamos los datos reales del backend */}
                <div className="text-right flex flex-col items-end">
                    <span className="text-[11px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
                        <UserCircle2 size={12} className="text-blue-500" />
                        {session?.name || 'Usuario'}
                    </span>
                    <span className="text-[9px] font-mono-tech text-accent opacity-60 mt-0.5">
                        {session?.nombrePuesto?.toUpperCase()} | SUC: {session?.sucursal?.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-end">
                <div className="glass-panel p-1 flex gap-1 rounded-xl bg-white/50 backdrop-blur-sm border-slate-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                flex items-center gap-2 px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-300
                                ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'text-accent hover:bg-slate-50 hover:text-primary'}
                            `}
                        >
                            <tab.icon size={12} />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    );
};

export default AgendaModule;