import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const MainButton = ({ onPress, loading, title }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            {loading ?
                <ActivityIndicator color={"#FFF"} size={"small"} />
                :
                <Text style={styles.buttonText}>{title}</Text>
            }
        </TouchableOpacity>
    )
}

export default MainButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        width: '80%',
        height: 40,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
})