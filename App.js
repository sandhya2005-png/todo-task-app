import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

export default function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([]);

  const fakeLogin = () => {
    setUser({ name: 'Sandhya' }); // Simulated login
  };

  const addTask = () => {
    if (title.trim() === '') {
      Alert.alert('Enter task name');
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
        <TouchableOpacity style={styles.loginButton} onPress={fakeLogin}>
          <AntDesign name="google" size={20} color="white" />
          <Text style={styles.loginText}>Login with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user.name}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Task"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <AntDesign name="pluscircle" size={28} color="#3b82f6" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noTask}>No Tasks</Text>}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity onPress={() => toggleComplete(item.id)} style={{ flex: 1 }}>
              <Text style={[styles.taskText, item.completed && styles.completed]}>
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2
  },
  taskText: {
    fontSize: 16
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray'
  },
  noTask: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 20
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: '#db4437',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  loginText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
