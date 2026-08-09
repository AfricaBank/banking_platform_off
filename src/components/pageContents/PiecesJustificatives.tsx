// src/components/pageContents/PiecesJustificatives.tsx

import {
    Box, Text, Flex, HStack, VStack,
    Badge, Button, Spinner, Separator, Input,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDossier } from "@/context/DossierContext";
import {
    getDossierById,
    getPJParDossier,
    attacherPJ,
    supprimerPJ,
    confirmerPJ,
    uploadFichier,
} from "@/api/dossierApi";
import type { PieceJustificativeDTO } from "@/types/dossier.types";
import axiosInstance from "@/api/axiosConfig";

// ─── Types locaux ─────────────────────────────────────────────────────────────

interface LocationState {
    dossierId: number;
    referenceDossier?: string;
}

type TiersRole = "TITULAIRE" | "CO_TITULAIRE" | "PLP" | "PLM";

interface PersonneAvecPJ {
    tiersId: number;
    nom: string;
    prenom: string;
    role: TiersRole;
}

interface PjRequirement {
    typePJ: string;
    libelle: string;
    obligatoire: boolean;
}

// ─── Règles métier ────────────────────────────────────────────────────────────

const PJ_REQUIREMENTS: Record<TiersRole, PjRequirement[]> = {
    TITULAIRE: [
        { typePJ: "CNI_PASSEPORT", libelle: "CNI / Passeport", obligatoire: true },
        { typePJ: "CA10",          libelle: "CA10",             obligatoire: true },
    ],
    CO_TITULAIRE: [
        { typePJ: "CNI_PASSEPORT", libelle: "CNI / Passeport", obligatoire: true },
    ],
    PLP: [
        { typePJ: "CNI_PASSEPORT", libelle: "CNI / Passeport", obligatoire: true },
    ],
    PLM: [
        { typePJ: "REGISTRE_COMMERCE", libelle: "Registre de commerce", obligatoire: false },
        { typePJ: "NINEA",             libelle: "NINEA",                 obligatoire: false },
    ],
};

const ROLE_LABELS: Record<TiersRole, string> = {
    TITULAIRE:    "Titulaire principal",
    CO_TITULAIRE: "Co-titulaires",
    PLP:          "Personnes liées physiques (PLP)",
    PLM:          "Personnes liées morales (PLM)",
};

// ─── Viewer document (popup) ──────────────────────────────────────────────────

const DocumentViewer = ({
                            pj,
                            onClose,
                        }: {
    pj: PieceJustificativeDTO;
    onClose: () => void;
}) => {
    const [blobUrl,   setBlobUrl]   = useState<string | null>(null);
    const [fileType,  setFileType]  = useState<"pdf" | "image" | "unknown">("unknown");
    const [isLoading, setIsLoading] = useState(true);
    const [error,     setError]     = useState<string | null>(null);

    useEffect(() => {
        if (!pj.docubaseId) return;
        let objectUrl: string;

        axiosInstance
            .get(`/files/${pj.docubaseId}`, { responseType: "blob" })
            .then((res) => {
                objectUrl = URL.createObjectURL(res.data);
                setBlobUrl(objectUrl);
                const mime: string = res.data.type ?? "";
                if (mime.includes("pdf")) setFileType("pdf");
                else if (mime.startsWith("image/")) setFileType("image");
                else {
                    const nom = (pj.nomDocument ?? "").toLowerCase();
                    if (nom.endsWith(".pdf")) setFileType("pdf");
                    else if (
                        nom.endsWith(".jpg") || nom.endsWith(".jpeg") ||
                        nom.endsWith(".png")
                    ) setFileType("image");
                }
            })
            .catch(() => setError("Impossible de charger le document."))
            .finally(() => setIsLoading(false));

        return () => {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [pj.docubaseId]);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <Box
            position="fixed" top={0} left={0} right={0} bottom={0}
            bg="blackAlpha.700" zIndex={1000}
            display="flex" alignItems="center" justifyContent="center"
            onClick={handleOverlayClick}
        >
            <Box
                bg="white" borderRadius="xl" boxShadow="2xl"
                w="90vw" maxW="900px" h="90vh"
                display="flex" flexDirection="column"
                overflow="hidden"
            >
                {/* En-tête popup */}
                <Flex
                    px={5} py={3} borderBottom="1px solid" borderColor="gray.200"
                    align="center" justify="space-between" flexShrink={0}
                >
                    <VStack align="flex-start" gap={0}>
                        <Text fontWeight="bold" fontSize="sm">
                            {pj.nomDocument ?? "Document"}
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            Réf. : {pj.docubaseId}
                        </Text>
                    </VStack>
                    <Button size="sm" variant="ghost" onClick={onClose}>
                        ✕ Fermer
                    </Button>
                </Flex>

                {/* Corps popup */}
                <Box flex={1} overflow="hidden" position="relative">
                    {isLoading && (
                        <Flex h="100%" align="center" justify="center">
                            <VStack gap={3}>
                                <Spinner size="xl" color="blue.500" />
                                <Text fontSize="sm" color="gray.500">
                                    Chargement du document...
                                </Text>
                            </VStack>
                        </Flex>
                    )}

                    {error && (
                        <Flex h="100%" align="center" justify="center">
                            <Text color="red.500" fontSize="sm">{error}</Text>
                        </Flex>
                    )}

                    {!isLoading && !error && blobUrl && fileType === "pdf" && (
                        <iframe
                            src={blobUrl}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            title={pj.nomDocument ?? "Document"}
                        />
                    )}

                    {!isLoading && !error && blobUrl && fileType === "image" && (
                        <Flex h="100%" align="center" justify="center"
                              overflow="auto" p={4}>
                            <img
                                src={blobUrl}
                                alt={pj.nomDocument ?? "Document"}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                    borderRadius: "8px",
                                }}
                            />
                        </Flex>
                    )}

                    {!isLoading && !error && fileType === "unknown" && (
                        <Flex h="100%" align="center" justify="center">
                            <VStack gap={3}>
                                <Text fontSize="sm" color="gray.600">
                                    Aperçu non disponible pour ce type de fichier.
                                </Text>
                                {blobUrl && (
                                    <Button
                                        as="a"
                                        href={blobUrl}
                                        download={pj.nomDocument}
                                        colorScheme="blue"
                                        size="sm"
                                    >
                                        Télécharger le fichier
                                    </Button>
                                )}
                            </VStack>
                        </Flex>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

// ─── Formulaire d'upload ──────────────────────────────────────────────────────

const AttacherForm = ({
                          onValider,
                          onAnnuler,
                      }: {
    onValider: (docubaseId: string, nomDocument: string) => void;
    onAnnuler: () => void;
}) => {
    const [fichier,     setFichier]     = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleUpload = async () => {
        if (!fichier) return;
        setIsUploading(true);
        setUploadError(null);
        try {
            const { fileId, fileName } = await uploadFichier(fichier);
            onValider(fileId, fileName);
        } catch (err: any) {
            setUploadError(
                err.response?.data?.message ?? "Échec de l'upload du fichier."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Box mt={2} p={3} bg="gray.50" borderRadius="md"
             border="1px solid" borderColor="gray.200">
            <VStack align="stretch" gap={2}>
                <Text fontSize="xs" color="gray.500">
                    Formats acceptés : PDF, JPG, PNG
                </Text>
                <Input
                    type="file" size="sm"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                        setFichier(e.target.files?.[0] ?? null);
                        setUploadError(null);
                    }}
                />
                {uploadError && (
                    <Text fontSize="xs" color="red.500">{uploadError}</Text>
                )}
                <HStack gap={2} justify="flex-end">
                    <Button size="xs" variant="outline"
                            onClick={onAnnuler} disabled={isUploading}>
                        Annuler
                    </Button>
                    <Button size="xs" colorScheme="green"
                            disabled={!fichier || isUploading}
                            onClick={handleUpload}>
                        {isUploading
                            ? <HStack gap={1}><Spinner size="xs" /><Text>Upload...</Text></HStack>
                            : "Uploader et attacher"}
                    </Button>
                </HStack>
            </VStack>
        </Box>
    );
};

// ─── Ligne de document ────────────────────────────────────────────────────────

const LignePJ = ({
                     requirement,
                     pjsAttachees,
                     onAttacher,
                     onSupprimer,
                     onVoir,
                     isSaving,
                     dossierSoumis,
                 }: {
    requirement: PjRequirement;
    pjsAttachees: PieceJustificativeDTO[];
    onAttacher: (docubaseId: string, nomDocument: string) => void;
    onSupprimer: (pjId: number) => void;
    onVoir: (pj: PieceJustificativeDTO) => void;
    isSaving: boolean;
    dossierSoumis: boolean;
}) => {
    const [showForm, setShowForm] = useState(false);

    const pjsDuType = pjsAttachees.filter(
        (p) => p.typePJ === requirement.typePJ && p.attache
    );
    const aAuMoinsUn = pjsDuType.length > 0;

    return (
        <Box>
            <Flex align="center" justify="space-between" py={2}>
                <HStack gap={3}>
                    <Text fontSize="sm" fontWeight="medium">{requirement.libelle}</Text>
                    <Badge
                        colorScheme={requirement.obligatoire ? "red" : "gray"}
                        fontSize="xs" variant="outline"
                    >
                        {requirement.obligatoire ? "Obligatoire" : "Optionnel"}
                    </Badge>
                    <Badge colorScheme={aAuMoinsUn ? "green" : "orange"} fontSize="xs">
                        {aAuMoinsUn ? "Attaché" : "Manquant"}
                    </Badge>
                </HStack>

                {!dossierSoumis && (
                    <Button size="xs" colorScheme="blue" variant="outline"
                            disabled={isSaving}
                            onClick={() => setShowForm(!showForm)}>
                        + Ajouter un document
                    </Button>
                )}
            </Flex>

            {/* Documents attachés */}
            {pjsDuType.map((pj) => (
                <Flex
                    key={pj.id}
                    align="center" justify="space-between"
                    px={3} py={2} mb={1}
                    bg="green.50" borderRadius="md"
                    border="1px solid" borderColor="green.200"
                >
                    <HStack gap={2}>
                        <Text fontSize="xs">📄</Text>
                        <VStack align="flex-start" gap={0}>
                            <Text fontSize="xs" fontWeight="semibold">
                                {pj.nomDocument}
                            </Text>
                            <Text fontSize="xs" color="gray.500">
                                Réf. : {pj.docubaseId}
                                {pj.dateCreationDocubase && ` — ${pj.dateCreationDocubase}`}
                            </Text>
                        </VStack>
                    </HStack>

                    <HStack gap={2}>
                        <Button
                            size="xs" colorScheme="blue" variant="outline"
                            onClick={() => onVoir(pj)}
                        >
                            👁 Voir
                        </Button>
                        {!dossierSoumis && (
                            <Button
                                size="xs" colorScheme="red" variant="ghost"
                                disabled={isSaving}
                                onClick={() => pj.id && onSupprimer(pj.id)}
                            >
                                Retirer
                            </Button>
                        )}
                    </HStack>
                </Flex>
            ))}

            {showForm && !dossierSoumis && (
                <AttacherForm
                    onAnnuler={() => setShowForm(false)}
                    onValider={(docubaseId, nomDocument) => {
                        onAttacher(docubaseId, nomDocument);
                        setShowForm(false);
                    }}
                />
            )}
        </Box>
    );
};

// ─── Section par type de personne ─────────────────────────────────────────────

const SectionPJ = ({
                       role, personnes, pjExistantes,
                       onAttacher, onSupprimer, onVoir,
                       isSaving, dossierSoumis,
                   }: {
    role: TiersRole;
    personnes: PersonneAvecPJ[];
    pjExistantes: PieceJustificativeDTO[];
    onAttacher: (
        personne: PersonneAvecPJ,
        requirement: PjRequirement,
        docubaseId: string,
        nomDocument: string
    ) => void;
    onSupprimer: (pjId: number) => void;
    onVoir: (pj: PieceJustificativeDTO) => void;
    isSaving: boolean;
    dossierSoumis: boolean;
}) => {
    if (personnes.length === 0) return null;

    return (
        <Box mb={6}>
            <Text fontWeight="bold" fontSize="md" color="blue.600" mb={3}
                  pb={2} borderBottom="2px solid" borderColor="blue.100">
                {ROLE_LABELS[role]}
            </Text>
            <VStack gap={4} align="stretch">
                {personnes.map((personne) => {
                    const pjsDeLaPersonne = pjExistantes.filter(
                        (p) => Number(p.tiersId) === Number(personne.tiersId)
                    );
                    return (
                        <Box key={personne.tiersId} borderWidth={1}
                             borderRadius="md" borderColor="gray.200" p={4}>
                            <Text fontWeight="semibold" fontSize="sm"
                                  mb={3} color="gray.700">
                                {personne.nom} {personne.prenom}
                                <Badge ml={2} colorScheme="gray" fontSize="xs">
                                    ID : {personne.tiersId}
                                </Badge>
                            </Text>
                            <VStack align="stretch" gap={1}>
                                {PJ_REQUIREMENTS[role].map((req) => (
                                    <LignePJ
                                        key={req.typePJ}
                                        requirement={req}
                                        pjsAttachees={pjsDeLaPersonne}
                                        onAttacher={(did, nom) =>
                                            onAttacher(personne, req, did, nom)
                                        }
                                        onSupprimer={onSupprimer}
                                        onVoir={onVoir}
                                        isSaving={isSaving}
                                        dossierSoumis={dossierSoumis}
                                    />
                                ))}
                            </VStack>
                        </Box>
                    );
                })}
            </VStack>
        </Box>
    );
};

// ─── Bannière feedback ────────────────────────────────────────────────────────

const Banniere = ({
                      type, message, onClose,
                  }: {
    type: "success" | "error";
    message: string;
    onClose: () => void;
}) => (
    <Flex mb={4} p={3} borderRadius="md" align="center" justify="space-between"
          bg={type === "success" ? "green.50" : "red.50"}
          border="1px solid"
          borderColor={type === "success" ? "green.300" : "red.300"}>
        <Text color={type === "success" ? "green.700" : "red.600"} fontSize="sm">
            {type === "success" ? "✓ " : "✗ "}{message}
        </Text>
        <Button size="xs" variant="ghost" onClick={onClose}>✕</Button>
    </Flex>
);

// ─── Composant principal ──────────────────────────────────────────────────────

const PiecesJustificatives = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { dossier: dossierContext } = useDossier();

    const state     = location.state as LocationState | null;
    const dossierId = state?.dossierId ?? dossierContext?.id;
    const reference = state?.referenceDossier ?? dossierContext?.referenceDossier;

    const [dossier,       setDossier]       = useState<any | null>(null);
    const [pjList,        setPjList]        = useState<PieceJustificativeDTO[]>([]);
    const [isLoading,     setIsLoading]     = useState(false);
    const [isSaving,      setIsSaving]      = useState(false);
    const [isValidating,  setIsValidating]  = useState(false);
    const [dossierSoumis, setDossierSoumis] = useState(false);
    const [banniere,      setBanniere]      = useState<{
        type: "success" | "error"; message: string;
    } | null>(null);

    // Viewer
    const [pjEnCours, setPjEnCours] = useState<PieceJustificativeDTO | null>(null);

    useEffect(() => {
        if (dossierId) chargerDonnees();
    }, [dossierId]);

    const chargerDonnees = async () => {
        if (!dossierId) return;
        setIsLoading(true);
        try {
            const [dossierData, pjData] = await Promise.all([
                getDossierById(dossierId),
                getPJParDossier(dossierId),
            ]);
            setDossier(dossierData);
            setPjList(pjData);
            if (
                dossierData.etapeActuelle === "SOUMISSION_VALIDATION"
                || dossierData.statut === "VALIDE"
                || dossierData.statut === "REJETE"
            ) {
                setDossierSoumis(true);
            }
        } catch (err: any) {
            setBanniere({
                type: "error",
                message: err.response?.data?.message ?? "Erreur lors du chargement.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    // ── Construction des personnes par rôle ───────────────────────────────────

    const buildPersonnes = (): Record<TiersRole, PersonneAvecPJ[]> => {
        if (!dossier) return { TITULAIRE: [], CO_TITULAIRE: [], PLP: [], PLM: [] };

        const titulaire: PersonneAvecPJ[] = dossier.titulairePrincipal
            ? [{
                tiersId: dossier.titulairePrincipal.id,
                nom:     dossier.titulairePrincipal.nom    ?? "",
                prenom:  dossier.titulairePrincipal.prenom ?? "",
                role:    "TITULAIRE",
            }]
            : [];

        const coTitulaires: PersonneAvecPJ[] = (dossier.coTitulaires ?? []).map(
            (t: any) => ({
                tiersId: t.id,
                nom:     t.nom    ?? "",
                prenom:  t.prenom ?? "",
                role:    "CO_TITULAIRE" as const,
            })
        );

        const plp: PersonneAvecPJ[] = (dossier.personnesPhysiques ?? []).map(
            (p: any) => ({
                tiersId: p.id,
                nom:     p.tiers?.nom    ?? p.nomFamille ?? "",
                prenom:  p.tiers?.prenom ?? p.prenom    ?? "",
                role:    "PLP" as const,
            })
        );

        const plm: PersonneAvecPJ[] = (dossier.personnesMorales ?? []).map(
            (p: any) => ({
                tiersId: p.idPLM,
                nom:     p.tiers?.nom ?? p.raisonSociale ?? "",
                prenom:  "",
                role:    "PLM" as const,
            })
        );

        return { TITULAIRE: titulaire, CO_TITULAIRE: coTitulaires, PLP: plp, PLM: plm };
    };

    const personnesParRole = buildPersonnes();

    // ── Validation bloquante ──────────────────────────────────────────────────

    const isComplet = (): boolean => {
        const roles: TiersRole[] = ["TITULAIRE", "CO_TITULAIRE", "PLP"];
        for (const role of roles) {
            for (const personne of personnesParRole[role]) {
                for (const req of PJ_REQUIREMENTS[role].filter((r) => r.obligatoire)) {
                    const ok = pjList.some(
                        (p) =>
                            Number(p.tiersId) === Number(personne.tiersId)
                            && p.typePJ  === req.typePJ
                            && p.attache
                    );
                    if (!ok) return false;
                }
            }
        }
        return true;
    };

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleAttacher = async (
        personne: PersonneAvecPJ,
        requirement: PjRequirement,
        docubaseId: string,
        nomDocument: string
    ) => {
        if (!dossierId) return;
        setIsSaving(true);
        setBanniere(null);
        try {
            const nouvellePJ = await attacherPJ(dossierId, {
                docubaseId,
                nomDocument,
                dateCreationDocubase: new Date().toISOString().slice(0, 10),
                typePJ:      requirement.typePJ,
                libelle:     requirement.libelle,
                obligatoire: requirement.obligatoire,
                attache:     true,
                tiersRole:   personne.role,
                tiersId:     personne.tiersId,
            });
            setPjList((prev) => [...prev, nouvellePJ]);
            setBanniere({
                type: "success",
                message: `"${requirement.libelle}" attaché pour ${personne.nom} ${personne.prenom}.`,
            });
        } catch (err: any) {
            setBanniere({
                type: "error",
                message: err.response?.data?.message ?? "Erreur lors de l'attachement.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSupprimer = async (pjId: number) => {
        if (!dossierId) return;
        setIsSaving(true);
        setBanniere(null);
        try {
            await supprimerPJ(dossierId, pjId);
            setPjList((prev) => prev.filter((p) => p.id !== pjId));
            setBanniere({ type: "success", message: "Document retiré." });
        } catch (err: any) {
            setBanniere({
                type: "error",
                message: err.response?.data?.message ?? "Erreur lors de la suppression.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleValiderDossier = async () => {
        if (!dossierId) return;
        setIsValidating(true);
        setBanniere(null);
        try {
            await confirmerPJ(dossierId);
            setDossierSoumis(true);
            setBanniere({
                type: "success",
                message: "Dossier soumis avec succès. En attente de validation.",
            });
        } catch (err: any) {
            setBanniere({
                type: "error",
                message: err.response?.data?.message ?? "Erreur lors de la soumission.",
            });
        } finally {
            setIsValidating(false);
        }
    };

    const dossierComplet = isComplet();

    // ── Rendu ─────────────────────────────────────────────────────────────────

    return (
        <Box>
            {/* Viewer popup */}
            {pjEnCours && (
                <DocumentViewer
                    pj={pjEnCours}
                    onClose={() => setPjEnCours(null)}
                />
            )}

            {/* En-tête */}
            <Box h="50px" bg="#C9E1F8" mt="10px" display="flex"
                 alignItems="center" pl="20px" borderRadius="md">
                <HStack gap={4}>
                    <Text fontWeight="bold">PIÈCES JUSTIFICATIVES</Text>
                    {reference && (
                        <Badge colorScheme="blue" fontSize="sm">
                            Dossier : {reference}
                        </Badge>
                    )}
                    {dossierSoumis && (
                        <Badge colorScheme="green" fontSize="sm">
                            Soumis — en attente de validation
                        </Badge>
                    )}
                </HStack>
            </Box>

            <Flex justify="center" minH="100vh" bg="gray.100" px={4} py={6}>
                <Box w="full" maxW="900px">

                    {banniere && (
                        <Banniere
                            type={banniere.type}
                            message={banniere.message}
                            onClose={() => setBanniere(null)}
                        />
                    )}

                    {isLoading ? (
                        <Flex justify="center" align="center" h="300px">
                            <Spinner size="lg" color="blue.500" />
                        </Flex>
                    ) : (
                        <Box bg="white" borderRadius="lg" boxShadow="lg" p={8}>

                            {/* Bandeau dossier soumis */}
                            {dossierSoumis && (
                                <Box mb={4} p={4} bg="blue.50" borderRadius="md"
                                     border="1px solid" borderColor="blue.200">
                                    <Text fontSize="sm" color="blue.700" fontWeight="medium">
                                        Ce dossier a été soumis à validation.
                                        Les documents ne peuvent plus être modifiés.
                                    </Text>
                                </Box>
                            )}

                            {/* Sections par type de personne */}
                            <SectionPJ
                                role="TITULAIRE"
                                personnes={personnesParRole.TITULAIRE}
                                pjExistantes={pjList}
                                onAttacher={handleAttacher}
                                onSupprimer={handleSupprimer}
                                onVoir={setPjEnCours}
                                isSaving={isSaving}
                                dossierSoumis={dossierSoumis}
                            />
                            <SectionPJ
                                role="CO_TITULAIRE"
                                personnes={personnesParRole.CO_TITULAIRE}
                                pjExistantes={pjList}
                                onAttacher={handleAttacher}
                                onSupprimer={handleSupprimer}
                                onVoir={setPjEnCours}
                                isSaving={isSaving}
                                dossierSoumis={dossierSoumis}
                            />
                            <SectionPJ
                                role="PLP"
                                personnes={personnesParRole.PLP}
                                pjExistantes={pjList}
                                onAttacher={handleAttacher}
                                onSupprimer={handleSupprimer}
                                onVoir={setPjEnCours}
                                isSaving={isSaving}
                                dossierSoumis={dossierSoumis}
                            />
                            <SectionPJ
                                role="PLM"
                                personnes={personnesParRole.PLM}
                                pjExistantes={pjList}
                                onAttacher={handleAttacher}
                                onSupprimer={handleSupprimer}
                                onVoir={setPjEnCours}
                                isSaving={isSaving}
                                dossierSoumis={dossierSoumis}
                            />

                            <Separator mt={6} mb={6} />

                            {/* Actions */}
                            <Flex justify="space-between" align="center">
                                <Button
                                    variant="outline"
                                    colorScheme="gray"
                                    onClick={() => navigate("/dossier-synthese", {
                                        state: { dossierId, referenceDossier: reference },
                                    })}
                                >
                                    ← Retour à la Synthèse
                                </Button>

                                <HStack gap={4}>
                                    {/* Bouton Avis & Décision — validateur uniquement */}
                                    {dossierSoumis && (
                                        <Button
                                            colorScheme="purple"
                                            onClick={() => navigate("/avis-decision", {
                                                state: { dossierId, referenceDossier: reference },
                                            })}
                                        >
                                            Avis & Décision →
                                        </Button>
                                    )}

                                    {/* Bouton Valider — initiateur uniquement */}
                                    {!dossierSoumis && (
                                        <VStack align="flex-end" gap={1}>
                                            {!dossierComplet && (
                                                <Text fontSize="xs" color="orange.500">
                                                    Tous les documents obligatoires doivent
                                                    être attachés.
                                                </Text>
                                            )}
                                            <Button
                                                bg="blue.500"
                                                color="white"
                                                _hover={{ bg: "blue.600" }}
                                                isDisabled={
                                                    !dossierComplet || isValidating || isSaving
                                                }
                                                onClick={handleValiderDossier}
                                            >
                                                {isValidating ? (
                                                    <HStack gap={2}>
                                                        <Spinner size="sm" />
                                                        <Text>Soumission...</Text>
                                                    </HStack>
                                                ) : "Valider le dossier"}
                                            </Button>
                                        </VStack>
                                    )}
                                </HStack>
                            </Flex>
                        </Box>
                    )}
                </Box>
            </Flex>
        </Box>
    );
};

export default PiecesJustificatives;
