import { Navigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

/**
 * Componente que protege rutas según el rol del usuario
 * Si el usuario no tiene el rol requerido, redirige a la página de inicio
 */
function RoleProtectedRoute({ children, allowedRoles }) {
    const isAuthenticated = AuthService.isAuthenticated();
    const user = AuthService.getCurrentUser();
    
    // Si no hay usuario, redirigir al login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }
    
    // Si se especifican roles permitidos, verificar que el usuario tenga uno de esos roles
    if (allowedRoles && allowedRoles.length > 0) {
        const hasPermission = allowedRoles.includes(user.rol);
        
        if (!hasPermission) {
            // Usuario no tiene permiso, mostrar mensaje y redirigir
            return (
                <div style={{ padding: '50px', textAlign: 'center' }}>
                    <h2>🚫 Acceso Denegado</h2>
                    <p>No tienes permisos para acceder a esta página.</p>
                    <p>Roles permitidos: {allowedRoles.join(', ')}</p>
                    <p>Tu rol: {user.rol}</p>
                    <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
                        Volver al inicio
                    </a>
                </div>
            );
        }
    }
    
    return children;
}

export default RoleProtectedRoute;
