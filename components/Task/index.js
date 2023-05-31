import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './style';
import color from '../../contains/color';
//import { updateTodoList, deleteTodoList, queryAllTodoList } from '../../database/allSchema';

const Task = (props) => {
  const {number} = props;
  const numberText = number < 10 ? `0${number}` : `${number}`;
  const itemColor = number % 2 === 0 ? styles.even : styles.odd; 
  return (
    <TouchableOpacity
      onPress={props.onDeleteTask}
      onLongPress={props.onUpdateTask}
    >
    <View style={styles.itemFull}>
      <Text style={styles.date}>{props.date}</Text>
      <View style={[styles.item, props.darkMode && {backgroundColor: color.darkTask}]}>
          <View style={[styles.checkBox, itemColor]}>
          <Text style={styles.number}>{numberText}</Text>
          </View>
          <Text style={styles.content}>{props.title}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}
export default Task