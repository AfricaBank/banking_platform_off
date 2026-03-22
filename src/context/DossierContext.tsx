// src/context/DossierContext.tsx

import {
    createContext,
    useContext,
    useState,
    useCallback,
    type ReactNode,
} from "react";
import type { DossierEER, StatutWorkflow } from "@/types/dossier.types";
import { getStatutWorkflow } from "@/api/dossierApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DossierContextType {
    /** Dossier courant en cours de traitement */
    dossier: DossierEER | null;

    /** Statut détaillé du workflow (avancement, compteurs) */
    statut: StatutWorkflow | null;

    /** Erreur globale du workflow */
    error: string | null;

    /** Chargement en cours */
    isLoading: boolean;

    /** Définir le dossier courant après initiation */
    setDossier: (dossier: DossierEER) => void;

    /** Rafraîchir le statut depuis le backend */
    refreshStatut: (dossierId: number) => Promise<void>;

    /** Réinitialiser le contexte (abandon ou fin de workflow) */
    resetDossier: () => void;

    /** Setter d'erreur pour les pages enfants */
    setError: (message: string | null) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const DossierContext = createContext<DossierContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const DossierProvider = ({ children }: { children: ReactNode }) => {
    const [dossier, setDossierState] = useState<DossierEER | null>(null);
    const [statut, setStatut] = useState<StatutWorkflow | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const setDossier = useCallback((d: DossierEER) => {
        setDossierState(d);
        setError(null);
    }, []);

    const refreshStatut = useCallback(async (dossierId: number) => {
        try {
            setIsLoading(true);
            const data = await getStatutWorkflow(dossierId);
            setStatut(data);
        } catch (err: any) {
            setError(
                err.response?.data?.message
                ?? "Erreur lors du chargement du statut."
            );
        } finally {
            setIsLoading(false);
        }
    }, []);

    const resetDossier = useCallback(() => {
        setDossierState(null);
        setStatut(null);
        setError(null);
    }, []);

    return (
        <DossierContext.Provider
            value={{
                dossier,
                statut,
                error,
                isLoading,
                setDossier,
                refreshStatut,
                resetDossier,
                setError,
            }}
        >
            {children}
        </DossierContext.Provider>
    );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useDossier = (): DossierContextType => {
    const context = useContext(DossierContext);
    if (!context) {
        throw new Error(
            "useDossier doit être utilisé à l'intérieur d'un <DossierProvider>"
        );
    }
    return context;
};
