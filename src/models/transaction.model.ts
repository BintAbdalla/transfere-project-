// src/app/models/transaction.model.ts

export interface Transaction {
    id: number;                     // ID unique de la transaction
    sender_id: number;              // ID de l'expéditeur
    montant_envoye: number;         // Montant envoyé
    montant_recus: number;          // Montant reçu
    type_transaction: string;       // Type de transaction (ex: transfert, recharge)
    statut: string;                 // Statut de la transaction (ex: effectuer, en attente)
    frais_id: number | null;        // ID des frais, s'il y en a
    receiver_id: number;            // ID du destinataire
    createdAt: string;              // Date de création
    updatedAt: string;              // Date de dernière mise à jour
  }
  