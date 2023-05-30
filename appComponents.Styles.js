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
})
export default styles