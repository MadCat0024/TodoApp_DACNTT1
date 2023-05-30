import { StyleSheet, Text, View, Button, Alert, Image ,TouchableWithoutFeedback , TouchableOpacity, ScrollView } from 'react-native';

import React, {useEffect, useState} from 'react';
import Task from './components/Task';
import styles from './appComponents.Styles';
import Form from './components/Form';
import { deleteTask, getAll, insert, queryAllTodoList,deleteAllTask, GetAllId} from './database/services'
import { TODOLIST_SCHEMA} from './database/name'
import { TodoListSchema } from './database/tables';
import { Object } from 'realm';
//import { updateTodoList, deleteTodoList, queryAllTodoList, insertNewTodoList } from './database/allSchema'
export default function App() {
  const [taskList, settaskList] = useState([])
  //console.log(taskList,'taskList')
  useEffect(() => {
    handleAddTask()
  },[])
  const handleAddTask = async(task) => {
    try {
      let list = await getAll(TODOLIST_SCHEMA)
      // console.log(list)
      settaskList(list)
    } catch (error) {
      console.log(error)
    }
    
  }
  // delete Task
  const handleDeleteTask = async (item) => {
    try {

      Alert.alert('Delete Task', 'Bạn đã hoàn thành việc này?', [
        {
          text: 'Có',
          onPress: () => {
            deleteTask(TODOLIST_SCHEMA, item.id)
              .then((rs) => {
                if (rs === 1) {
                  return Alert.alert('Thông báo', 'Xoá thành công', [{ text: 'OK', onPress: () => handleAddTask() }])
                } else {
                  return Alert.alert('Thông báo', 'Xoá không thành công')
                }
              })
              .catch(error => {
                console.log(error)
                return Alert.alert('Thông báo', 'Xoá khôngs thành công')
              })
            // let taskListTmp = [...taskList];
            // //xoá 1 phần tử từ vị trí index
            // taskListTmp.splice(index, 1);
            // settaskList(taskListTmp);

          }
        },
        { text: 'Không', onPress: () => { } },
      ]);
    } catch (error) {
      console.log(error)
    }
  }
  //delete all task
  const handleDeleteAll = async()=>{
    try {
      Alert.alert('Delete All Task', 'Bạn muốn xóa hết các việc cần làm?', [
        {
          text: 'Có',
          onPress: () => {
            deleteAllTask().then((rs) => {
              if (rs === 1) {
                return Alert.alert('Thông báo', 'Xoá thành công', [{ text: 'OK', onPress: () => handleAddTask()}])
              } else {
                return Alert.alert('Thông báo', 'Xoá không thành công')
              }
            }).catch(error => {
              console.log(error)
              return Alert.alert('Thông báo', 'Xoá không thành công')
            })
        }
      }, 
        {
          text: 'Không', onPress: () => { } 
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  //Update task
  // sort task list
  
  return(
    <View style={styles.container}>
      <View style={styles.body}>
      <Text style={styles.header}>Todo List</Text>

        <View style={styles.iconGr}>
          <TouchableOpacity onPress={handleDeleteAll} style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={require('./components/icon/trash-icon.png')}/>
            <Text style={styles.textIcon}>DeleteAll</Text>
          </TouchableOpacity>

          <TouchableOpacity  style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={require('./components/icon/sort.png')}/>
            <Text style={styles.textIcon}>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={require('./components/icon/help.png')}/>
            <Text style={styles.textIcon}>Guide</Text>
          </TouchableOpacity>
        </View>
          
        <ScrollView style={styles.items}>
          {
            taskList.map((item, index) =>{
              return <Task
                key={index}
                title={item.content}
                number={index}
                onDeleteTask={() => handleDeleteTask(item)}
                onUpdateTask={() => handleUpdate(item)}
                onDeleteAllTask={() => handleDeleteAll()}
                
              />
              //return <Task key = {index} title={item.content} number={index} onDeleteTask={() => handleDeleteTask(index)}/>
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
