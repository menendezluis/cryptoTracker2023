import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
//Type your name to access crypto price tracker
const Login = () => {
  const [name, setName] = React.useState(''); 
  const [error, setError] = React.useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title} >{"Welcome to cryptoTracker"}</Text>
      <TextInput placeholder="Username" style={styles.input} 
      value={name}
        onChangeText={(text) => setName(text)}
      />
      {error && <Text style={styles.txtError} >{"empty field, enter a name"}</Text>}
      <TouchableOpacity style={styles.btn} onPress={() => {
        if(name.length > 0){
          navigation.navigate('Home', {name: name})
          setTimeout(() => {
            setName('');
          }, 1000);
        }else{
          setError(!error)
          setTimeout(() => {
            setError(false);
          }, 2500);
        }
      }} >
        <Text style={{color: "white"}} >{"Login"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    width: 200,
    height: 40,
    borderRadius: 5,
    padding: 10,
  },
  btn: {
    marginTop: 15,
    backgroundColor: '#ef3340',
    width: 200,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtError: {
    color: 'red',
    fontSize: 10
  }
})