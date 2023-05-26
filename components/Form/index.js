import { View, Text, Keyboard, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native'
import React , {useState} from 'react'
import styles from './style';
//import { updateTodoList, deleteTodoList, queryAllTodoList, insertNewTodoList } from "./../../database/allSchema"
import { getAll, insert} from '../../database/services'
import { TODOLIST_SCHEMA} from '../../database/name'
const Form = (props) => {
  const [task, setTask] = useState('')
  const handleAddTask = async() => {
    try {
      if(task.length === 0){
      alert('Vui lòng nhập công việc!')
      return false
    }
      let l = await getAll(TODOLIST_SCHEMA)
      let obj = {
        id: l.length.toString(),
        content: task,
        created_on: new Date().toString(),
        status: 0
      }
      await insert(TODOLIST_SCHEMA,obj)
      props.onAddTask(task);
      setTask('')
    } catch (error) {
      console.log(error)
    }
    // if(task.length === 0){
    //   alert('Vui lòng nhập công việc!')
    //   return false
    // }
    // 
    // setTask('');
    // Keyboard.dismiss();
  }
  return (
    <KeyboardAvoidingView style={styles.addTask}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={10}>
      <TextInput 
      value={task}
      onChangeText={(text) => setTask(text)}
      placeholder='input your task' 
      style={styles.input} 
      />     
      <TouchableOpacity   
      onPress={()=>handleAddTask()} >
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>+</Text>
        </View>
      </TouchableOpacity>
      
    </KeyboardAvoidingView>
  )
}

export default Form