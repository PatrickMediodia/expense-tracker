import logo from '../assets/logo.svg';

function Navbar() {
  return (
    <div className="nav">
      <img src={logo} className="nav-img"></img>
      <h1 className="nav-header">Expense Tracker</h1>
      <ul className="nav-items">
        <li>About</li>
        <li>Expenses</li>
        <li>Tips & Tricks</li>
      </ul>
    </div>
  );
}

export default Navbar