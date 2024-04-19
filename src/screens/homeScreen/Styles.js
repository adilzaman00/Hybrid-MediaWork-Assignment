import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingHorizontal:'3%',
      },
      header: {
        fontSize: 25,
        color:"#000",
        marginLeft:10,
        marginVertical: 10,
      },
      taskList: {
        width: '100%',
        paddingBottom:20 ,
      },
      taskItem: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: "#3FAD72",
        elevation: 1,
        shadowColor: '#000',
        // marginLeft: 1,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
      },
      cardContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
      },
      title: {
        fontSize: 20,
        color:"#000",
        marginBottom: 10,
      },
      description: {
        fontSize: 16,
        marginBottom: 15,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal:5,
        borderRadius: 5,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      addNewTaskButton:{
        backgroundColor:"#007bff",
        width:'50%',
        paddingVertical:10,
        borderRadius:10,
        alignSelf:'center',
      },
      addNewTaskText:{
        color:"#FFF", 
        alignSelf:"center",
        fontWeight:'bold',
        fontSize:18
      },
      noRecordIcon: {
        color:"#000",
        marginTop:30,
      },
      noRecordTitle: {
        fontSize: 24,
        color:"#000",
        marginTop:10,
        marginBottom: 30,
      },
});

export default Styles;