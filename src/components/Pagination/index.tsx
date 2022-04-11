import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const sibilingsCount: number = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  }).filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

const previousPages = currentPage > 1
  ? generatePagesArray(currentPage - 1 - sibilingsCount, currentPage -1)
  : []

const nextPages = currentPage < lastPage
  ? generatePagesArray(currentPage, Math.min(currentPage + sibilingsCount, lastPage))
  : []

  return (
    <Stack 
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        { currentPage > (1 + sibilingsCount) && (
          <>
            <PaginationItem pageNumber={1}/>
            { currentPage > (2 + sibilingsCount) && (
              <Text 
                color="gray.300"
                width="8" textAlign="center"
                display="grid"
                alignItems="flex-end"
              >
                ...
              </Text>
            )}
          </>
        )}

        { previousPages.length > 0 && previousPages.map((page) => {
          return  <PaginationItem key={page} pageNumber={page} />
        })}

        <PaginationItem pageNumber={currentPage} isCurrent/>

        { nextPages.length > 0 && nextPages.map((page) => {
          return  <PaginationItem key={page} pageNumber={page} />
        })}

        { currentPage + sibilingsCount < lastPage && (
          <>
            { currentPage + 1 + sibilingsCount < lastPage && (
              <Text 
                color="gray.300"
                width="8" textAlign="center"
                display="grid"
                alignItems="flex-end"
              >
                ...
              </Text>
            )}
            <PaginationItem pageNumber={lastPage}/>
          </>
        ) }
      </Stack>
    </Stack>
  );
}