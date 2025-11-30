import { Navigate } from 'react-router-dom';

/**
 * Componente que protege rutas según el rol del usuario
 * Si el usuario no tiene el rol requerido, redirige a la página de inicio
 */
function RoleProtectedRoute({ children, allowedRoles }) {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    
    // Si no hay usuario, redirigir al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    
    // Si se especifican roles permitidos, verificar que el usuario tenga uno de esos roles
    if (allowedRoles && allowedRoles.length > 0) {
        const userRole = user.rol?.toLowerCase();
        const hasPermission = allowedRoles.some(role => role.toLowerCase() === userRole);
        
        if (!hasPermission) {
            // Usuario no tiene permiso, mostrar mensaje y redirigir
            alert(`Acceso denegado. Esta sección es solo para: ${allowedRoles.join(', ')}`);
            return <Navigate to="/" replace />;
        }
    }
    
    return children;
}

export default RoleProtectedRoute;
