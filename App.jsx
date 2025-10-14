import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import "./app/i18n"
import AppNavigator from './app/navigation/AppNavigator'

const App = () => {
  return (
    <>
    <StatusBar style="light" />
      <AppNavigator />
    </>
  )
}

export default App

const styles = StyleSheet.create({})