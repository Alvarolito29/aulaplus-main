// Mock manual de react-router-dom para Jest
export const useNavigate = () => jest.fn();
export const Link = ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>;
export const BrowserRouter = ({ children }) => children;
export const Routes = ({ children }) => children;
export const Route = () => null;
