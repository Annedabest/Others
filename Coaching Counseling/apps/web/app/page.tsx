import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.50" px={8}>
      <Box bg="white" rounded="xl" shadow="xl" p={{ base: 6, md: 10 }} maxW="3xl" w="full">
        <Stack spacing={6}>
          <Heading size="lg" color="brand.700">
            Continual Learning Coaching Platform
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Track pastoral study goals, manage session plans, and centralize insights across your knowledge
            repositories. This MVP shell will evolve into the planner, knowledge hub, and coaching console.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
            <Button colorScheme="brand" size="lg">
              View Learning Planner
            </Button>
            <Button size="lg" variant="outline" colorScheme="brand">
              Explore Knowledge Hub
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Flex>
  );
}
