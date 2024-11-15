// src/app/models/user.model.ts

export interface User {
    id: number;                    
    nom: string;                   
    prenom: string;                
    password: string;              
    adresse: string;           
    telephone: string;             
    file_cni: string;              
    cni: string;                   
    date_naissance: string;         
    code_verification: string;     
    role: string;                 
    statut_compte: string;       
    qrcode: string | null;        
    pays_id: number;               
    createdAt: string;             
    updatedAt: string;            
    wallet: Wallet;                
    transactionsSent: Transaction[];      // Transactions envoyées
    transactionsReceived: Transaction[];  // Transactions reçues
    userBanques: UserBanque[];           // Banques associées à l'utilisateur
  }
  
  export interface UserBanque {
    id: number;                   
    user_id: number;             
    banque_name: string;           
    compte_number: string;         
    createdAt: string;            
    updatedAt: string;             
  }
  

  // src/app/models/wallet.model.ts

export interface Wallet {
  id: number;                     
  user_id: number;                
  plafond: number;                
  solde: number;                 
  createdAt: string;              
  updatedAt: string;             
}

// src/app/models/transaction.model.ts

export interface Transaction {
    id: number;                    
    sender_id: number;              
    montant_envoye: number;        
    montant_recus: number;          
    type_transaction: string;       
    statut: string;                
    frais_id: number | null;      
    receiver_id: number;            
    createdAt: string;              
    updatedAt: string;              
  }
  