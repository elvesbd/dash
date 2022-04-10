import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
     {showProfileData && (
      <Box mr="4" textAlign="right">
        <Text>Elves Brito</Text>
        <Text color="gray.300" fontSize="small">
          elvesbd@dash.com
        </Text>
      </Box>
     )}

      <Avatar size="md" name="Elves Brito" src="https://github.com/elvesbd.png"/>
    </Flex>
  );
};