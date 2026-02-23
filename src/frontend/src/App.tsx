import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import StorefrontPage from './pages/StorefrontPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: StorefrontPage
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/cart',
  component: CartPage
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/checkout',
  component: CheckoutPage
});

const successRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/payment-success',
  component: PaymentSuccessPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  cartRoute,
  checkoutRoute,
  successRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
