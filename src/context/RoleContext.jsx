import React, { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const roles = [
    // === CANAL COMERCIAL - OPERATIVOS ===
    { id: 'asesor-f', name: 'Asesor Financiero', category: 'Operativo', canal: 'comercial' },
    { id: 'asesor-c', name: 'Asesor Comercial', category: 'Operativo', canal: 'comercial' },
    { id: 'coordinador-l', name: 'Coordinador de Línea Revolvente', category: 'Operativo', canal: 'comercial' },
    { id: 'asesor-nuevo', name: 'Asesor en Formación (sin agenda)', category: 'Operativo', canal: 'comercial' },
    // === CANAL COBRANZA - OPERATIVO ===
    { id: 'gestor-i', name: 'Gestor Interno', category: 'Operativo', canal: 'cobranza' },
    // === CANAL COMERCIAL - JEFES ===
    { id: 'gerente', name: 'Gerente de Sucursal', category: 'Jefe', canal: 'comercial', nivel: 1 },
    { id: 'subdirector', name: 'Subdirector / Gerente Divisional', category: 'Jefe', canal: 'comercial', nivel: 2 },
    { id: 'director', name: 'Director General', category: 'Jefe', canal: 'comercial', nivel: 3 },
    // === CANAL COBRANZA - JEFES ===
    { id: 'ejecutivo-cob', name: 'Ejecutivo de Cobranza', category: 'Jefe', canal: 'cobranza', nivel: 1 },
    { id: 'coord-cob', name: 'Coordinador de Cobranza', category: 'Jefe', canal: 'cobranza', nivel: 2 },
    { id: 'subdir-cob', name: 'Subdirector de Cobranza', category: 'Jefe', canal: 'cobranza', nivel: 3 },
];

export const RoleProvider = ({ children }) => {
    const [selectedRole, setSelectedRole] = useState(roles[0]);

    return (
        <RoleContext.Provider value={{ selectedRole, setSelectedRole, roles }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error('useRole must be used within a RoleProvider');
    }
    return context;
};
