 
import React, { useState } from 'react'; 
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'; 
import { evaluate } from 'mathjs'; 
const Calculator = () => { 
  const [input, setInput] = useState<string>(''); 
  const [result, setResult] = useState<string>(''); 
  const handlePress = (value: string) => { 
    setInput((prev) => prev + value);  }; 
  const handleCalculate = () => { 
    try { 
      setResult(evaluate(input).toString()); 
    } catch (error) { 
      setResult('Error');    }  }; 
  const handleClear = () => { 
    setInput(''); 
    setResult('');  }; 
  return ( 
    <View style={styles.container}> 
      <ScrollView style={styles.calculator} contentContainerStyle={styles.calculatorContent}> 
        <TextInput 
          style={styles.input} 
          value={input} 
          onChangeText={setInput} 
          placeholder="Enter expression" 
          placeholderTextColor="#666" 
          keyboardType="numeric" 
        /> 
        <Text style={styles.result}>{result}</Text> 
        <View style={styles.buttonContainer}> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}> 
              <Text style={styles.buttonText}>7</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}> 
              <Text style={styles.buttonText}>8</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}> 
              <Text style={styles.buttonText}>9</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonOperator} onPress={() => handlePress('/')}> 
              <Text style={styles.buttonText}>/</Text> 
            </TouchableOpacity> 
          </View> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}> 
              <Text style={styles.buttonText}>4</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}> 
              <Text style={styles.buttonText}>5</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}> 
              <Text style={styles.buttonText}>6</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonOperator} onPress={() => handlePress('*')}> 
              <Text style={styles.buttonText}>*</Text> 
            </TouchableOpacity> 
          </View> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}> 
              <Text style={styles.buttonText}>1</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}> 
              <Text style={styles.buttonText}>2</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}> 
              <Text style={styles.buttonText}>3</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonOperator} onPress={() => handlePress('-')}> 
              <Text style={styles.buttonText}>-</Text> 
            </TouchableOpacity> 
          </View> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}> 
              <Text style={styles.buttonText}>0</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}> 
              <Text style={styles.buttonText}>.</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.buttonOperator} onPress={() => handlePress('+')}> 
              <Text style={styles.buttonText}>+</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}> 
              <Text style={[styles.buttonText, styles.clearButtonText]}>C</Text> 
            </TouchableOpacity> 
          </View> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}> 
              <Text style={styles.buttonText}>(</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}> 
              <Text style={styles.buttonText}> )</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('sin(')}> 
              <Text style={styles.buttonText}>sin</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('cos(')}> 
              <Text style={styles.buttonText}>cos</Text> 
            </TouchableOpacity> 
          </View> 
          <View style={styles.buttonRow}> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('tan(')}> 
              <Text style={styles.buttonText}>tan</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('sqrt(')}> 
              <Text style={styles.buttonText}>√</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={() => handlePress('^')}> 
              <Text style={styles.buttonText}>^</Text> 
            </TouchableOpacity> 
            <TouchableOpacity style={[styles.button, styles.equalButton]} onPress={handleCalculate}> 
              <Text style={styles.buttonText}> = </Text> 
            </TouchableOpacity> 
          </View> 
        </View> 
      </ScrollView> 
      <Text style={styles.footerText}>Jeffrin P</Text> 
    </View>  );}; 
const styles = StyleSheet.create({ 
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#282c34',   }, 
  calculator: { 
    width: '90%',  }, 
  calculatorContent: { 
    alignItems: 'center', 
    padding: 20,  }, 
  input: { 
    width: '100%', 
    height: 60, 
    fontSize: 32, 
    textAlign: 'right', 
    borderColor: '#444', 
    borderWidth: 1, 
    borderRadius: 10, 
    marginBottom: 10, 
    paddingHorizontal: 15, 
    backgroundColor: '#fff',  }, 
  result: { 
    width: '100%', 
    fontSize: 32, 
    textAlign: 'right', 
    marginBottom: 20, 
    color: '#fff',  }, 
  buttonContainer: { 
    width: '100%',  }, 
  buttonRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10,  }, 
  button: { 
    width: 70, 
    height: 70, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#61dafb',  
    borderWidth: 1, 
    borderColor: '#4fa3c8', 
    margin: 5,  }, 
  buttonOperator: { 
    width: 70, 
    height: 70, 
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#ff8c00',  
    borderWidth: 1, 
    borderColor: '#e07b00', 
    margin: 5,  },   
buttonText: { 
    fontSize: 26, 
    color: '#fff',  }, 
  clearButton: { 
    backgroundColor: '#f44336',   }, 
  clearButtonText: { 
    color: '#fff',  }, 
  equalButton: { 
    backgroundColor: '#4caf50',  
  }, 
  footerText: { 
    fontSize: 20, 
    color: '#fff', 
    marginTop: 20,  }, 
}); 
 
export default Calculator; 
 
 