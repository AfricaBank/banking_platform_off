import {Box, IconButton, Flex, Button, Container, Table} from "@chakra-ui/react";
import {useState} from "react";
import {Link, useNavigate } from "react-router-dom";
import FilterForm from "@/components/pageContents/FilterForm.tsx";
import {LuEye, LuPencil, LuTrash2} from "react-icons/lu";
import {HiFilter, HiPencil, HiPlus} from "react-icons/hi";
import { FaShareFromSquare } from "react-icons/fa6";


const data = [
    {
        prenomNom: "Issaga Gaye",
        numeroDossier: "123456",
        typeProcessus: "EER",
        dernierStatut: "Términer",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Mor Mbathie",
        numeroDossier: "20000",
        typeProcessus: "EER",
        dernierStatut: "À valider DG",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Abdilah",
        numeroDossier: "85000",
        typeProcessus: "EER",
        dernierStatut: "En cours",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Glad",
        numeroDossier: "841200",
        typeProcessus: "EER",
        dernierStatut: "À valider DE",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Berthonge",
        numeroDossier: "58000",
        typeProcessus: "Processus A",
        dernierStatut: "En cours",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Pape Aldiouma",
        numeroDossier: "54230",
        typeProcessus: "Processus A",
        dernierStatut: "En cours",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Ahmed Kawsara",
        numeroDossier: "502100",
        typeProcessus: "Processus A",
        dernierStatut: "En cours",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
    {
        prenomNom: "Diagaraf",
        numeroDossier: "42000",
        typeProcessus: "Processus A",
        dernierStatut: "En cours",
        typeModification: "Modification 1",
        typeClient: "Client A",
        categorieClientele: "Catégorie 1",
        dateCreation: "2024-03-21",
        dateFin: "2024-04-21",
        initiateur: "Alice",
        codeExploitant: "ABC123",
    },
];

const Tableau = () => {
    const [filterValue, setFilterValue] = useState('');
    const filteredData = data.filter(item =>
        item.prenomNom.toLowerCase().includes(filterValue.toLowerCase())
    );
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };
    const navigate = useNavigate();

    const handleInitiateDossier = () => {
        navigate('/initiation');
      };

    return (
        <Box>
            <Box >
                {/* Formulaire de filtre */}
                <Box mb={4} paddingTop={2}>
                    <Flex justifyContent="flex-end" mr={10} gap={4}>
                        <Link to="/initiation" style={{ textDecoration: 'none' }}> {/* Enveloppez le Button dans un Link */}
                            <Button
                                onClick={(e) => {
                                    // Ajoutez ici votre logique personnalisée avant la navigation
                                    handleInitiateDossier(); // Appel de votre fonction
                                    // e.preventDefault(); // Si vous voulez empêcher la navigation par défaut (ce n'est pas nécessaire ici)
                                }}
                                colorScheme="teal"
                                bg="primary.dogerBlue.300"
                                width={"150px"}
                            >
                                <IconButton
                                    aria-label="Modifier"
                                    size='sm'
                                    color="primary.dogerBlue.300"
                                    bg="white"
                                    borderRadius="20%"
                                    mr={1}
                                >
                                    <HiPlus />
                                </IconButton>
                                Démarrer EER
                            </Button>
                        </Link>
                        <Button onClick={handleInitiateDossier} colorScheme="teal" bg={"blue"} width={"185px"}>
                            <IconButton
                                aria-label="Modifier"
                                bg="white"
                                color="primary.dogerBlue.300"
                                size='sm'
                                borderRadius="20%"
                                mr={1}
                            >
                                <HiPencil/>
                            </IconButton>
                            Réviser un compte
                        </Button>

                        <Button onClick={handleInitiateDossier} colorScheme="teal" width={"210px"}>
                            <IconButton
                                aria-label="Modifier"
                                bg="white"
                                color="teal"
                                size='sm'
                                borderRadius="20%"
                                mr={1}
                            >
                                <FaShareFromSquare/>
                            </IconButton>
                            Exporter des comptes
                        </Button>
                        <IconButton
                            aria-label="Modifier"
                            size='lg'
                            bg="state.orange.300"
                            mr={1}
                            color="white"
                        >
                            <HiFilter />

                        </IconButton>

                    </Flex>
                </Box>
                <FilterForm />

            </Box>
            <Container overflow="scroll" border="1px" maxW="1200px">
                    <Table.Root>
                        <Table.Header>
                            <Table.Row height="40px"
                                top="666px"
                                left="123.31px"
                                borderRadius="10px"
                                bg = "primary.dogerBlue.300">
                                <Table.ColumnHeader borderLeftRadius="10px" color="white" whiteSpace="nowrap">Prenom Nom ou Raison sociale</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Numéro de dossier</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Type de processus</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Dernier Statut</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Type de modification</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Type de Client</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Catégorie clientèle</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Date de création</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Date de fin</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Initiateur</Table.ColumnHeader>
                                <Table.ColumnHeader color="white" whiteSpace="nowrap">Code Exploitant</Table.ColumnHeader>
                                <Table.ColumnHeader borderRightRadius="10px" color="white">Actions</Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body overflowX={"auto"}>
                            {filteredData.map((item, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{item.prenomNom}</Table.Cell>
                                    <Table.Cell>{item.numeroDossier}</Table.Cell>
                                    <Table.Cell>{item.typeProcessus}</Table.Cell>
                                    <Table.Cell>{item.dernierStatut}</Table.Cell>
                                    <Table.Cell>{item.typeModification}</Table.Cell>
                                    <Table.Cell>{item.typeClient}</Table.Cell>
                                    <Table.Cell>{item.categorieClientele}</Table.Cell>
                                    <Table.Cell>{item.dateCreation}</Table.Cell>
                                    <Table.Cell>{item.dateFin}</Table.Cell>
                                    <Table.Cell>{item.initiateur}</Table.Cell>
                                    <Table.Cell>{item.codeExploitant}</Table.Cell>
                                    <Table.Cell>
                                        <Flex>
                                            <IconButton
                                                aria-label="Modifier"
                                                bg="primary.dogerBlue.300"
                                                size='sm'
                                                //onClick={() => handleEdit(item)}
                                                mr={2}
                                                borderRadius="md"
                                            >
                                                <LuEye/>
                                            </IconButton>
                                            <IconButton
                                                aria-label="Modifier"
                                                size='sm'
                                                bg="state.orange.0"
                                                //onClick={() => handleEdit(item)}
                                                mr={2}
                                                borderRadius="md"
                                            >
                                                <LuPencil color={"white"} />
                                            </IconButton>
                                            <IconButton
                                                aria-label="Supprimer"
                                                bg="state.red.300"
                                                size='sm'
                                                borderRadius="md"
                                            >
                                                <LuTrash2 color={"white"}/>
                                            </IconButton>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
            </Container>
        </Box>
    );
};

export default Tableau;
