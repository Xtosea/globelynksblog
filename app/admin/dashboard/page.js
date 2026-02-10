"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    // Optional: decode JWT to show admin info
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.role !== "admin") {
      router.push("/admin/login");
      return;
    }

    setUser(payload);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {user && (
          <p className="mb-4">
            Welcome, <strong>{user.email}</strong>! Role: {user.role}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
            onClick={() => router.push("/admin/publish")}
          >
            Publish Post
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
            onClick={() => router.push("/admin/posts")}
          >
            Manage Posts
          </button>

          <button
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded"
            onClick={() => router.push("/admin/users")}
          >
            Manage Users
          </button>
        </div>
      </div>
    </main>
  );
}