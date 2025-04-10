import { useEffect } from "react";
import { ClientTable } from "../components/tables/ClientTable.jsx";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useClientStore } from "../store/clientStore";

export const Clients = ({ setActiveTab, setEditingClient }) => {
  const clients = useClientStore((state) => state.clients);
  const fetchClients = useClientStore((state) => state.fetchClients);
  const loading = useClientStore((state) => state.loading);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <div className="bg-gray-50 min-h-screen text-textPrimary">
      <div className="flex justify-end items-center mb-4 w-full">
        <button
          onClick={() => setActiveTab("Add New Client")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition cursor-pointer"
        >
          <PlusIcon className="h-5 w-5" />
          Add New Client
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-indigo-600 font-medium">
            Loading clients...
          </div>
        ) : (
          <ClientTable
            clients={clients}
            setActiveTab={setActiveTab}
            setEditingClient={setEditingClient}
          />
        )}
      </div>
    </div>
  );
};
