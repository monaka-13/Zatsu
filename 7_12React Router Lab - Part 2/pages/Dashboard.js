import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="stats">Stats</Link>
          </li>
          <li>
            <Link to="settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* Linkの向き先のstatsとかsettingsの中身が飛ばされてくる感じ？ */}
    </div>
  );
}

export default Dashboard;
