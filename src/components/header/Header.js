import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Header = ({ title, onPress }) => {
    return (
        <View style={Styles.header}>
           <View style={{ paddingLeft: 10, flex: 0.1, }} />
            <View style={{ flex: 0.9, alignItems: 'center', }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: '#000' }}>
                    {title}
                </Text>
            </View>
            <TouchableOpacity
                style={{ paddingLeft: 10, flex: 0.1, }}
                onPress={onPress}>
                <Icon name="logout" color="#000" size={30} />
            </TouchableOpacity>
        </View>
    )
}

const Styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 50,
        backgroundColor: "#3FAD72",
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Header;