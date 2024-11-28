"use client";
import React, { useState, useEffect } from "react";

// Helper function to make API requests
const fetchData = async (url, method = "GET", body = null) => {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : null,
  });
  const data = await response.json();
  return data;
};

const UserSettings = () => {
  const [activeKey, setActiveKey] = useState("userInfo");
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone_number: "",
    logo: "",
    product_name: "",
  });
  const [apiKeys, setApiKeys] = useState([]);
  const [newApiKey, setNewApiKey] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch user info and API keys from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchData("/api/profile", "GET");
      if (userData.data) {
        setUserInfo(userData.data[0]);
      }

      const keysData = await fetchData("/api/apiKeys", "GET");
      if (keysData.api_keys) {
        setApiKeys(keysData.api_keys);
      }
    };

    fetchUserData();
  }, []);

  const handleGenerateApiKey = async () => {
    const response = await fetchData("/api/apiKeys", "POST");
    debugger;
    if (response.api_key) {
      setNewApiKey(response.api_key);
      setApiKeys([...apiKeys, { api_key : response.api_key}]);
      setShowModal(true);
    }
  };

  const handleDeleteApiKey = async (key) => {
    const response = await fetchData("/api/apiKeys", "DELETE", { id: key.id });
    if (response.success) {
      setApiKeys(apiKeys.filter((apiKey) => apiKey.apiKey !== key.apiKey));
    }
  };

  const handleSaveUserInfo = async () => {
    const response = await fetchData("/api/profile", "PUT", userInfo);
    if (response.success) {
      alert("User info updated successfully");
    } else {
      alert("Error updating user info");
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Tab Container */}
      <div className="tabs flex space-x-4 mb-5">
        <button
          className={`tab ${activeKey === "userInfo" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveKey("userInfo")}
        >
          User Info
        </button>
        <button
          className={`tab ${activeKey === "apiKeys" ? "text-blue-600" : "text-gray-600"}`}
          onClick={() => setActiveKey("apiKeys")}
        >
          API Keys
        </button>
      </div>

      {/* User Info Tab */}
      {activeKey === "userInfo" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">User Info</h3>
          <div className="bg-white p-5 shadow rounded-lg">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  value={userInfo.phone_number}
                  onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Logo URL</label>
                <input
                  type="text"
                  value={userInfo.logo}
                  onChange={(e) => setUserInfo({ ...userInfo, logo: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  value={userInfo.product_name}
                  onChange={(e) => setUserInfo({ ...userInfo, product_name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
                onClick={handleSaveUserInfo}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeKey === "apiKeys" && (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">API Keys</h3>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700"
            onClick={handleGenerateApiKey}
          >
            Generate API Key
          </button>

          <div className="mt-5 space-y-3">
            {apiKeys.map((key, index) => (
              <div key={index} className="flex justify-between items-center bg-white p-4 shadow rounded-lg">
                <span className="text-gray-700">{key.api_key.slice(0, 6)}******</span>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  onClick={() => handleDeleteApiKey(key)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for API Key */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">API Key Generated</h3>
            <pre className="text-lg font-mono bg-gray-100 p-2 rounded-md">{newApiKey}</pre>
            <div className="mt-4 flex justify-between items-center">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => navigator.clipboard.writeText(newApiKey)}
              >
                Copy API Key
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;
