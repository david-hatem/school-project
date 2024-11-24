import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';

interface BankWithdrawal {
  id: number;
  date: string;
  mode_paiement: 'Chèque' | 'Virement' | 'Espèces' | 'Carte Bancaire';
  montant: number;
  created_at: string;
}

const columns: ColumnDef<BankWithdrawal>[] = [
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    header: 'Mode de Paiement',
    accessorKey: 'mode_paiement',
    cell: ({ row }) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        {
          'Chèque': 'bg-blue-100 text-blue-800',
          'Virement': 'bg-green-100 text-green-800',
          'Espèces': 'bg-yellow-100 text-yellow-800',
          'Carte Bancaire': 'bg-purple-100 text-purple-800',
        }[row.original.mode_paiement]
      }`}>
        {row.original.mode_paiement}
      </span>
    ),
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

const initialData: BankWithdrawal[] = [
  {
    id: 1,
    date: '2024-03-15',
    mode_paiement: 'Chèque',
    montant: 2500.00,
    created_at: '2024-03-15T10:30:00Z'
  },
  {
    id: 2,
    date: '2024-03-14',
    mode_paiement: 'Virement',
    montant: 1800.00,
    created_at: '2024-03-14T15:45:00Z'
  },
  {
    id: 3,
    date: '2024-03-13',
    mode_paiement: 'Espèces',
    montant: 750.00,
    created_at: '2024-03-13T09:20:00Z'
  },
  {
    id: 4,
    date: '2024-03-12',
    mode_paiement: 'Carte Bancaire',
    montant: 1200.00,
    created_at: '2024-03-12T14:15:00Z'
  }
];

interface BankWithdrawalFormData {
  date: string;
  mode_paiement: BankWithdrawal['mode_paiement'];
  montant: number;
}

function BankWithdrawalForm({ onSubmit, onClose }: { onSubmit: (data: BankWithdrawalFormData) => void; onClose: () => void }) {
  const [formData, setFormData] = useState<BankWithdrawalFormData>({
    date: new Date().toISOString().split('T')[0],
    mode_paiement: 'Chèque',
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
        <label className="block text-sm font-medium text-gray-700">Mode de Paiement</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.mode_paiement}
          onChange={(e) => setFormData({ 
            ...formData, 
            mode_paiement: e.target.value as BankWithdrawal['mode_paiement']
          })}
        >
          <option value="Chèque">Chèque</option>
          <option value="Virement">Virement</option>
          <option value="Espèces">Espèces</option>
          <option value="Carte Bancaire">Carte Bancaire</option>
        </select>
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

function BankWithdrawals() {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState(initialData);

  const handleAddWithdrawal = (formData: BankWithdrawalFormData) => {
    const newWithdrawal: BankWithdrawal = {
      ...formData,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    setWithdrawals([newWithdrawal, ...withdrawals]);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const totalAmount = withdrawals.reduce((sum, withdrawal) => sum + withdrawal.montant, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sorties Banque</h1>
          <p className="text-sm text-gray-500">
            Total: ${totalAmount.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Sortie</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <DataTable
          columns={columns}
          data={withdrawals}
          searchPlaceholder="Rechercher des sorties..."
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Nouvelle Sortie Banque"
      >
        <BankWithdrawalForm
          onSubmit={handleAddWithdrawal}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default BankWithdrawals;