import React, { createContext, ReactNode, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

export interface AuthContextData {
  user: { name: string } | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

// Cria o contexto com um valor padrão
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// O Provider agora é um componente "enxuto" que usa o hook de lógica
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return (
    // Fornece o valor retornado pelo hook para a árvore de componentes
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

// Hook de consumo do contexto para os componentes
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
