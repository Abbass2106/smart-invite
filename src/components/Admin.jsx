import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-container">
      <header className="header">
          <h1>Smart Invite</h1>
       
        <nav className="nav-links">
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <a href="">Logout</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Your Love Story Deserves More Than Paper</h1>
        <p>Celebrate your journey with beautifully crafted, interactive wedding invites that feel as special as your big day..</p>
      </section>

      <div className="feature-grid">
        <Link to="/create-event" className="feature-card">
          <div className="card-header">Create Event</div>
        </Link>

        <Link to="/view-events" className="feature-card">
          <div className="card-header">View Events</div>
        </Link>

        <Link to="/view-guest" className="feature-card">
          <div className="card-header">View Guest</div>
        </Link>

        <Link to="/manual-checkin" className="feature-card">
          <div className="card-header">Manual Card Check-in</div>
        </Link>
      </div>

      <footer className="footer" id="contact">
        <p>© 2025 Smart Invite. All rights reserved.</p>
        <p>Contact: 2025elections@gmail.com | Phone: (255) 0625391553</p>
        <p>Address: Mbeya, Tanzania</p>
      </footer>
    </div>
  )
}

export default Admin
