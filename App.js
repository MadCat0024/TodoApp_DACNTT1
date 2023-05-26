import { StyleSheet, Text, View, Button, Alert ,TouchableWithoutFeedback , TouchableOpacity, ScrollView } from 'react-native';

import React, {useEffect, useState} from 'react';
import Task from './components/Task';
import styles from './appComponents.Styles';
import Form from './components/Form';
import { getAll, insert} from './database/services'
import { TODOLIST_SCHEMA} from './database/name'
//import { updateTodoList, deleteTodoList, queryAllTodoList, insertNewTodoList } from './database/allSchema'
export default function App() {
  const [taskList, settaskList] = useState([])
  console.log(taskList,'taskList')
  useEffect(() => {
    handleAddTask()
  },[])
  const handleAddTask = async(task) => {
    try {
      let list = await getAll(TODOLIST_SCHEMA)
      console.log(list)
      settaskList(list)
    } catch (error) {
      console.log(error)
    }
    
  }
  const handleDeleteTask = (index) =>{
    Alert.alert('Delete Task', 'Bạn đã hoàn thành việc này?', [
      {
        text: 'Yes',
        onPress: () => {
          let taskListTmp = [...taskList];
          //xoá 1 phần tử từ vị trí index
          taskListTmp.splice(index, 1);
          settaskList(taskListTmp);
        }
      },
      {text: 'No', onPress: () => {}},
    ]);
  }
  return(
    <View style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List</Text>
        <ScrollView style={styles.items}>
          {
            taskList.map((item, index) =>{
                return <Task key = {index} title={item.content} number={index} onDeleteTask={() => handleDeleteTask(index)}/>
            })
          }
        </ScrollView>

      </View>
      <View style={styles.textInput}></View>
      <Form onAddTask={handleAddTask} />
    </View>
  )
}


// const App = () => {
//   return(
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }  

// export default App
