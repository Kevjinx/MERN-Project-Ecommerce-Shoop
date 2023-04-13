import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import CartScreen from './screens/CartScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import AdminAllUsersScreen from './screens/AdminAllUsersScreen';
import AdminEditUserScreen from './screens/AdminEditUserScreen';
import AdminProductEditScreen from './screens/AdminEditProductScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:productId" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/checkout" element={<CheckoutScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/admin/users" element={<AdminAllUsersScreen />} />
            <Route
              path="/admin/users/:userId/edit"
              element={<AdminEditUserScreen />}
            />
            <Route
              path="/admin/products/:productId/edit"
              element={<AdminProductEditScreen />}
            />
            <Route path="/order/:orderId" element={<OrderDetailScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
