function AppLayout({ children }) {
  return (
    <div style={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '40px 20px',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      minHeight: '80vh'
    }}>
      {children}
    </div>
  );
}

export default AppLayout;