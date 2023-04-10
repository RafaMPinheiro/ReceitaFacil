import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';

import { Feather } from '@expo/vector-icons';
import { colors } from '../../styles/color';

export function Video({ handleClose, videoUrl }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleClose}>
        <Feather name="arrow-left" size={32} color="#FFF" />
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <WebView style={styles.webView} source={{ uri: videoUrl }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[1],
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  webView: {
    flex: 1,
    width: '100%',
  },
});
