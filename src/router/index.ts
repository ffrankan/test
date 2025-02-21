import { createBrowserRouter } from 'react-router-dom';

import routes from './routes';

//可传第二个参数，配置base路径 { basename: "/app"}
const router = createBrowserRouter(routes,
    {
        future: {
            v7_relativeSplatPath: true, // Enables relative paths in nested routes
            v7_fetcherPersist: true,   // Retains fetcher state during navigation
            v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
            v7_partialHydration: true, // Supports partial hydration for server-side rendering
            v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
        },
    }
);

export default router;
