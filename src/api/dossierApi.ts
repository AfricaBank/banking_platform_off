// src/api/dossierApi.ts

import axiosInstance from "./axiosConfig";
import type {
    InitiationDossierRequest,
    DossierEER,
    StatutWorkflow,
    RecherchePersonneRequest,
    RecherchePersonneResponse,
    TiersDTO,
    PieceJustificativeDTO,
    CRConseillerDTO,
    PageResponse,
} from "@/types/dossier.types";

const BASE = "/api/v1/dossiers-eer";

// ─── Liste des dossiers ───────────────────────────────────────────────────────

export const getAllDossiers = async (
    page = 0,
    size = 20
): Promise<PageResponse<DossierEER>> => {
    const response = await axiosInstance.get<PageResponse<DossierEER>>(
        `${BASE}?page=${page}&size=${size}&sort=dateCreation,desc`
    );
    return response.data;
};

export const getDossiersByCreateur = async (
    createur: string
): Promise<DossierEER[]> => {
    const response = await axiosInstance.get<DossierEER[]>(
        `${BASE}/createur/${createur}`
    );
    return response.data;
};

// ─── Abandon / Reprise ────────────────────────────────────────────────────────

export const abandonnerDossier = async (
    dossierId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/abandonner`
    );
    return response.data;
};

export const reprendreDossier = async (
    dossierId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/reprendre`
    );
    return response.data;
};

// ─── Étape 1 : Initiation ─────────────────────────────────────────────────────

export const initierDossier = async (
    data: InitiationDossierRequest
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/initier`, data
    );
    return response.data;
};

// ─── Étape 2 : Recherche tiers ────────────────────────────────────────────────

export const rechercherPersonne = async (
    data: RecherchePersonneRequest
): Promise<RecherchePersonneResponse> => {
    const response = await axiosInstance.post<RecherchePersonneResponse>(
        `${BASE}/rechercher-personne`, data
    );
    return response.data;
};

export const selectionnerTiersExistant = async (
    dossierId: number,
    tiersId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/selectionner-tiers/${tiersId}`
    );
    return response.data;
};

// ─── Étape 3 : Titulaire ──────────────────────────────────────────────────────

export const ajouterTitulaire = async (
    dossierId: number,
    tiers: TiersDTO,
    estCoTitulaire = false
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/titulaires?estCoTitulaire=${estCoTitulaire}`,
        tiers
    );
    return response.data;
};

// ─── Étape 4 : Personnes liées ────────────────────────────────────────────────

export const ajouterPersonnePhysique = async (
    dossierId: number,
    dto: object
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/personnes-physiques`, dto
    );
    return response.data;
};

export const ajouterPersonneMorale = async (
    dossierId: number,
    dto: object
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/personnes-morales`, dto
    );
    return response.data;
};

// ─── Étape 5 : Pièces justificatives ─────────────────────────────────────────

export const attacherPJ = async (
    dossierId: number,
    pj: PieceJustificativeDTO
): Promise<PieceJustificativeDTO> => {
    const response = await axiosInstance.post<PieceJustificativeDTO>(
        `${BASE}/${dossierId}/pieces-justificatives`, pj
    );
    return response.data;
};

export const getPJParDossier = async (
    dossierId: number
): Promise<PieceJustificativeDTO[]> => {
    const response = await axiosInstance.get<PieceJustificativeDTO[]>(
        `${BASE}/${dossierId}/pieces-justificatives`
    );
    return response.data;
};

export const supprimerPJ = async (
    dossierId: number,
    pjId: number
): Promise<void> => {
    await axiosInstance.delete(
        `${BASE}/${dossierId}/pieces-justificatives/${pjId}`
    );
};

export const confirmerPJ = async (
    dossierId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/confirmer-pj`
    );
    return response.data;
};

// ─── Étape 6 : CR Conseiller ──────────────────────────────────────────────────

export const sauvegarderCR = async (
    dossierId: number,
    cr: CRConseillerDTO
): Promise<CRConseillerDTO> => {
    const response = await axiosInstance.post<CRConseillerDTO>(
        `${BASE}/${dossierId}/cr-conseiller`, cr
    );
    return response.data;
};

export const getCRParDossier = async (
    dossierId: number
): Promise<CRConseillerDTO> => {
    const response = await axiosInstance.get<CRConseillerDTO>(
        `${BASE}/${dossierId}/cr-conseiller`
    );
    return response.data;
};

// ─── Étape 7 : Finalisation ───────────────────────────────────────────────────

export const finaliserDossier = async (
    dossierId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.post<DossierEER>(
        `${BASE}/${dossierId}/finaliser`
    );
    return response.data;
};

// ─── Lecture ──────────────────────────────────────────────────────────────────

export const getDossierById = async (
    dossierId: number
): Promise<DossierEER> => {
    const response = await axiosInstance.get<DossierEER>(
        `${BASE}/${dossierId}`
    );
    return response.data;
};

export const getStatutWorkflow = async (
    dossierId: number
): Promise<StatutWorkflow> => {
    const response = await axiosInstance.get<StatutWorkflow>(
        `${BASE}/${dossierId}/statut`
    );
    return response.data;
};
