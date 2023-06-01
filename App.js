import { StyleSheet, Text, View, Button, Alert, TextInput, Image, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';

import React, { useEffect, useState } from 'react';
import Task from './components/Task';
import styles from './appComponents.Styles';
import Form from './components/Form';
import { deleteTask, getAll, insert, queryAllTodoList, deleteAllTask, GetAllId, update } from './database/services.js'
import { TODOLIST_SCHEMA } from './database/name';
import { TodoListSchema } from './database/tables';
import color from './contains/color';

export default function App() {
  const [taskList, settaskList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [GuideVisible, setGuideVisible] = useState(false);
  const [text, setText] = useState('');
  const [id, setId] = useState(null);
  const [inscrease, setIncrease] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  //console.log(taskList,'taskList')
  useEffect(() => {
    handleAddTask()
  }, [inscrease])
  const handleAddTask = async () => {
    try {
      let lists = await getAll(TODOLIST_SCHEMA)
      
      let sort = [...lists]
      if (inscrease){
        sort?.sort((a, b) => Number(a.id) - Number(b.id))
        //console.log(inscrease)
      }else{
        sort?.sort((a, b) => Number(b.id) - Number(a.id))
      }
      settaskList(sort)

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
  const handleDeleteAll = async () => {
    try {
      Alert.alert('Delete All Task', 'Bạn muốn xóa hết các việc cần làm?', [
        {
          text: 'Có',
          onPress: () => {
            deleteAllTask().then((rs) => {
              if (rs === 1) {
                return Alert.alert('Thông báo', 'Xoá thành công', [{ text: 'OK', onPress: () => handleAddTask() }])
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
  const handleUpdate = (item) => {
    setText(item.content)
    setId(item.id)
    setModalVisible(true)
  }
  const handleUpdateTask = async () => {
    try {
      if (id === null) {
        return Alert.alert('Thông báo', 'Update không thành công')
      }
      let rs = await update(TODOLIST_SCHEMA, { id: id, content: text })
      //console.log(rs,'rssss')
      if (rs === 1) {
        await handleAddTask()
        setId(null)
        setText('')
        setModalVisible(false)
      } else {
        return Alert.alert('Thông báo', 'Update không thành công')
      }
    } catch (error) {
      //console.log(error,'error+')
      return Alert.alert('Thông báo', 'Update không thành công')
    }
  }
  // sort task list
  const handleSortById = () => {
    setIncrease(!inscrease)
  }
  //sort Icon
  var sortIcon = inscrease === false ? 
  require('./components/icon/sortDown.png') :
  require('./components/icon/sortUp.png') ;
//change darkmode
  const changeMode = () => {
    setDarkMode(!darkMode)
  }
  // darkmode Icon
  var changeModeIcon = darkMode === false ? 
  require('./components/icon/sun.png') :
  require('./components/icon/moon.png') ;

  const BtnGuide = ()=>{
    setGuideVisible(!GuideVisible)
  }
  return (
    <View style={[styles.container, darkMode && {backgroundColor: color.darkBackground}]}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List</Text>

        <View style={styles.iconGr}>
          <TouchableOpacity onPress={handleDeleteAll} style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={require('./components/icon/trash-icon.png')} />
            <Text style={styles.textIcon}>DeleteAll</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSortById} style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={sortIcon} />
            <Text style={styles.textIcon}>Sort</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={changeMode} style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={changeModeIcon} />
            <Text style={styles.textIcon}>Dark/Light</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={BtnGuide} style={styles.BtnDelete}>
            <Image style={styles.iconDeleteAll} source={require('./components/icon/help.png')} />
            <Text style={styles.textIcon}>Guide</Text>
          </TouchableOpacity>
        </View>

          <ScrollView style={[styles.items,  darkMode && {backgroundColor: color.darkGr}]}>
            {
              taskList.map((item, index) => {
                return <Task
                  darkMode={darkMode}
                  key={index}
                  title={item.content}
                  date = {item.created_on}
                  number={index}
                  onDeleteTask={() => handleDeleteTask(item)}
                  onUpdateTask={() => handleUpdate(item)}
                  onDeleteAllTask={() => handleDeleteAll()}

                />
                //return <Task key = {index} title={item.content} number={index} onDeleteTask={() => handleDeleteTask(index)}/>
              })
            }
            <View style={styles.placeholder}></View>
            
          </ScrollView>
        
        {/* modal update*/}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, darkMode && {backgroundColor: color.darkBackground}]}>
              <KeyboardAvoidingView style={styles.addTask}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={10}>
                <TextInput
                  value={text}
                  placeholder='input your task'
                  style={[styles.input ,darkMode && {backgroundColor: color.darkTask}]}
                  onChangeText={(str) => setText(str)}
                />
                <TouchableOpacity
                  onPress={() => handleUpdateTask()} >
                  <View style={[styles.iconCircle, darkMode && {borderColor: color.darkTask}]}>
                    <Text style={[styles.icon, darkMode && {color: color.darkTask}]}>+</Text>
                  </View>
                </TouchableOpacity>

              </KeyboardAvoidingView>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
            </View>
          </View>


        </Modal>

        {/* modal modal update*/}

        {/* Modal guide */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={GuideVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setGuideVisible(!GuideVisible);
          }}>
          <View style={styles.guideView}>
            <View style={[styles.modalGuide, darkMode && {backgroundColor: color.darkBackground, color: color.white}]}>
              <View >
                <Text style={styles.textGuide}>1. Nhập nội dung công việc để lên danh sách</Text>
                <Text style={styles.textGuide}>2. Nhấn vào công việc đã hoàn thành để xóa</Text>
                <Text style={styles.textGuide}>3. Nhấn giữ vào công việc mà bạn muốn sửa nội dung</Text>
                <Text style={styles.textGuide}>4. Nhấn nút Sort để có thể sắp xếp công việc theo 
                  thứ tự nhập vào giảm/tăng dần</Text>
                <Text style={styles.textGuide}>5. Nhấn nút Dark/Light để chuyển sao diện Tối hoặc Sáng</Text>
              </View>
              <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setGuideVisible(!GuideVisible)}>
                  <Text style={styles.textStyle}>Hủy</Text>
              </Pressable>
            </View>
            
          </View>

        </Modal>
        {/* Modal guide */}
      </View>
      <View style={styles.textInput}></View>
      <Form darkMode={darkMode} onAddTask={handleAddTask} />
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
