export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span>© {new Date().getFullYear()} Gift House. All rights reserved.</span>
        <span>Secure checkout powered by Stripe.</span>
      </div>
    </footer>
  );
}
