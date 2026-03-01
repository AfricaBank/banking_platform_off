import { Table, Container, Flex, IconButton, Box } from "@chakra-ui/react";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

export interface ColumnConfig<T> {
  header: string;
  key: keyof T | "actions";
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

export const GenericTable = <T extends object>({
  data,
  columns,
  onView,
  onEdit,
  onDelete,
}: GenericTableProps<T>) => {
  return (
    <Box
      p={6}
      bg="darkGrey.50"
      rounded={10}
      boxShadow="0 1px 4px rgba(0,0,0,0.1)"
    >
      <Container
        maxW="full"
        mt={2}
        overflowX="auto"
        p={0}
        boxShadow="0 1px 4px rgba(0,0,0,0.1)"
      >
        <Table.Root size="sm" variant="line" interactive>
          <Table.Header>
            <Table.Row bg="dogerBlue.500">
              {columns.map((col, i) => (
                <Table.ColumnHeader
                  key={i}
                  color="white"
                  py={3}
                  whiteSpace="nowrap"
                  textAlign="center"
                >
                  {col.header}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item, rowIndex) => (
              <Table.Row key={rowIndex} _hover={{ bg: "lightGrey.50" }}>
                {columns.map((col, colIndex) => (
                  <Table.Cell key={colIndex} textAlign="center" py={2}>
                    {col.render ? (
                      col.render(item)
                    ) : col.key === "actions" ? (
                      <Flex gap={2} justify="center">
                        {onView && (
                          <IconButton
                            rounded="10px"
                            aria-label="Voir"
                            size="xs"
                            bg="dogerBlue.500"
                            color="white"
                            onClick={() => onView(item)}
                          >
                            <LuEye />
                          </IconButton>
                        )}
                        {onEdit && (
                          <IconButton
                            rounded="10px"
                            aria-label="Modifier"
                            size="xs"
                            bg="warnOrange.400"
                            color="white"
                            onClick={() => onEdit(item)}
                          >
                            <LuPencil />
                          </IconButton>
                        )}
                        {onDelete && (
                          <IconButton
                            rounded="10px"
                            aria-label="Supprimer"
                            size="xs"
                            bg="errorRed.400"
                            color="white"
                            onClick={() => onDelete(item)}
                          >
                            <LuTrash2 />
                          </IconButton>
                        )}
                      </Flex>
                    ) : (
                      /* PRIORITÉ 3 : Affichage simple du texte */
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
