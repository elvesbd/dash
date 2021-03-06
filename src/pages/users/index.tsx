import { 
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Checkbox,
  Tbody,
  Text,
  useBreakpointValue,
  Spinner
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";
import { useEffect } from "react";
import { useQuery } from 'react-query';
import Link from 'next/link';

export default function UserList() {
  const { data, isLoading, error } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json()
    
    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      };
    });
    return users;
  }, {
    staleTime: 1000 * 5 // 5 seconds
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => response.json())
      .then(data => console.log(data))
  }, []);

  return (
    <Box>
      <Header />

      <Flex w="100" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                font-size="sm" 
                colorScheme="pink"
                cursor="pointer"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
              > 
                Criar novo
              </Button>
            </Link>
          </Flex>

          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falhou</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink"/>
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink"/>
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                      {isWideVersion &&  <Td>{user.createdAt}</Td>}
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>

              <Pagination />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  );
}