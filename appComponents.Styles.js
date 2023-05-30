import { StyleSheet } from "react-native";
import color from './contains/color';
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F5F5F5',
        flex: 1,
      },
      body:{
        flex:1,
        paddingTop: 30,
        paddingHorizontal: 20,
      },
      textInput:{
        
      },
      header:{
        fontSize: 28,
        fontWeight: 'bold',
        color: color.primary,
        fontStyle:'italic',
        alignItems:'center',
        justifyContent:'center',
      },
      items: {
        marginTop: 25,
      },
      iconGr:{
        flexDirection: 'row-reverse',
        alignItems: 'flex-end',
        paddingBottomd: 4,
      },
      BtnDelete:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
      },
      textIcon:{
        fontSize: 10,
        fontWeight: 'bold',
        color: color.primary,
      }
      ,
      iconDeleteAll:{
        width: 26,
        height: 26,
        tintColor: color.primary
      },
      //update modal style
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        borderColor: color.primary,
        borderWidth: 2,
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 10,
        paddingTop: 60,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 8,
        padding: 4,
        paddingHorizontal: 16,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: color.green,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      addTask:{
        bottom:30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    input: {
      height: 44,
      width: '80%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 20,
      borderColor: color.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    iconCircle: {
      width: 44,
      height: 44,
      backgroundColor:color.primary,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth:2,
      borderColor: '#eff7f8'
    },
    icon: {
      fontWeight: 'bold',
      color: color.white,
      fontSize: 24,
    },
    inputText: {
      fontWeight: 'bold',
      color: color.text,
      fontSize: 15,
    }
})
export default styles