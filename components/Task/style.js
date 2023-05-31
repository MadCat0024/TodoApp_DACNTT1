import { StyleSheet } from "react-native";
import color from './../../contains/color';
const styles = StyleSheet.create({
    item:{
        flexDirection:'row',
        backgroundColor: color.task,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent:'space-between'
      },
      checkBox:{
        width: 42,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent:'center',
      },
      even:{
        backgroundColor: color.green,    
      },
      odd:{
        backgroundColor: color.primary,
      },
      number:{
        fontSize: 16,
        fontWeight: 700,
        color: color.white,
      },
      content:{
        width: '80%',
        fontSize: 16,
        fontWeight: 600,
        
      },
      date:{
        fontSize: 8,
        fontWeight: 600,
        marginLeft: 16,
        color: color.white
      },
      itemFull:{
        backgroundColor: color.taskContent,
        borderRadius: 10,
        marginBottom: 16,
        elevation: 5,
        height: 70,
      }
})

export default styles;