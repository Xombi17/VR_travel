"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testClientAuth = () => {
    if (status === "authenticated") {
      toast.success("Client-side Authentication Successful", {
        description: `Logged in as ${session?.user?.name || session?.user?.email}`,
      });
    } else {
      toast.error("Client-side Authentication Failed", {
        description: "You are not authenticated",
      });
    }
  };

  const testServerAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/test-auth");
      const data = await response.json();
      setApiResponse(data);
      
      if (response.ok) {
        toast.success("Server-side Authentication Successful", {
          description: `API confirms you are authenticated as ${data.session?.user?.name || data.session?.user?.email}`,
        });
      } else {
        toast.error("Server-side Authentication Failed", {
          description: data.message || "You are not authenticated",
        });
      }
    } catch (error) {
      toast.error("API Request Failed", {
        description: "Could not connect to the authentication test API",
      });
    } finally {
      setLoading(false);
    }
  };

  const testProtectedApi = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/protected");
      const data = await response.json();
      
      if (response.ok) {
        toast.success("Protected API Access Successful", {
          description: "You have access to the protected API",
        });
      } else {
        toast.error("Protected API Access Failed", {
          description: data.error || "You do not have access to the protected API",
        });
      }
    } catch (error) {
      toast.error("API Request Failed", {
        description: "Could not connect to the protected API",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Authentication Test Page</h1>
        <p className="text-gray-400">Test various authentication methods</p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-xl bg-gray-900/60 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold">Current Authentication Status</h2>
          <div className="mb-4 rounded-lg bg-gray-800 p-4">
            <p className="mb-2">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  status === "authenticated"
                    ? "bg-green-500/20 text-green-400"
                    : status === "loading"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {status === "authenticated"
                  ? "Authenticated"
                  : status === "loading"
                  ? "Loading"
                  : "Not Authenticated"}
              </span>
            </p>
            {status === "authenticated" && session?.user && (
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-medium">User ID:</span> {session.user.id || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Name:</span> {session.user.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {session.user.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Session Expires:</span>{" "}
                  {session.expires ? new Date(session.expires).toLocaleString() : "N/A"}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 rounded-xl bg-gray-900/60 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold">Test Authentication</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <button
              onClick={testClientAuth}
              className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-500"
            >
              Test Client Auth
            </button>
            <button
              onClick={testServerAuth}
              className="rounded-lg bg-purple-600 px-4 py-3 font-medium text-white hover:bg-purple-500"
              disabled={loading}
            >
              {loading ? "Testing..." : "Test Server Auth"}
            </button>
            <button
              onClick={testProtectedApi}
              className="rounded-lg bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-500"
              disabled={loading}
            >
              {loading ? "Testing..." : "Test Protected API"}
            </button>
          </div>
        </div>

        {apiResponse && (
          <div className="rounded-xl bg-gray-900/60 p-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold">API Response</h2>
            <pre className="overflow-auto rounded-lg bg-gray-800 p-4 text-sm">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
