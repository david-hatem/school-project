import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

interface Expense {
  id: number;
  date: string;
  libelle: string;
  montant: number;
  created_at: string;
}

const columns: ColumnDef<Expense>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    header: 'Libellé',
    accessorKey: 'libelle',
  },
  {
    header: 'Montant',
    accessorKey: 'montant',
    cell: ({ row }) => (
      <span className="font-medium">
        ${row.original.montant.toLocaleString()}
      </span>
    ),
  },
  {
    header: 'Créé à',
    accessorKey: 'created_at',
    cell: ({ row }) => new Date(row.original.created_at).toLocaleString(),
  },
];

const initialData: Expense[] = [
  {
    id: 1,
    date: '2024-03-15',
    libelle: 'Fournitures de bureau',
    montant: 250.00,
    created_at: '2024-03-15T10:30:00Z'
  },
  {
    id: 2,
    date: '2024-03-14',
    libelle: 'Maintenance équipement',
    montant: 500.00,
    created_at: '2024-03-14T15:45:00Z'
  },
  {
    id: 3,
    date: '2024-03-13',
    libelle: 'Facture électricité',
    montant: 350.00,
    created_at: '2024-03-13T09:20:00Z'
  }
];

interface ExpenseFormData {
  date: string;
  libelle: string;
  montant: number;
}

function ExpenseForm({ onSubmit, onClose }: { onSubmit: (data: ExpenseFormData) => void; onClose: () => void }) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: new Date().toISOString().split('T')[0],
    libelle: '',
    montant: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Libellé</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.libelle}
          onChange={(e) => setFormData({ ...formData, libelle: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Montant</label>
        <input
          type="number"
          required
          min="0.01"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.montant || ''}
          onChange={(e) => setFormData({ ...formData, montant: parseFloat(e.target.value) })}
        />
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
}

function Expenses() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState(initialData);

  const handleAddExpense = (formData: ExpenseFormData) => {
    const newExpense: Expense = {
      ...formData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    setExpenses([newExpense, ...expenses]);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.montant, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dépenses</h1>
          <p className="text-sm text-gray-500">
            Total: ${totalAmount.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Dépense</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <DataTable
          columns={columns}
          data={expenses}
          searchPlaceholder="Rechercher des dépenses..."
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle Dépense"
      >
        <ExpenseForm
          onSubmit={handleAddExpense}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Expenses;