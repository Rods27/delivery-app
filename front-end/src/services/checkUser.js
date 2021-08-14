export default function checkUser(history) {
  const token = JSON.parse(localStorage.getItem('user'));
  const { location: { pathname } } = history;
  if (token && token.token) {
    const { role } = token;
    if (role === 'customer' && !pathname.includes('/customer/')) {
      history.push('/customer/products');
    }
    if (role === 'seller' && !pathname.includes('/seller/')) {
      history.push('/seller/orders');
    }
    if (role === 'administrator' && pathname !== '/admin/manage') {
      history.push('/admin/manage');
    }
  } else {
    localStorage.setItem('user', JSON.stringify({}));
    history.push('/login');
    window.alert('Por favor, faça o login.');
  }
}
