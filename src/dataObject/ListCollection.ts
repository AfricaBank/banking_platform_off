import { createListCollection } from "@chakra-ui/react";
import i18n from 'i18n-iso-countries';
import fr from 'i18n-iso-countries/langs/fr.json';
//import { countries } from 'countries-list';
import i18n from "i18n-iso-countries";
import fr from "i18n-iso-countries/langs/fr.json";

i18n.registerLocale(fr);

// ─── Pays ─────────────────────────────────────────────────────────────────────

export const countryCollection = createListCollection({
  items: Object.entries(i18n.getNames("fr")).map(([code, name]) => ({
    label: name,
    value: code,
  })),
});

// ─── Type de personne ─────────────────────────────────────────────────────────

export const typePersonne = createListCollection({
  items: [
    { label: "Personne physique", value: "Personne physique" },
    { label: "Personne morale",   value: "Personne morale"  },
  ],
});

// ─── Nature de la relation (PP) ───────────────────────────────────────────────
// Les valeurs "collectivité" doivent correspondre à COLLECTIVITE_VALUES
// dans InitiationDossier.tsx

export const natureRelationPP = createListCollection({
export const detectionPpe = createListCollection({
  items: [
    { label: "Non PPE", value: "non_ppe" },
    { label: "PPE National", value: "ppe_national" },
    { label: "PPE Étranger", value: "ppe_etranger" },
    { label: "Membre famille PPE", value: "famille_ppe" },
  ],
});
export const typePpe = createListCollection({
  items: [
    { label: "Chef d'État / Gouvernement", value: "chef_etat" },
    { label: "Parlementaire", value: "parlementaire" },
    { label: "Haut Magistrat", value: "magistrat" },
    { label: "Dirigeant Entreprise Publique", value: "dirigeant_ent_publique" },
  ],
});
export const document_type = createListCollection({
  items: [
    { label: "passeport", value: "Passeport" },
    { label: "cin", value: "CIN" },
  ],
});
export const categori_clientel = createListCollection({
  items: [
    { label: "Tiers individuel",          value: "TIERS_INDIVIDUEL"     },
    { label: "Compte joint / Époux",      value: "COLLECTIVITE"         },
    { label: "Autres comptes joints",     value: "COMPTE_JOINT_EPOUX"   },
    { label: "Autres clients collectifs", value: "AUTRES_COMPTS_JOINTS" },
  ],
});


// ─── Code siège ───────────────────────────────────────────────────────────────
// À remplacer par les données réelles de la table ATLAS.

export const codeSiege = createListCollection({
export const categori_socio_pro = createListCollection({
  items: [
    { label: "Agriculteur exploitant", value: "Agriculteur exploitant" },
    {
      label: "chef d'entreprise",
      value: "chef d'entreprise",
    },
    {
      label: "Cadre et profession intellectuelle supérieure",
      value: "Cadre et profession intellectuelle supérieure",
    },
    { label: "Profession intermédiaire", value: "Profession intermédiaire" },
    { label: "Employé", value: "Employé" },
    { label: "Ouvrier", value: "Ouvrier" },
    { label: "Retraité", value: "Retraité" },
    { label: "Étudiant", value: "Étudiant" },
    { label: "Profession libérale", value: "Profession libérale" },
  ],
});
export const countries = createListCollection({
  items: [
    { label: "Sénégal", value: "Sénégal" },
    { label: "Comores ", value: "Comores" },
    { label: "Guinée ", value: "Guinée" },
  ],
});
export const col2 = createListCollection({
  items: [
    { label: "00001 — Siège principal", value: "00001" },
    { label: "00002 — Agence Nord",     value: "00002" },
    { label: "00003 — Agence Sud",      value: "00003" },
  ],
});

// ─── Code exploitant ──────────────────────────────────────────────────────────
// IMPORTANT : ne pas ajouter de champs supplémentaires ici (ex: nomExploitant).
// Le lookup nomExploitant est géré par exploitantNomMap dans InitiationDossier.tsx.
// Si un seul item → affiché en lecture seule automatiquement.

export const codeExploitant = createListCollection({
export const modalite_eer = createListCollection({
  items: [
    { label: "Présentiel", value: "presentiel" },
    { label: "Démarchage ", value: "demarchage" },
    { label: "Recommandation d’un client ", value: "Recommandation" },
  ],
});
export const motif_eer = createListCollection({
  items: [
    { label: "Ouverture de compte courant", value: "ouverture de compte" },
    { label: "Souscription à un produit d’épargne ", value: "souscription" },
    { label: "Demande de crédit ou financement ", value: "credit" },
  ],
});
export const civilite = createListCollection({
  items: [
    { label: "EXP01", value: "EXP01" },
    { label: "EXP02", value: "EXP02" },
  ],
});

// ─── Civilité ─────────────────────────────────────────────────────────────────

export const civilite = createListCollection({
  items: [
    { label: "M.",  value: "Monsieur"   },
    { label: "Mme", value: "Madame"     },
    { label: "Dr",  value: "Docteur"    },
    { label: "Pr",  value: "Professeur" },
  ],
});

// ─── Sexe ─────────────────────────────────────────────────────────────────────

export const sexe = createListCollection({
  items: [
    { label: "Homme", value: "Homme" },
    { label: "Femme", value: "Femme" },
  ],
});

// ─── Type de tiers ────────────────────────────────────────────────────────────

export const type_Tiers = createListCollection({
  items: [
    { label: "Titulaire",    value: "Titulaire"   },
    { label: "Co-Titulaire", value: "Cotitulaire" },
  ],
});

// ─── Catégorie clientèle ──────────────────────────────────────────────────────

export const categori_clientel = createListCollection({
  items: [
    { label: "Retail",        value: "Retail"        },
    { label: "Professionnel", value: "Professionnel" },
    { label: "Corporate",     value: "Corporate"     },
  ],
});

// ─── Activité à risque ────────────────────────────────────────────────────────

export const activiteARisque = createListCollection({
  items: [
    { label: "A DETERMINER",                value: "A DETERMINER"                },
    { label: "ACTIVITE LIEE A LA FAUNE",    value: "ACTIVITE LIEE A LA FAUNE"    },
    { label: "ACTIVITES LOBBYING",          value: "ACTIVITES LOBBYING"          },
    { label: "ADMIN. SOCIETES OFFSHORE",    value: "ADMIN. SOCIETES OFFSHORE"    },
    { label: "AGENCES DE RECOUVREMENT",     value: "AGENCES DE RECOUVREMENT"     },
    { label: "AGENCES DE VOYAGE",           value: "AGENCES DE VOYAGE"           },
    { label: "AGENCES IMMOBILIERES",        value: "AGENCES IMMOBILIERES"        },
    { label: "AGRI. BESOIN MAIN OEUVRE",    value: "AGRI. BESOIN MAIN OEUVRE"    },
    { label: "ARMEMENT MAT DE DEFENSE",     value: "ARMEMENT MAT DE DEFENSE"     },
    { label: "ART ET ANTIQUITES",           value: "ART ET ANTIQUITES"           },
    { label: "AVOCATS",                     value: "AVOCATS"                     },
    { label: "BANQUE FICTIVE",              value: "BANQUE FICTIVE"              },
    { label: "BOITES DE NUIT",              value: "BOITES DE NUIT"              },
    { label: "CAGNOTTE EN LIGNE",           value: "CAGNOTTE EN LIGNE"           },
    { label: "CAPTAGE TRAITE DIST EAU",     value: "CAPTAGE TRAITE DIST EAU"     },
    { label: "COLLECTE EAUX USEES",         value: "COLLECTE EAUX USEES"         },
    { label: "COM AUTO OCCA HOR CORPO",     value: "COM AUTO OCCA HOR CORPO"     },
    { label: "CONSEIL FISCAL",              value: "CONSEIL FISCAL"              },
    { label: "CONSTRUC DE BATIMENTS",       value: "CONSTRUC DE BATIMENTS"       },
    { label: "COURTIERS EN DOUANES",        value: "COURTIERS EN DOUANES"        },
    { label: "CRYPTO ATM",                  value: "CRYPTO ATM"                  },
    { label: "CULTURE DU CANNABIS",         value: "CULTURE DU CANNABIS"         },
    { label: "CULTURE DU TABAC",            value: "CULTURE DU TABAC"            },
    { label: "DEBITS DE BOISSON",           value: "DEBITS DE BOISSON"           },
    { label: "DECHET COL TRAIT ELI RECU",   value: "DECHET COL TRAIT ELI RECU"   },
    { label: "DECHET DEPOLLU AUTRE SERV",   value: "DECHET DEPOLLU AUTRE SERV"   },
    { label: "DOMICILIATION DE SOCIETES",   value: "DOMICILIATION DE SOCIETES"   },
    { label: "ECH/TROC EN LIGN DE SERVI",   value: "ECH/TROC EN LIGN DE SERVI"   },
    { label: "EDIT JEUX TRANSF VALEURS",    value: "EDIT JEUX TRANSF VALEURS"    },
    { label: "EMET DE MONN. ELECTRON.",     value: "EMET DE MONN. ELECTRON."     },
    { label: "EQUIP ENERG RENOUVELABLE",    value: "EQUIP ENERG RENOUVELABLE"    },
    { label: "EXTRACT AUTRES MATERIAUX",    value: "EXTRACT AUTRES MATERIAUX"    },
    { label: "EXTRACT HYDROCARBURES",       value: "EXTRACT HYDROCARBURES"       },
    { label: "EXTRACT METAUX PRECI.",       value: "EXTRACT METAUX PRECI."       },
    { label: "EXTRACT PIERRES PRECI.",      value: "EXTRACT PIERRES PRECI."      },
    { label: "EXTRACT URANIUM",             value: "EXTRACT URANIUM"             },
    { label: "FAB BIJ PIER PRE HOR SYN",    value: "FAB BIJ PIER PRE HOR SYN"    },
    { label: "FAB VEHICULES MILITAIRES",    value: "FAB VEHICULES MILITAIRES"    },
    { label: "FABR PRODUIT A BASE TABAC",   value: "FABR PRODUIT A BASE TABAC"   },
    { label: "FABR PRODUIT PETROL RAFFI",   value: "FABR PRODUIT PETROL RAFFI"   },
    { label: "FABRICATION ALCOOL",          value: "FABRICATION ALCOOL"          },
    { label: "FABRICATION ARMES",           value: "FABRICATION ARMES"           },
    { label: "FERRAILLEURS",                value: "FERRAILLEURS"                },
    { label: "FILMS PORNOGRAPHIQUES",       value: "FILMS PORNOGRAPHIQUES"       },
    { label: "FINANCEMENT COLLABORATIF",    value: "FINANCEMENT COLLABORATIF"    },
    { label: "FONCIERES SAUF ASSETS",       value: "FONCIERES SAUF ASSETS"       },
    { label: "FPSO",                        value: "FPSO"                        },
    { label: "GENIE CIVIL",                 value: "GENIE CIVIL"                 },
    { label: "HEBERGEMENT MEDICALISE",      value: "HEBERGEMENT MEDICALISE"      },
    { label: "HUISSIER DE JUSTICE",         value: "HUISSIER DE JUSTICE"         },
    { label: "INDUSTRIE PHARMACEUTIQUE",    value: "INDUSTRIE PHARMACEUTIQUE"    },
    { label: "INSPECTION MAT.PREMIERES",    value: "INSPECTION MAT.PREMIERES"    },
    { label: "INSTITUTIONS MICROFINANCE",   value: "INSTITUTIONS MICROFINANCE"   },
    { label: "INTERM TRAIT DE PAIEMENT",    value: "INTERM TRAIT DE PAIEMENT"    },
    { label: "JEUX ARGENT NON REGLEMENT",   value: "JEUX ARGENT NON REGLEMENT"   },
    { label: "JEUX D ARGENT/EN LIGNE",      value: "JEUX D ARGENT/EN LIGNE"      },
    { label: "LAVERIES AUTOMATIQUES",       value: "LAVERIES AUTOMATIQUES"       },
    { label: "MARCHANDS AMBULANTS",         value: "MARCHANDS AMBULANTS"         },
    { label: "MARCHANDS DE BIENS",          value: "MARCHANDS DE BIENS"          },
    { label: "MATERIEL NUCLEAIRE",          value: "MATERIEL NUCLEAIRE"          },
    { label: "MINAGE CRYPTOMONNAIES",       value: "MINAGE CRYPTOMONNAIES"       },
    { label: "MIXING TUMBLING CRYPTOM",     value: "MIXING TUMBLING CRYPTOM"     },
    { label: "NEGOCIA. ENERGI&COMMODITE",   value: "NEGOCIA. ENERGI&COMMODITE"   },
    { label: "NON SENSIBLE",                value: "NON SENSIBLE"                },
    { label: "ONG",                         value: "ONG"                         },
    { label: "ORG. PARTIS POLITIQUES",      value: "ORG. PARTIS POLITIQUES"      },
    { label: "ORGA RELI ET CULTES",         value: "ORGA RELI ET CULTES"         },
    { label: "ORGANISATION SECTAIRES",      value: "ORGANISATION SECTAIRES"      },
    { label: "ORGANISATIONS CARITATIVES",   value: "ORGANISATIONS CARITATIVES"   },
    { label: "ORGANISMES DE FORMATION",     value: "ORGANISMES DE FORMATION"     },
    { label: "PECHE EN MER",                value: "PECHE EN MER"                },
    { label: "PRESTATAIRE DE COLLECTE",     value: "PRESTATAIRE DE COLLECTE"     },
    { label: "PROF DU SPORT AG & INT",      value: "PROF DU SPORT AG & INT"      },
    { label: "PROF DU SPORT CLUB & FED",    value: "PROF DU SPORT CLUB & FED"    },
    { label: "PROMOTEURS IMMOBILIERS",      value: "PROMOTEURS IMMOBILIERS"      },
    { label: "PROSTITUTION",                value: "PROSTITUTION"                },
    { label: "PSP NON AGREES",              value: "PSP NON AGREES"              },
    { label: "REP AUTO MOTO HORS FRANC",    value: "REP AUTO MOTO HORS FRANC"    },
    { label: "RESTAURATION RAPIDE",         value: "RESTAURATION RAPIDE"         },
    { label: "SECTEUR PRIVE DE LA SANTE",   value: "SECTEUR PRIVE DE LA SANTE"   },
    { label: "SECURITE PRIVEE",             value: "SECURITE PRIVEE"             },
    { label: "SERVICE CHANGE DE DEVISES",   value: "SERVICE CHANGE DE DEVISES"   },
    { label: "SERVICE ENCAISSMT CHEQUES",   value: "SERVICE ENCAISSMT CHEQUES"   },
    { label: "STE TIERCE DE PAIEMENTS",     value: "STE TIERCE DE PAIEMENTS"     },
    { label: "TRANSF FOND REMISE ESPECE",   value: "TRANSF FOND REMISE ESPECE"   },
    { label: "TRANSP MARIT DE BIENS",       value: "TRANSP MARIT DE BIENS"       },
    { label: "TRANSP MARIT HORS EXTRAC",    value: "TRANSP MARIT HORS EXTRAC"    },
    { label: "TRANSP MARIT INDUS EXTRAC",   value: "TRANSP MARIT INDUS EXTRAC"   },
    { label: "TRAVAUX DE CONSTRUC SPECI",   value: "TRAVAUX DE CONSTRUC SPECI"   },
    { label: "VENTE CANABIS DETAIL",        value: "VENTE CANABIS DETAIL"        },
    { label: "VENTE CANABIS GROS",          value: "VENTE CANABIS GROS"          },
    { label: "VENTE DETAIL ARMEMENT DEF",   value: "VENTE DETAIL ARMEMENT DEF"   },
    { label: "VENTE DETAIL BIJOUX",         value: "VENTE DETAIL BIJOUX"         },
    { label: "VENTE EQUIP. ELECTRONIQUE",   value: "VENTE EQUIP. ELECTRONIQUE"   },
    { label: "VENTE GROS ARMEMENT DEF",     value: "VENTE GROS ARMEMENT DEF"     },
    { label: "VENTE GROS BIJOUX",           value: "VENTE GROS BIJOUX"           },
    { label: "VENTE TABAC GROS",            value: "VENTE TABAC GROS"            },
    { label: "VENTES A DOMICILE",           value: "VENTES A DOMICILE"           },
    { label: "VENTES DE BIENS OCCAS HF",    value: "VENTES DE BIENS OCCAS HF"    },
    { label: "VTE ALCOOL HORS FRCHISE",     value: "VTE ALCOOL HORS FRCHISE"     },
    { label: "VTE DET PIERRE METAU PREC",   value: "VTE DET PIERRE METAU PREC"   },
    { label: "VTE GROS PIERRE META PREC",   value: "VTE GROS PIERRE META PREC"   },
  ],
});
export const indicateurPrivPro = createListCollection({
  items: [
    { label: "Usage Privé exclusif", value: "prive" },
    { label: "Usage Mixte", value: "mixte" },
    { label: "Usage Professionnel", value: "pro" },
    { label: "Usage Association", value: "association" },
  ],
});

export const codeSectoriel = createListCollection({
  items: [
    { label: "Primaire (0-25%)", value: "primaire" },
    { label: "Secondaire (26-50%)", value: "secondaire" },
    { label: "Tertiaire (51-75%)", value: "tertiaire" },
    { label: "Services (76-100%)", value: "services" },
  ],
});

// ─── Nature juridique ─────────────────────────────────────────────────────────

export const natureJuridique = createListCollection({
  items: [
    { label: "SOCIETE ANONYME",      value: "SOCIETE ANONYME"      },
    { label: "SOCIETE A RESP LIMIT", value: "SOCIETE A RESP LIMIT" },
    { label: "STE EN NOM COLLECTIF", value: "STE EN NOM COLLECTIF" },
    { label: "STE COMMANDITE SIMPL", value: "STE COMMANDITE SIMPL" },
    { label: "STE COMMANDITE ACTIO", value: "STE COMMANDITE ACTIO" },
    { label: "SOCIETE DE FAIT",      value: "SOCIETE DE FAIT"      },
    { label: "SOCIETE D'ETAT",       value: "SOCIETE D'ETAT"       },
    { label: "SOCIETE D'ECON.MIXTE", value: "SOCIETE D'ECON.MIXTE" },
    { label: "GROUP.INT.ECONOMIQUE", value: "GROUP.INT.ECONOMIQUE" },
    { label: "SOCIETE COOPERATIVE",  value: "SOCIETE COOPERATIVE"  },
    { label: "SOCIETE CIVILE PROF.", value: "SOCIETE CIVILE PROF." },
    { label: "SOCIETE CIVILE IMMOB", value: "SOCIETE CIVILE IMMOB" },
    { label: "SOCIETE CIVILE AGRIC", value: "SOCIETE CIVILE AGRIC" },
    { label: "STE PARTICIP.OUVRIER", value: "STE PARTICIP.OUVRIER" },
    { label: "AFFAIRE PERSONNELLE",  value: "AFFAIRE PERSONNELLE"  },
    { label: "ASSOCIATION",          value: "ASSOCIATION"          },
    { label: "SYNDICAT TRAVAILLEUR", value: "SYNDICAT TRAVAILLEUR" },
    { label: "SYNDICAT COPROPRIETE", value: "SYNDICAT COPROPRIETE" },
    { label: "SYNDICAT PROFESSIONN", value: "SYNDICAT PROFESSIONN" },
    { label: "COMITE D'ENTREPRISE",  value: "COMITE D'ENTREPRISE"  },
    { label: "ORGANIS.NON GOUVERN.", value: "ORGANIS.NON GOUVERN." },
    { label: "AUTRES FORMES JURIDI", value: "AUTRES FORMES JURIDI" },
    { label: "COMPTE JOINT / EPOUX", value: "COMPTE JOINT / EPOUX" },
    { label: "AUTRES COMPT.JOINTS",  value: "AUTRES COMPT.JOINTS"  },
    { label: "AUTRES CL.COLLECTIFS", value: "AUTRES CL.COLLECTIFS" },
  ],
});

// ─── Segment sécurité financière ──────────────────────────────────────────────

export const segmentSecuriteFinanciere = createListCollection({
  items: [
    { label: "MARCHES DE DETAIL",                value: "MARCHES DE DETAIL"                },
    { label: "SOCIETES COMMERCIALES",            value: "SOCIETES COMMERCIALES"            },
    { label: "PETITES ENTREPRISES",              value: "PETITES ENTREPRISES"              },
    { label: "SECTEUR PRIVE NON LUCRATIF",       value: "SECTEUR PRIVE NON LUCRATIF"       },
    { label: "BANQUES",                          value: "BANQUES"                          },
    { label: "COMPAGNIES D'ASSURANCE",           value: "COMPAGNIES D'ASSURANCE"           },
    { label: "FONDS",                            value: "FONDS"                            },
    { label: "INST. FINANCIERES/GESTION ACTIFS", value: "INST. FINANCIERES/GESTION ACTIFS" },
    { label: "ETATS/COLLECT. TERRITORIALES",     value: "ETATS/COLLECT. TERRITORIALES"     },
    { label: "BANQUES CENTRALES",                value: "BANQUES CENTRALES"                },
    { label: "SERVICES PUBLICS",                 value: "SERVICES PUBLICS"                 },
    { label: "ADMINISTRATIONS SUPRANATIONALES",  value: "ADMINISTRATIONS SUPRANATIONALES"  },
    { label: "FONDS SOUVERAINS",                 value: "FONDS SOUVERAINS"                 },
    { label: "BANQUE PRIVEE",                    value: "BANQUE PRIVEE"                    },
    { label: "STRUCTURES PATRIMONIALES BP",      value: "STRUCTURES PATRIMONIALES BP"      },
    { label: "STRUCTURES PATRIMONIALES RETAIL",  value: "STRUCTURES PATRIMONIALES RETAIL"  },
    { label: "NON CLIENTS PERSONNE PHYSIQUE",    value: "NON CLIENTS PERSONNE PHYSIQUE"    },
    { label: "NON CLIENTS PERSONNE MORALE",      value: "NON CLIENTS PERSONNE MORALE"      },
    
export const segmentDg = createListCollection({
  items: [
    { label: "Grand Public", value: "grand_public" },
    { label: "Premium / Mass Affluent", value: "premium" },
    { label: "Private Banking", value: "private_banking" },
    { label: "Corporate / VIP", value: "corporate" },
  ],
});
export const situationFamiliale = createListCollection({
  items: [
    { label: "Célibataire", value: "celibataire" },
    { label: "Marié(e)", value: "marie" },
    { label: "Divorcé(e)", value: "divorce" },
    { label: "Veuf/Veuve", value: "veuf" },
  ],
});
export const regimeMatrimonial = createListCollection({
  items: [
    { label: "Communauté de biens", value: "communaute_biens" },
    { label: "Séparation de biens", value: "separation_biens" },
    { label: "Participation aux acquêts", value: "participation_acquets" },
    { label: "Sans contrat (Légal)", value: "sans_contrat" },
  ],
});
export const statutResidence = createListCollection({
  items: [
    { label: "Propriétaire", value: "proprietaire" },
    { label: "Locataire", value: "locataire" },
    { label: "Logé par l'employeur", value: "loge_employeur" },
    { label: "Hébergé à titre gratuit", value: "heberge_gratuit" },
  ],
});
export const wilaya = createListCollection({
  items: [
    { label: "01 - Adrar", value: "01" },
    { label: "16 - Alger", value: "16" },
    { label: "31 - Oran", value: "31" },
    { label: "25 - Constantine", value: "25" },
  ],
});
export const commune = createListCollection({
  items: [
    { label: "Cocody", value: "cocody" },
    { label: "Plateau", value: "plateau" },
    { label: "Yopougon", value: "yopougon" },
    { label: "Marcory", value: "marcory" },
    { label: "Yamoussoukro", value: "yamoussoukro" },
  ],
});
export const segmentSecuriteFinanciere = createListCollection({
  items: [
    { label: "MARCHES DE DETAIL", value: "MARCHES DE DETAIL" },
    { label: "SOCIETES COMMERCIALES", value: "SOCIETES COMMERCIALES" },
    { label: "PETITES ENTREPRISES", value: "PETITES ENTREPRISES" },
    {
      label: "SECTEUR PRIVE NON LUCRATIF",
      value: "SECTEUR PRIVE NON LUCRATIF",
    },
    { label: "BANQUES", value: "BANQUES" },
    { label: "COMPAGNIES D’ASSURANCE", value: "COMPAGNIES D’ASSURANCE" },
    { label: "FONDS", value: "FONDS" },
    {
      label: "INST. FINANCIERES/GESTION ACTIFS",
      value: "INST. FINANCIERES/GESTION ACTIFS",
    },
    {
      label: "ETATS/COLLECT. TERRITORIALES",
      value: "ETATS/COLLECT. TERRITORIALES",
    },
    { label: "BANQUES CENTRALES", value: "BANQUES CENTRALES" },
    { label: "SERVICES PUBLICS", value: "SERVICES PUBLICS" },
    {
      label: "ADMINISTRATIONS SUPRANATIONALES",
      value: "ADMINISTRATIONS SUPRANATIONALES",
    },
    { label: "FONDS SOUVERAINS", value: "FONDS SOUVERAINS" },
    { label: "BANQUE PRIVEE", value: "BANQUE PRIVEE" },
    {
      label: "STRUCTURES PATRIMONIALES BP",
      value: "STRUCTURES PATRIMONIALES BP",
    },
    {
      label: "STRUCTURES PATRIMONIALES RETAIL",
      value: "STRUCTURES PATRIMONIALES RETAIL",
    },
    {
      label: "NON CLIENTS PERSONNE PHYSIQUE",
      value: "NON CLIENTS PERSONNE PHYSIQUE",
    },
    {
      label: "NON CLIENTS PERSONNE MORALE",
      value: "NON CLIENTS PERSONNE MORALE",
    },
  ],
});

// ─── Secteur d'activité ───────────────────────────────────────────────────────

export const secteurActivite = createListCollection({
  items: [
    { label: "Sans numéro d'activité",                          value: "SANS_NUM_D_ACTIVITE"      },
    { label: "Agriculture / Chasse / Sylviculture / Pêche",     value: "AGRI_CHAS_SYLVI_PECH"     },
    { label: "Agriculture / Chasse",                            value: "AGRICULTURE_CHASSE"       },
    { label: "Production agricole vivrière",                    value: "PROD_AGRI_VIVRIERE"       },
    { label: "Production agricole industrielle / exportation",  value: "PROD_AGRI_INDU_EXPOR"     },
    { label: "Élevage et production animale",                   value: "ELEVAGE_PROD_ANIMALE"     },
    { label: "Exploitation forestière",                         value: "EXPLOIT_FORRESTIERE"      },
    { label: "Pêche",                                           value: "PECHE"                    },
    { label: "Extraction de charbon",                           value: "EXTRACTION_CHARBON"       },
    { label: "Pétrole et gaz",                                  value: "PETROLE_ET_GAZ"           },
    { label: "Extraction de minerais",                          value: "EXTRACTION_MINERAIS"      },
    { label: "Fabrication de produits alimentaires",            value: "FAB_PRDT_ALIMENTAIRE"     },
    { label: "Conserveries",                                    value: "CONSERVERIES"             },
    { label: "Boulangerie / Pâtisserie",                        value: "BOULANGERIE_PATISSERIE"   },
    { label: "Industrie du café",                               value: "INDUSTRIE_DU_CAFE"        },
    { label: "Tabacs et allumettes",                            value: "TABACS_ALLUMETTES"        },
    { label: "Industries textiles",                             value: "INDUSTRIES_TEXTILES"      },
    { label: "Habillement / Cuir",                              value: "HABILLEMENT_CUIR"         },
    { label: "Industries du bois",                              value: "INDUSTRIES_BOIS"          },
    { label: "Scierie / Travaux mécaniques du bois",            value: "SCIERIE_TRAV_MEC_BOIS"    },
    { label: "Produits en bois",                                value: "PRODUITS_EN_BOIS"         },
    { label: "Fabrication de papier",                           value: "FABRICATION_PAPIER"       },
    { label: "Imprimerie / Édition / Presse",                   value: "IMPRI_EDITION_PRESSE"     },
    { label: "Industrie chimique",                              value: "INDUSTRIE_CHIMIQUE"       },
    { label: "Fabrication de produits chimiques",               value: "FAB_PRDTS_CHIMIQUES"      },
    { label: "Produits minéraux non métalliques",               value: "PRDT_MIN_NON_METALLI"     },
    { label: "Autres produits minéraux métalliques",            value: "AUTRE_PRDT_MIN_MET"       },
    { label: "Industrie métallurgique",                         value: "INDUST_METALLURGIQUE"     },
    { label: "Machines et matériels",                           value: "MACHINES_MATERIELS"       },
    { label: "Autres ouvrages métalliques",                     value: "AUTRES_OUVRAGES_META"     },
    { label: "Autres industries manufacturières",               value: "AUTRE_IND_MANUFACTUR"     },
    { label: "Électricité / Eau",                               value: "ELECTRICITE_EAU"          },
    { label: "Installation / Distribution d'eau",               value: "INSTALL_DISTRIB_EAU"      },
    { label: "Bâtiments",                                       value: "BATIMENTS"                },
    { label: "Travaux publics",                                 value: "TRAVAUX_PUBLICS"          },
    { label: "Commerce de gros",                                value: "COMMERCE_DEGROS"          },
    { label: "Exportation de café / cacao",                     value: "EXPORTATI_CAFE_CACAO"     },
    { label: "Commerce général import / export",                value: "COMM_GENERAL_IMP_EXP"     },
    { label: "Commerce de matières premières",                  value: "COMMERCE_MATIERE_PREMIERE" },
    { label: "Commerce alimentaire",                            value: "COMMERC_ALIMENTATION"     },
    { label: "Autres commerces",                                value: "AUTRES_COMMERCES"         },
    { label: "Commerce de détail",                              value: "COMMERCE_DETAIL"          },
    { label: "Hôtels / Restaurants",                            value: "HOTELS_RESTAURANTS"       },
    { label: "Restauration / Débit de boissons",                value: "RESTAURA_DEBIT_BOISS"     },
    { label: "Hôtel / Terrain de camping",                      value: "HOTEL_TERRAIN_CAMPING"    },
    { label: "Tourisme",                                        value: "TOURISME"                 },
    { label: "Transport et entrepôt",                           value: "TRANSPORT_ENTREPOT"       },
    { label: "Transport routier urbain",                        value: "TRANS_ROUTIER_URBAIN"     },
    { label: "Autres transports routiers de voyageurs",         value: "AUT_TRANS_ROUT_VOYAG"     },
    { label: "Transport routier de marchandises",               value: "TRANS_ROUTIER_MARCH"      },
    { label: "Communications",                                  value: "COMMUNICATIONS"           },
    { label: "Radiodiffusion / Télévision",                     value: "RADIODIFFUSION_TV"        },
    { label: "Établissements financiers",                       value: "ETS_FINANCIERS"           },
    { label: "Assurances",                                      value: "ASSURANCES"               },
    { label: "Affaires immobilières",                           value: "AFFAIRE_IMMOBILIERE"      },
    { label: "Société immobilière / Construction",              value: "SOCIETE_IMMOBI_CONST"     },
    { label: "Autres affaires immobilières",                    value: "AUTRE_AFFAIRE_IMMOBI"     },
    { label: "Autres prestations à entreprises",                value: "AUT_PRESTATION_ENT"       },
    { label: "Conseils juridiques",                             value: "CONSEILS_JURIDIQUES"      },
    { label: "Comptabilité / Tenue de livres",                  value: "COMPTABILITE_TENUE"       },
    { label: "Services techniques / Ingénierie / Architecture", value: "SERV_TECH_ING_ARCHIT"     },
    { label: "Administration générale",                         value: "ADMINISTRAT_GENERALE"     },
    { label: "Administration financière",                       value: "ADMINISTR_FINANCIERE"     },
    { label: "Défense nationale",                               value: "DEFENSE_NATIONALE"        },
    { label: "Services publics",                                value: "SERVICES_PUBLICS"         },
    { label: "Enseignement public",                             value: "ENSEIGNEMENT_PUBLIC"      },
    { label: "École technique / professionnelle",               value: "ECOLE_TECH_PROFESSIO"     },
    { label: "Autres enseignements",                            value: "AUTRE_ENSEIGNEMENT"       },
    { label: "Enseignement privé",                              value: "ENSEIGNEMENT_PRIVE"       },
    { label: "Santé",                                           value: "SANTE"                    },
    { label: "Services médicaux / dentaires / sanitaires",      value: "SERV_MEDIC_DENTAIRE"      },
    { label: "Services sociaux",                                value: "SERVICES_SOCIAUX"         },
    { label: "Associations",                                    value: "ASSOCIATIONS"             },
    { label: "Services juridiques",                             value: "SERVICES_JURIDIQUES"      },
    { label: "Cultes",                                          value: "CULTES"                   },
    { label: "Services récréatifs / culturels",                 value: "SERV_RECREATIF_CULTU"     },
    { label: "Production de films / cinéma",                    value: "PROD_FILM_CINEMATOGR"     },
    { label: "Services pour ménages / particuliers",            value: "SERV_PR_MENAGES_PART"     },
    { label: "Réparation de véhicules automobiles",             value: "REPARAT_VEHICULE_AUT"     },
    { label: "Blanchisserie / Teinturerie",                     value: "BLANCHISSERIE_TEINTU"     },
    { label: "Services domestiques",                            value: "SERVICES_DOMESTIQUES"     },
    { label: "Studio photographique",                           value: "STUDIO_PHOTOGRAPHIQUE"    },
    { label: "Organisations internationales",                   value: "ORGAN_INTERNATIONAUX"     },
    { label: "Organisations extraterritoriales",                value: "ORG_EXTRATERRITORIAUX"    },
    { label: "Activité inconnue",                               value: "ACTIVITE_INCONNUE"        },
    { label: "Particuliers",                                    value: "PARTICULIERS"             },
    { label: "Sans activité",                                   value: "SANS_ACTIVITE"            },
    { label: "Non enrichie",                                    value: "NON_ENRICHIE"             },
    { label: "Tiers chiffre",                                   value: "TIERS_CHIFFRE"            },
  ],
});
    { label: "Sans numéro d’activité", value: "SANS_NUM_D_ACTIVITE" },
    {
      label: "Agriculture / Chasse / Sylviculture / Pêche",
      value: "AGRI_CHAS_SYLVI_PECH",
    },
    { label: "Agriculture / Chasse", value: "AGRICULTURE_CHASSE" },
    { label: "Production agricole vivrière", value: "PROD_AGRI_VIVRIERE" },
    {
      label: "Production agricole industrielle / exportation",
      value: "PROD_AGRI_INDU_EXPOR",
    },
    { label: "Élevage et production animale", value: "ELEVAGE_PROD_ANIMALE" },
    { label: "Exploitation forestière", value: "EXPLOIT_FORRESTIERE" },
    { label: "Pêche", value: "PECHE" },
    { label: "Extraction de charbon", value: "EXTRACTION_CHARBON" },
    { label: "Pétrole et gaz", value: "PETROLE_ET_GAZ" },
    { label: "Extraction de minerais", value: "EXTRACTION_MINERAIS" },
    {
      label: "Fabrication de produits alimentaires",
      value: "FAB_PRDT_ALIMENTAIRE",
    },
    { label: "Conserveries", value: "CONSERVERIES" },
    { label: "Boulangerie / Pâtisserie", value: "BOULANGERIE_PATISSERIE" },
    { label: "Industrie du café", value: "INDUSTRIE_DU_CAFE" },
    { label: "Tabacs et allumettes", value: "TABACS_ALLUMETTES" },
    { label: "Industries textiles", value: "INDUSTRIES_TEXTILES" },
    { label: "Habillement / Cuir", value: "HABILLEMENT_CUIR" },
    { label: "Industries du bois", value: "INDUSTRIES_BOIS" },
    {
      label: "Scierie / Travaux mécaniques du bois",
      value: "SCIERIE_TRAV_MEC_BOIS",
    },
    { label: "Produits en bois", value: "PRODUITS_EN_BOIS" },
    { label: "Fabrication de papier", value: "FABRICATION_PAPIER" },
    { label: "Imprimerie / Édition / Presse", value: "IMPRI_EDITION_PRESSE" },
    { label: "Industrie chimique", value: "INDUSTRIE_CHIMIQUE" },
    {
      label: "Fabrication de produits chimiques",
      value: "FAB_PRDTS_CHIMIQUES",
    },
    {
      label: "Produits minéraux non métalliques",
      value: "PRDT_MIN_NON_METALLI",
    },
    {
      label: "Autres produits minéraux métalliques",
      value: "AUTRE_PRDT_MIN_MET",
    },
    { label: "Industrie métallurgique", value: "INDUST_METALLURGIQUE" },
    { label: "Machines et matériels", value: "MACHINES_MATERIELS" },
    { label: "Autres ouvrages métalliques", value: "AUTRES_OUVRAGES_META" },
    {
      label: "Autres industries manufacturières",
      value: "AUTRE_IND_MANUFACTUR",
    },
    { label: "Électricité / Eau", value: "ELECTRICITE_EAU" },
    {
      label: "Installation / Distribution d’eau",
      value: "INSTALL_DISTRIB_EAU",
    },
    { label: "Bâtiments", value: "BATIMENTS" },
    { label: "Travaux publics", value: "TRAVAUX_PUBLICS" },
    { label: "Commerce de gros", value: "COMMERCE_DEGROS" },
    { label: "Exportation de café / cacao", value: "EXPORTATI_CAFE_CACAO" },
    {
      label: "Commerce général import / export",
      value: "COMM_GENERAL_IMP_EXP",
    },
    {
      label: "Commerce de matières premières",
      value: "COMMERCE_MATIERE_PREMIERE",
    },
    { label: "Commerce alimentaire", value: "COMMERC_ALIMENTATION" },
    { label: "Autres commerces", value: "AUTRES_COMMERCES" },
    { label: "Commerce de détail", value: "COMMERCE_DETAIL" },
    { label: "Hôtels / Restaurants", value: "HOTELS_RESTAURANTS" },
    {
      label: "Restauration / Débit de boissons",
      value: "RESTAURA_DEBIT_BOISS",
    },
    { label: "Hôtel / Terrain de camping", value: "HOTEL_TERRAIN_CAMPING" },
    { label: "Tourisme", value: "TOURISME" },
    { label: "Transport et entrepôt", value: "TRANSPORT_ENTREPOT" },
    { label: "Transport routier urbain", value: "TRANS_ROUTIER_URBAIN" },
    {
      label: "Autres transports routiers de voyageurs",
      value: "AUT_TRANS_ROUT_VOYAG",
    },
    {
      label: "Transport routier de marchandises",
      value: "TRANS_ROUTIER_MARCH",
    },
    { label: "Communications", value: "COMMUNICATIONS" },
    { label: "Radiodiffusion / Télévision", value: "RADIODIFFUSION_TV" },
    { label: "Établissements financiers", value: "ETS_FINANCIERS" },
    { label: "Assurances", value: "ASSURANCES" },
    { label: "Affaires immobilières", value: "AFFAIRE_IMMOBILIERE" },
    {
      label: "Société immobilière / Construction",
      value: "SOCIETE_IMMOBI_CONST",
    },
    { label: "Autres affaires immobilières", value: "AUTRE_AFFAIRE_IMMOBI" },
    { label: "Autres prestations à entreprises", value: "AUT_PRESTATION_ENT" },
    { label: "Conseils juridiques", value: "CONSEILS_JURIDIQUES" },
    { label: "Comptabilité / Tenue de livres", value: "COMPTABILITE_TENUE" },
    {
      label: "Services techniques / Ingénierie / Architecture",
      value: "SERV_TECH_ING_ARCHIT",
    },
    { label: "Administration générale", value: "ADMINISTRAT_GENERALE" },
    { label: "Administration financière", value: "ADMINISTR_FINANCIERE" },
    { label: "Défense nationale", value: "DEFENSE_NATIONALE" },
    { label: "Services publics", value: "SERVICES_PUBLICS" },
    { label: "Enseignement public", value: "ENSEIGNEMENT_PUBLIC" },
    {
      label: "École technique / professionnelle",
      value: "ECOLE_TECH_PROFESSIO",
    },
    { label: "Autres enseignements", value: "AUTRE_ENSEIGNEMENT" },
    { label: "Enseignement privé", value: "ENSEIGNEMENT_PRIVE" },
    { label: "Santé", value: "SANTE" },
    {
      label: "Services médicaux / dentaires / sanitaires",
      value: "SERV_MEDIC_DENTAIRE",
    },
    { label: "Services sociaux", value: "SERVICES_SOCIAUX" },
    { label: "Associations", value: "ASSOCIATIONS" },
    { label: "Services juridiques", value: "SERVICES_JURIDIQUES" },
    { label: "Cultes", value: "CULTES" },
    { label: "Services récréatifs / culturels", value: "SERV_RECREATIF_CULTU" },
    { label: "Production de films / cinéma", value: "PROD_FILM_CINEMATOGR" },
    {
      label: "Services pour ménages / particuliers",
      value: "SERV_PR_MENAGES_PART",
    },
    {
      label: "Réparation de véhicules automobiles",
      value: "REPARAT_VEHICULE_AUT",
    },
    { label: "Blanchisserie / Teinturerie", value: "BLANCHISSERIE_TEINTU" },
    { label: "Services domestiques", value: "SERVICES_DOMESTIQUES" },
    { label: "Studio photographique", value: "STUDIO_PHOTOGRAPHIQUE" },
    { label: "Organisations internationales", value: "ORGAN_INTERNATIONAUX" },
    {
      label: "Organisations extraterritoriales",
      value: "ORG_EXTRATERRITORIAUX",
    },
    { label: "Activité inconnue", value: "ACTIVITE_INCONNUE" },
    { label: "Particuliers", value: "PARTICULIERS" },
    { label: "Sans activité", value: "SANS_ACTIVITE" },
    { label: "Non enrichie", value: "NON_ENRICHIE" },
    { label: "Tiers chiffre", value: "TIERS_CHIFFRE" },
  ],
});
export const activiteEconomique = createListCollection({
  items: [
    { label: "Extraction et Mines", value: "extraction_mines" },
    { label: "Industrie Agroalimentaire", value: "agroalimentaire" },
    { label: "Bâtiment et Travaux Publics (BTP)", value: "btp" },
    { label: "Commerce de Gros et Détail", value: "commerce" },
    { label: "Services Financiers et Assurances", value: "finance_assurance" },
  ],
});
export const libelleApe = createListCollection({
  items: [
    { label: "Commerce de détail", value: "commerce_detail" },
    { label: "Bâtiment et Travaux", value: "btp" },
    { label: "Transport / Logistique", value: "transport_logistique" },
    { label: "Conseil et Ingénierie", value: "conseil_ingenierie" },
  ],
});
