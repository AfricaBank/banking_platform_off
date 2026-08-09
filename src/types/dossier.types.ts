// src/types/dossier.types.ts

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;        // page courante (0-based)
  first: boolean;
  last: boolean;
}

// ─── Enums ────────────────────────────────────────────────────────────────────

export type EtapeProcessus =
    | "INITIATION"
    | "RECHERCHE_PERSONNE"
    | "CREATION_TIERS"
    | "AJOUT_TITULAIRE"
    | "AJOUT_PERSONNES_LIEES"
    | "ATTACHEMENT_PJ"
    | "CR_CONSEILLER"
    | "SOUMISSION_VALIDATION"
    | "EDITION_DOCUMENTS"
    | "ATTENTE_SIGNATURE"
    | "TERMINE";

export type StatutDossier =
    | "EN_COURS"
    | "COMPLET"
    | "ANNULE"
    | "VALIDE"
    | "REJETE"
    | "A_COMPLETER_CONFORMITE"
    | "A_COMPLETER_METIER"
    | "A_COMPLETER_DG"
    | "A_REGULARISER_METIER"
    | "A_REGULARISER_BO_CN1"
    | "A_REGULARISER_SIGNATURE"
    | "A_ABANDONNER_RESAISIE";

// ─── Dossier EER ─────────────────────────────────────────────────────────────

export interface DossierEER {
  id: number;
  referenceDossier: string;
  statut: StatutDossier;
  etapeActuelle: EtapeProcessus;
  typePersonne: string;
  codeSiege: string;
  natureRelation: string;
  codeExploitant: string;
  nomExploitant?: string;
  nomCollectivite?: string;
  civiliteCollectivite?: string;
  createur: string;
  dateCreation: string;
  dateModification?: string;
  dateTerminaison?: string;
  titulairePrincipal?: TiersDTO;
  coTitulaires?: TiersDTO[];
}

// ─── Statut workflow ──────────────────────────────────────────────────────────

export interface StatutWorkflow {
  dossierId: number;
  reference: string;
  etapeActuelle: EtapeProcessus;
  statut: StatutDossier;
  createur: string;
  dateCreation: string;
  hasTitulairePrincipal: boolean;
  nbCoTitulaires: number;
  nbPersonnesPhysiques: number;
  nbPersonnesMorales: number;
  pjCompletes: boolean;
  crRenseigne: boolean;
}

// ─── Initiation ───────────────────────────────────────────────────────────────

export interface InitiationDossierRequest {
  createur?: string;
  typePersonne: string;
  codeSiege: string;
  natureRelation: string;
  codeExploitant: string;
  nomExploitant?: string;
  nomCollectivite?: string;
  civiliteCollectivite?: string;
}

// ─── Tiers ────────────────────────────────────────────────────────────────────

export interface TiersDTO {
  id?: number;
  typeTiers?: string;
  nom?: string;
  prenom?: string;
  nomAbrege?: string;
  dateNaissance?: string;
  lieuNaissance?: string;
  paysNaissance?: string;
  paysNationalite?: string;
  paysAdresseFiscale?: string;
  civilite?: string;
  sexe?: string;
  email?: string;
  mobile?: string;
  adresse?: string;
  ville?: string;
  codePostal?: string;
  comptes?: CompteBancaireDTO[];
  personnesEnCharge?: PersonneEnChargeDTO[];
}

export interface CompteBancaireDTO {
  id?: number;
  typeCompte?: string;
  devise?: string;
  motifOuverture?: string;
  racine?: string;
  cle?: string;
  cleRib?: string;
  conventionCompte?: string;
  cartonSignature?: string;
}

export interface PersonneEnChargeDTO {
  id?: number;
  nom?: string;
  prenom?: string;
  dateNaissance?: string;
  sexe?: string;
}

// ─── Recherche ────────────────────────────────────────────────────────────────

export interface RecherchePersonneRequest {
  nom?: string;
  prenom?: string;
  dateNaissance?: string;
  civilite?: string;
  siege?: string;
  racine?: string;
  idNational?: string;
  nomBE?: string;
  prenomBE?: string;
  dossierId?: number;
}

export interface RecherchePersonneResponse {
  dossiersEnCours: TiersDTO[];
  tiersExistants: TiersDTO[];
  creationPossible: boolean;
}

// ─── Pièces justificatives ────────────────────────────────────────────────────

export interface PieceJustificativeDTO {
  id?: number;
  docubaseId?: string;
  nomDocument?: string;
  dateCreationDocubase?: string;
  typePJ?: string;
  libelle?: string;
  obligatoire?: boolean;
  attache?: boolean;
  tiersRole?: string;
  tiersId?: number;
  dossierEERId?: number;
}

// ─── CR Conseiller ────────────────────────────────────────────────────────────

export interface EvaluationQualitativeDTO {
  id?: number;
  question?: string;
  appreciation?: boolean;
  commentaire?: string;
}

export interface CRConseillerDTO {
  id?: number;
  informationsDefavorablesTrouvees?: boolean;
  dateRecherche?: string;
  theme?: string;
  detailInformationDefavorable?: string;
  facteurAttenuation?: string;
  commentaireInfoDefavorable?: string;
  nouveauNiveauRisque?: boolean;
  risquePropose?: string;
  commentaireRisque?: string;
  natureObjetRelationAffaires?: string;
  actifsConfies?: string;
  utilisationEspeces?: string;
  financements?: string;
  autresInfoTransactionnelles?: string;
  analyseCohérence?: string;
  evaluationsQualitatives?: EvaluationQualitativeDTO[];
  crEntretien?: string;
  dossierEERId?: number;
}


// Nouveau type AvisDecisionDTO
export interface AvisDecisionDTO {
  id?: number;
  decision: "VALIDE" | "A_REGULARISER" | "REJETE";
  commentaire?: string;
  motifRenvoi?: string;
  motifRejet?: string;
  dateDecision?: string;
  validateur?: string;
  dossierEERId?: number;
}
