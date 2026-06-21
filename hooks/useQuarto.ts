// hooks/useQuarto.ts
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export function useQuarto(quartoId?: string) {
  const [quarto, setQuarto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!quartoId) {
      setLoading(false);
      return;
    }

    const fetchQuarto = async () => {
      try {
        const docRef = doc(db, 'quartos', quartoId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setQuarto({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('Quarto não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar quarto:', error);
        setError('Erro ao carregar dados do quarto');
      } finally {
        setLoading(false);
      }
    };

    fetchQuarto();
  }, [quartoId]);

  return { quarto, loading, error };
}