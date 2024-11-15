// src/app/models/wallet.model.ts

export interface Wallet {
    id: number;                     // ID unique du portefeuille
    user_id: number;                // ID de l'utilisateur associé
    plafond: number;                // Plafond du portefeuille
    solde: number;                  // Solde actuel du portefeuille
    createdAt: string;              // Date de création
    updatedAt: string;              // Date de dernière mise à jour
  }
  