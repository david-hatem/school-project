import React, { useState, useEffect } from "react";
import type { PaymentFormData, Student, Group } from "../types";
import { createPayment, fetchGroupeList, updatePayment } from "../services/api";

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
  onClose: () => void;
  initialStudentId?: number;
  students: Student[];
  groups: Group[];
  isCompletion?: boolean;
  remainingAmount?: number;
  id?: number;
}

function PaymentForm({
  onSubmit,
  onClose,
  initialStudentId,
  students,
  groups,
  isCompletion,
  remainingAmount,
  id,
}: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    montant: remainingAmount || 0,
    frais_inscription: 0,
    // statut_paiement: "",
    etudiant_id: initialStudentId || 0,
    groupe_id: groups[0]?.id || 0,
    commission_percentage: 100,
  });

  // useEffect(() => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     etudiant_id: initialStudentId || prev.etudiant_id,
  //     groupe_id: groups[0]?.id || prev.groupe_id,
  //     montant: remainingAmount || prev.montant,
  //   }));
  // }, [initialStudentId, groups, remainingAmount]);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (formData.montant <= 0) {
  //     alert("Amount must be greater than 0");
  //     return;
  //   }
  //   if (remainingAmount && formData.montant > remainingAmount) {
  //     alert(`The maximum remaining amount is $${remainingAmount}`);
  //     return;
  //   }
  //   onSubmit(formData);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.montant <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    if (isCompletion) {
      await updatePayment({ montant: remainingAmount }, id);
      return;
    }
    const createdPay = await createPayment(formData);
    onSubmit(formData);
    onClose();
    if (createdPay) {
      alert("Payment created successfully!");
    } else {
      alert("Failed to create group.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          type="number"
          required
          min="0.01"
          step="0.01"
          max={remainingAmount}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.montant || ""}
          onChange={(e) =>
            setFormData({ ...formData, montant: parseFloat(e.target.value) })
          }
        />
        {remainingAmount && (
          <p className="mt-1 text-sm text-gray-500">
            Remaining amount: ${remainingAmount.toLocaleString()}
          </p>
        )}
      </div>

      {!isCompletion && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Fee
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.frais_inscription || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                frais_inscription: parseFloat(e.target.value),
              })
            }
          />
          <p className="mt-1 text-sm text-gray-500">
            One-time registration fee for new students
          </p>
        </div>
      )}

      {!isCompletion && !initialStudentId && students.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student
          </label>
          <select
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.etudiant_id || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                etudiant_id: parseInt(e.target.value),
              })
            }
          >
            <option value="">Select a student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.prenom} {student.nom}
              </option>
            ))}
          </select>
        </div>
      )}

      {!isCompletion && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Group
            </label>
            <select
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.groupe_id || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  groupe_id: parseInt(e.target.value),
                })
              }
            >
              <option value="">Select a group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.nom_groupe}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Commission Percentage
            </label>
            <input
              type="number"
              required
              min="0"
              max="100"
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.commission_percentage || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commission_percentage: parseFloat(e.target.value),
                })
              }
            />
          </div>
        </>
      )}

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
          {isCompletion ? "Complete Payment" : "Add Payment"}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
