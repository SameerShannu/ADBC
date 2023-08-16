import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

import { AntDesign } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <View style={styles.searchBar}> 
      <TextInput autoCapitalize='characters' autoCorrect placeholder='Search for the Articles'/>
      <AntDesign name="search1" size={24} color="black" />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'center',
        height: 50,
        width: '90%',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
        marginTop: 10,
    },
})

export default SearchBar