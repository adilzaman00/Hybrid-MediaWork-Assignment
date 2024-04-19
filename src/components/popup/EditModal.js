import React from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, Dimention } from 'react-native';
import  Icon  from 'react-native-vector-icons/AntDesign';

const EditModal = ({ visible,
    onClose,
    modalcheck,
    itemValues,
    onChangeTitle,
    onChangeDescription,
    onSubmit
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            style={{ height: Dimention }}
            onRequestClose={() => onClose()}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={() => onClose()} style={styles.closeButton}>
                        <Icon name='close' size={20} color={"#000"} />
                    </TouchableOpacity>
                    <Text style={styles.inputTitle}>Title</Text>
                    <TextInput
                        style={styles.input}
                        value={itemValues.Title}
                        onChangeText={text => onChangeTitle(text)}
                        placeholder={modalcheck ? "Edit Title" : "Title"}
                    />
                    <Text style={styles.inputTitle}>Description</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        value={itemValues.Description}
                        onChangeText={text => onChangeDescription(text)}
                        placeholder={modalcheck ? "Edit Description" : "Description"}
                        multiline={true}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => onSubmit()}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default EditModal;

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        elevation: 5,
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    inputTitle:{
        fontSize:15,
        color:'#000'
    }
});