import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ visible }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='fade'
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={visible} color="#ffffff" size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 10,
  },
});

export default Loader;