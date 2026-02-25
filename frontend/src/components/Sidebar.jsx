import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="w-64 bg-gray-900 text-white h-screen p-5">
            <h1 className="text-2xl font-bold mb-10">DSCMS</h1>

            <ul className="space-y-4">
                <li><Link to="/dashboard/home">Home</Link></li>
                <li><Link to="/dashboard/new-entry">New Entry</Link></li>
                <li><Link to="/dashboard/services">Services</Link></li>
                <li><Link to="/dashboard/reports">Reports</Link></li>
                <li><Link to="/dashboard/history">History</Link></li>
            </ul>

            <div className="absolute bottom-5">
                <button className="bg-red-500 px-4 py-2 rounded">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Sidebar;