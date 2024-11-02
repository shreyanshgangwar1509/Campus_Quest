
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Bar } from "react-chartjs-2"; // Install chart.js and react-chartjs-2

export default function DashboardPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    router.push("/login");
    return null;
  }

  const [data, setData] = useState({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Sales",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white shadow-lg">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="text-sm mt-2">Welcome, {session.user.name}</p>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a href="/dashboard" className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4.586l3.293 3.293 1.414-1.414L12 12V8z" /></svg>
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard/profile" className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11.403V20H8V11.403M4 8V4h16v4M4 20h16v4H4v-4z" /></svg>
                Profile
              </a>
            </li>
            <li>
              <a href="/dashboard/settings" className="flex items-center py-2 px-4 hover:bg-blue-700 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405 2.449A1 1 0 0118 21H6a1 1 0 01-.595-1.805L7 17h5m0-5h5l-1.405 2.449A1 1 0 0118 11H6a1 1 0 01-.595-1.805L7 7h5" /></svg>
                Settings
              </a>
            </li>
            <li>
              <button onClick={() => signOut()} className="flex items-center w-full text-left py-2 px-4 hover:bg-blue-700 transition-all">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h-6m0 0h6m-6 0V6m0 6l-6 6m6-6l6 6" /></svg>
                Sign Out
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Home</h1>
        <p className="mt-4 text-gray-600">This is your dashboard where you can manage your account, view settings, and more.</p>

        {/* Chart Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Sales Overview</h2>
          <Bar data={data} options={{ responsive: true }} />
        </div>

        {/* Data Table Section */}
        <div className="mt-6 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700">Recent Transactions</h2>
          <table className="min-w-full mt-4 divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">TXN-{index + 1000}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">2024-11-{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${(Math.random() * 100).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
