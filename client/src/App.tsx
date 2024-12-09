import { Link, NavLink, Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">
          🔺 Wild Series
        </Link>

        <div className="header-controls">
          <div className="filters">
            <button
              type="button"
              className="filter-button"
              data-filter="category"
            >
              <span>Catégorie</span>
            </button>
            <button type="button" className="filter-button" data-filter="actor">
              <span>Acteur</span>
            </button>
          </div>

          <div className="user-controls">
            <span className="user-avatar">👤</span>
            <div className="user-profile">
              <span>John Doe</span>
              <div className="status-indicator">🙋</div>
            </div>
            <div className="settings-icon">⚙️</div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <nav>
          <NavLink to="/programs">
            <button type="button" className="black-button">
              Toutes les séries
            </button>
          </NavLink>
        </nav>
        <div className="programs-grid">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
