import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const fakeLogin = () => {
    setUser({ name: 'Sandhya' }); // simulate user login
  };

  const addTask = () => {
    if (title.trim() === '') {
      Alert.alert('Please enter a task title');
      return;
    }
    const newTask = {
      id: Date.now().toString(),
      title,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Todo App</Text>
        <Button title="Login with Google (Simulated)" onPress={fakeLogin} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}</Text>

      <TextInput
        placeholder="Enter Task"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <Button title="Add Task" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noTask}>No Tasks</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleComplete(item.id)}
            onLongPress={() => deleteTask(item.id)}
          >
            <Text style={[styles.task, item.completed && styles.completed]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  task: { padding: 10, fontSize: 18, borderBottomWidth: 1 },
  completed: { textDecorationLine: 'line-through', color: 'gray' },
  noTask: { marginTop: 20, textAlign: 'center' },
});
