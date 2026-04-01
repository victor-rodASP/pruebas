import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const STORAGE_KEY = 'bc-auth-session';

const API_LOGIN = import.meta.env.VITE_API_URL_LOGIN;

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [permisos, setPermisos] = useState([]); 
    const [loading, setLoading] = useState(true);

    const checkServerSession = async () => {
        try {
            const sessionResponse = await axios.post(`${API_LOGIN}/auth/sesion`, null, {
                withCredentials: true 
            });

            if (sessionResponse.data.codigo === 'OK' && sessionResponse.data.contenido === true) {
                
                const userResponse = await axios.get(`${API_LOGIN}/usuario`, {
                    withCredentials: true
                });

                const permisosResponse = await axios.get(`${API_LOGIN}/permisos`, {
                    withCredentials: true
                }).catch(() => ({ data: { contenido: [] } })); 

                if (userResponse.data.codigo === 'OK' && userResponse.data.contenido) {
                    const userData = userResponse.data.contenido;
                    const userPermisos = permisosResponse.data.contenido || [];

                    const nextSession = {
                        isAuthenticated: true,
                        name: userData.nombreUsuario || userData.nombre || 'Usuario',
                        idArea: userData.idArea, 
                        puestoId: userData.puestoId || userData.puesto,
                        nombrePuesto: userData.puesto || 'Operativo',
                        sucursal: userData.sucursal || 'Matriz'
                    };

                    setSession(nextSession);
                    setPermisos(userPermisos);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
                } else {
                    throw new Error("No se pudo obtener el perfil del usuario");
                }

            } else {
                throw new Error("Sesión inválida");
            }
        } catch (error) {
            console.log("No hay sesión activa en el servidor o la cookie expiró.");
            setSession(null);
            setPermisos([]);
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkServerSession();
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${API_LOGIN}/auth/cerrar-sesion`, null, {
                withCredentials: true
            });
        } catch (error) {
            console.error("Error al cerrar sesión en el backend", error);
        } finally {
            setSession(null);
            setPermisos([]);
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = '/login'; 
        }
    };

    const tienePermiso = (nombrePermiso) => {
        return permisos.some(p => p.nombre === nombrePermiso);
    };

    const login = ({ email, password }) => {
        const nextSession = { email, isAuthenticated: true, name: 'Usuario Demo' };
        setSession(nextSession);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
    };

    return (
        <AuthContext.Provider value={{ 
            session, 
            permisos, 
            isAuthenticated: Boolean(session), 
            login, 
            logout, 
            checkServerSession, 
            tienePermiso, 
            loading 
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};