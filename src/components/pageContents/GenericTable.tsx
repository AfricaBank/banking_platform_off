import { Table, Container, Box } from "@chakra-ui/react";

export interface ColumnConfig<T> {
  header: string;
  key: keyof T | "actions";
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
}

export const GenericTable = <T extends object>({
  data,
  columns,
}: GenericTableProps<T>) => {
  return (
    <Box p={4} bg="gray.50" rounded="xl">
      <Container maxW="full" overflowX="auto" p={0}>
        <Table.Root
          size="sm"
          variant="line" // On réutilise une variante valide exigée par ton TypeScript
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 12px", // Conserve l'écartement des lignes
          }}
        >
          {/* 1. EN-TÊTE DU TABLEAU */}
          <Table.Header>
            <Table.Row
              bg="dogerBlue.500"
              border="none" // Supprime la bordure native de la variante "line"
              boxShadow="0 4px 10px rgba(0, 0, 0, 0.08)"
            >
              {columns.map((col, i) => (
                <Table.ColumnHeader
                  key={i}
                  color="white"
                  py={4}
                  fontWeight="medium"
                  fontSize="sm"
                  whiteSpace="nowrap"
                  textAlign="center"
                  border="none" // Supprime la bordure de chaque cellule d'en-tête
                  _first={{ borderLeftRadius: "xl" }}
                  _last={{ borderRightRadius: "xl" }}
                >
                  {col.header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          {/* 2. CORPS DU TABLEAU (Lignes flottantes) */}
          <Table.Body>
            {data.map((item, rowIndex) => (
              <Table.Row
                key={rowIndex}
                bg="white"
                border="none" // Supprime la bordure de ligne native
                boxShadow="0 2px 5px rgba(0, 0, 0, 0.03)"
                transition="all 0.2s ease"
                _hover={{
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.06)",
                  bg: "gray.50/50",
                }}
              >
                {columns.map((col, colIndex) => (
                  <Table.Cell
                    key={colIndex}
                    textAlign="center"
                    py={4}
                    fontSize="sm"
                    color="gray.600"
                    // On force des bordures légères personnalisées pour envelopper chaque carte
                    borderTop="1px solid"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _first={{
                      borderLeft: "1px solid",
                      borderColor: "gray.100",
                      borderLeftRadius: "xl",
                    }}
                    _last={{
                      borderRight: "1px solid",
                      borderColor: "gray.100",
                      borderRightRadius: "xl",
                    }}
                  >
                    {col.render ? (
                      col.render(item)
                    ) : (
                      <>{String(item[col.key as keyof T] ?? "")}</>
                    )}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
    </Box>
  );
};
