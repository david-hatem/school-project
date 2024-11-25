import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash2Icon } from "lucide-react";
import type { Branch } from "../types";
import { createBranch, updateBranch, updateSub } from "../services/api";
import axios from "axios";
import ConfirmationDialog from "../components/ConfirmationDialog";

const data: Branch[] = [
  {
    id: 1,
    nom_filiere: "Sciences Mathematiques",
    description: "Filiere de Sciences Mathematiques",
    created_at: "2024-10-23T16:35:55.385793Z",
  },
  {
    id: 2,
    nom_filiere: "Sciences Physiques",
    description: "Filiere specialisée en physique et chimie",
    created_at: "2024-10-23T16:36:55.385793Z",
  },
  {
    id: 3,
    nom_filiere: "Sciences de la Vie et de la Terre",
    description: "Filiere axée sur la biologie et la géologie",
    created_at: "2024-10-23T16:37:55.385793Z",
  },
  {
    id: 4,
    nom_filiere: "Sciences Economiques",
    description: "Filiere d'économie et gestion",
    created_at: "2024-10-23T16:38:55.385793Z",
  },
  {
    id: 5,
    nom_filiere: "Lettres et Sciences Humaines",
    description: "Filiere littéraire et sciences humaines",
    created_at: "2024-10-23T16:39:55.385793Z",
  },
  {
    id: 6,
    nom_filiere: "Sciences Techniques",
    description: "Filiere des sciences de l'ingénieur",
    created_at: "2024-10-23T16:40:55.385793Z",
  },
  {
    id: 7,
    nom_filiere: "Arts Appliqués",
    description: "Filiere des arts et du design",
    created_at: "2024-10-23T16:41:55.385793Z",
  },
  {
    id: 8,
    nom_filiere: "Sciences Agronomiques",
    description: "Filiere d'agriculture et sciences agronomiques",
    created_at: "2024-10-23T16:42:55.385793Z",
  },
];

interface BranchFormData {
  nom_filiere: string;
  description: string;
}

function BranchForm({
  onSubmit,
  onClose,
  initialData,
}: {
  onSubmit: (data: BranchFormData) => void;
  onClose: () => void;
  initialData?: Branch;
}) {
  const [formData, setFormData] = useState<BranchFormData>({
    nom_filiere: initialData?.nom_filiere || "",
    description: initialData?.description || "",
  });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSubmit(formData);
  //   onClose();
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdBranch = !initialData
      ? await createBranch(formData)
      : await updateBranch(formData, initialData?.id);
    onSubmit(formData);
    onClose();
    if (!initialData) {
      if (createdBranch) {
        alert("Branch created successfully!");
      } else {
        alert("Failed to create branch.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Branch Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.nom_filiere}
          onChange={(e) =>
            setFormData({ ...formData, nom_filiere: e.target.value })
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>
      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialData ? "Update Branch" : "Add Branch"}
        </button>
      </div>
    </form>
  );
}

function BranchDetails({
  branch,
  onClose,
}: {
  branch: Branch;
  onClose: () => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Branch Name
        </label>
        <p className="mt-1 text-sm text-gray-900">{branch.nom_filiere}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <p className="mt-1 text-sm text-gray-900">{branch.description}</p>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Created At
        </label>
        <p className="mt-1 text-sm text-gray-900">
          {new Date(branch.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Branches() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [branches, setBranches] = useState([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns: ColumnDef<Branch>[] = [
    {
      header: "Branch Name",
      accessorKey: "nom_filiere",
      cell: ({ row }) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {row.original.nom_filiere}
        </span>
      ),
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString(),
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <button
            onClick={() => row.original.onView?.(row.original)}
            className="p-1 text-blue-600 hover:text-blue-800"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => row.original.onEdit?.(row.original)}
            className="p-1 text-gray-600 hover:text-gray-800"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            // onClick={() => row.original.onEdit?.(row.original)}
            onClick={() => setIsDialogOpen(true)}
            className="p-1 text-gray-600 hover:text-gray-800"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>
          <ConfirmationDialog
            isOpen={isDialogOpen}
            onConfirm={async () => {
              await axios.delete(
                `http://167.114.0.177:81/filieres/delete/${row.original?.id}/`,
                {
                  headers: {
                    "Content-Type": "application/json", // Define content type as JSON
                  },
                }
              );
              setIsDialogOpen(false);
            }}
            onCancel={() => setIsDialogOpen(false)}
            message="Do you really want to delete."
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    // Fetch data from the API
    fetch("http://167.114.0.177:81/filiere_list/")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBranches(data);
        setIsLoading(false);
      })
      .catch((err) => {
        // setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleAddBranch = (formData: BranchFormData) => {
    const newBranch: Branch = {
      ...formData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    setBranches([...branches, newBranch]);
  };

  const handleEditBranch = (formData: BranchFormData) => {
    if (!selectedBranch) return;

    const updatedBranches = branches.map((branch) =>
      branch.id === selectedBranch.id ? { ...branch, ...formData } : branch
    );
    setBranches(updatedBranches);
  };

  const handleViewBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEditModalOpen(true);
  };

  const branchesWithActions = branches.map((branch) => ({
    ...branch,
    onView: handleViewBranch,
    onEdit: handleEditClick,
  }));

  if (isLoading) {
    return <LoadingSpinner />;
  }

  useEffect(() => {
    document.title = "Branches";
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Branches</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Add Branch
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <DataTable
          columns={columns}
          data={branchesWithActions}
          searchPlaceholder="Search branches..."
        />
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Branch"
      >
        <BranchForm
          onSubmit={handleAddBranch}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedBranch(null);
        }}
        title="Edit Branch"
      >
        {selectedBranch && (
          <BranchForm
            onSubmit={handleEditBranch}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedBranch(null);
            }}
            initialData={selectedBranch}
          />
        )}
      </Modal>

      {/* View Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedBranch(null);
        }}
        title="Branch Details"
      >
        {selectedBranch && (
          <BranchDetails
            branch={selectedBranch}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedBranch(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default Branches;
