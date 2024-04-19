import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import Styles from './Styles';
import firestore from '@react-native-firebase/firestore';
import Header from '../../components/header/Header';
import EditModal from '../../components/popup/EditModal';
import { RemoveItem, getAsyncStorage } from '../../asyncStorage/Index';
import Loader from '../../components/loader/Loader';
import Icon from 'react-native-vector-icons/Feather';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalEditCheck, setModalEditCheck] = useState(false);
  const [item, setItem] = useState({});
  const [itemIndex, setItemIndex] = useState(0);


  const EditTask = async () => {
    try {
      const taskDoc = firestore().collection('UserTasks').doc(item.id);
      await taskDoc.update({
        Title: item.Title,
        Description: item.Description,
      });
      console.log('Task updated successfully!');
      let newArr = [...tasks];
      newArr[itemIndex] = item
      setTasks(newArr);
      setLoading(false);
      console.log(newArr, "sdklsdlk");
    } catch (error) {
      console.error('Error updating task: ', error);
      setLoading(false);
      Alert.alert("oh!! Something went wrong. Please try again.");
    }
  }

  const DeleteTask = async (item, index) => {
    try {
      getAsyncStorage("UserID").then(async (userId) => {
        const tasksCollection = firestore().collection('UserTasks');
        const querySnapshot = await tasksCollection.where('Userid', '==', userId).get();
        querySnapshot.forEach(async (doc) => {
          if (doc.id === item.id) {
            await tasksCollection.doc(doc.id).delete();
            const newArr = [...tasks]; // Create a copy of the original array
            newArr.splice(index, 1);
            setTasks(newArr);
            setLoading(false);
            console.log('Task deleted successfully!');
          }
        });
      })
    } catch (error) {
      console.error('Error deleting task: ', error);
      setLoading(false);
      Alert.alert("oh!! Something went wrong. Please try again.");
    }
  };

  const AddTask = async () => {
    try {
      getAsyncStorage("UserID").then(async (id) => {
        const tasksCollection = firestore().collection('UserTasks');
        const docRef = await tasksCollection.add({
          Userid: id,
          Title: item.Title,
          Description: item.Description,
        });
        const taskId = docRef.id;
        let itm = {
          Userid: id,
          Title: item.Title,
          Description: item.Description,
          id: taskId,
        }
        console.log('Task added successfully!');
        setTasks(arr => [...arr, itm]);
        setLoading(false);
        setItem({});
      })
    } catch (error) {
      console.log('Error adding task: ', error);
      setLoading(false);
      Alert.alert("oh!! Something went wrong. Please try again.");
    }
  }

  const FetchTask = async () => {
    getAsyncStorage("UserID").then(async (userId) => {
      console.log(userId)
      const tasksCollection = firestore().collection('UserTasks');
      const snapshot = await tasksCollection.where('Userid', '==', userId).get();
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // console.log(tasksData)
      setTasks(tasks);
      setLoading(false);
    })
  };

  useEffect(() => {
    FetchTask();
  }, []);

  const RenderItem = ({ item, index }) => (
    <View style={Styles.cardContainer} key={index}>
      <Text style={Styles.title}>{item.Title}</Text>
      <Text style={Styles.description}>{item.Description}</Text>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.button} onPress={() => {
          setItemIndex(index);
          setItem(item);
          setModalEditCheck(true);
          setModalVisible(true);
        }}>
          <Text style={Styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[Styles.button, { backgroundColor: "red" }]} onPress={() => {
          Alert.alert(
            '',
            'Are you sure you want to delete this task?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Ok',
                onPress: () => {
                  setLoading(true);
                  DeleteTask(item, index)
                },
              },
            ]
          );
        }}>
          <Text style={Styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const FooterComponent = () => (
    <TouchableOpacity style={Styles.addNewTaskButton} onPress={() => {
      setModalVisible(true);
    }}>
      <Text style={Styles.addNewTaskText}>Add New Task</Text>
    </TouchableOpacity>
  );

  return (
    <>
      {loading && <Loader />}
      <Header title={"Hybrid MediaWorks"} onPress={() => {
        Alert.alert(
          '',
          'Are you sure you want to logout?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Ok',
              onPress: () => {
                RemoveItem("UserID");
                navigation.replace("LoginScreen");
              },
            },
          ]
        );
      }} />
      <View style={Styles.container}>
        <Text style={Styles.header}>Your Tasks</Text>
        {
          tasks.length !== 0 && (
            <FlatList
              data={tasks}
              showVerticalIndicator={false}
              ListFooterComponent={FooterComponent}
              renderItem={RenderItem}
              style={Styles.taskList}
            />
          )
          ||
          (
            <>
            <View style={{alignSelf:'center', alignItems:'center'}}>
              <Icon name="check-circle" size={150} color="#A9A9A9" style={Styles.noRecordIcon} />
              <Text style={Styles.noRecordTitle}>No Task Found!!!</Text>
            </View>
              <FooterComponent />
            </>
          )
        }

        <EditModal
          visible={modalVisible}
          modalcheck={modalEditCheck}
          itemValues={item}
          onChangeTitle={(text) => {
            setItem(pre => ({ ...pre, Title: text }))
          }}
          onChangeDescription={(text) => {
            setItem(pre => ({ ...pre, Description: text }))
          }}
          onSubmit={() => {
            setLoading(true);
            if (modalEditCheck == true) {
              console.log(item);
              EditTask();
            }
            else {
              AddTask();
            }
            setModalEditCheck(false);
            setModalVisible(false);
          }}
          onClose={() => {
            if (modalEditCheck == true) {
              setItem({});
              setModalEditCheck(false);
            }
            setModalVisible(false);
          }}
        />
      </View>
    </>
  )
}

export default HomeScreen;