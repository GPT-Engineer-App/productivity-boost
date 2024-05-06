import { useState } from 'react';
import { Box, Container, VStack, Input, IconButton, Text, Flex, Heading, useColorModeValue, useColorMode, Button } from '@chakra-ui/react';
import { FaSun, FaMoon, FaTrash, FaCheck } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8}>
        <Flex w="full" justify="space-between" align="center">
          <Heading>Todo App</Heading>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); handleAddTask(); }}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="filled"
            mr={2}
          />
          <IconButton
            icon={<FaCheck />}
            aria-label="Add task"
            onClick={handleAddTask}
          />
        </Flex>
        <VStack spacing={4} align="stretch">
          {tasks.map(task => (
            <Flex key={task.id} p={4} borderWidth="1px" borderRadius="lg" justify="space-between" align="center" bg={useColorModeValue('gray.100', 'gray.700')}>
              <Text as={task.isCompleted ? 's' : undefined}>{task.text}</Text>
              <IconButton
                icon={<FaTrash />}
                aria-label="Delete task"
                onClick={() => handleDeleteTask(task.id)}
              />
              <IconButton
                icon={<FaCheck />}
                aria-label="Complete task"
                onClick={() => handleToggleTask(task.id)}
                colorScheme={task.isCompleted ? 'pink' : 'green'}
              />
            </Flex>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;