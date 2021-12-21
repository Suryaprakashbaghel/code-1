
import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Alert} from 'react-native';
import ICON from "react-native-vector-icons/MaterialIcons";

const Colors = {primary: '#1f145c', white: '#fff'};

export default function App() {
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([
    // {id: 1, task: 'First todo', completed: true},
    // {id: 2, task: 'Second todo', completed: false},
  ]);

  const ListItem =({todo}) =>{
    return( 
    <View style={styles.listItem}>
    <View style={{flex: 1}}>
    <Text 
    style={{
      fontWeight:'bold',
      fontSize: 15,
      color: Colors.primary,
      textDecorationLine: todo?.completed ? 'line-through': 'none',
      }}>
        {todo?.task}
    </Text>
    </View>
    {!todo?.completed && (
      <TouchableOpacity style= {[styles.actionIcon]} onPress={()=>markTodoComplete(todo?.id)}>
      <ICON name="done" size= {20} color= {Colors.white} /> 
    </TouchableOpacity>
    )}
    <TouchableOpacity
     style= {[styles.actionIcon, {backgroundColor: 'red'}]}
     onPress={()=> deleteTodo(todo?.id)}>
      <ICON name="delete" size= {20} color= {Colors.white} /> 
    </TouchableOpacity>
    </View>
    );
  };

  const addTodo = () =>{
  if(textInput == ''){
    Alert.alert('Error', 'please input todo');
  }else{
    const newTodo = {
      id: Math.random(),
      task: textInput,
      completed: false,
    };
  setTodos([...todos, newTodo]);
  setTextInput('');
  }
  };

  const markTodoComplete = todoId=>{
  const newTodos = todos.map((item)=>{
  if(item.id == todoId){
    return {...item,completed:true}
  }
  return item;
  });
  setTodos(newTodos);
  }; 

  const deleteTodo = todoId => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };
  const clearTodos = ()=>{
    Alert.alert('Confirm', 'Clear todos?',[
      {
        text: 'Yes',
        onPress: () => setTodos([]),
      },
      {text: 'No'},
    ]); 
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:Colors.white}}>
    <View style={styles.header}>
      <Text style={{fontWeight:'bold', fontSize: 28, color:Colors.primary,top:30}}>          TODO APP
      </Text>
      <ICON name = "delete" size= {32} color= "red" onPress={clearTodos} style={{top:30}}/>
       </View>
       <FlatList
       showsVerticalScrollIndicator = {false}
       contentContainerStyle = {{padding: 20, paddingBottom: 100}}
       data={todos}
       renderItem = {({item}) => <ListItem todo={item} />}
       />
       <View style={styles.footer}>
         <TextInput placeholder="Add Todo..."
         value={textInput}
         onChangeText={text => setTextInput(text)}
         style={styles.inputContainer}
         />
       </View>
       <TouchableOpacity onPress={addTodo} style={styles.iconContainer}>
         <View>
         <ICON name="add" color={Colors.white} size={30}/>
         </View>
       </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles=StyleSheet.create({
  actionIcon:{
    height: 25,
    width: 25,
    backgroundColor:'green',
    justifyContent:'center',
    alignItems:'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  listItem:{
    padding: 20,
    backgroundColor: Colors.white,
    flexDirection:'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  header:{
    padding: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footer:{
    position:'absolute',
    bottom:0,
    color:Colors.white,
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal: 20,
  },
  inputContainer:{
    backgroundColor:Colors.white,
    elevation:30,
    flex:0.84,
    // width:"82%",
    height: 50,
    marginVertical: 25,
    marginRight: 20,
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  iconContainer:{
    height: 50,
    width: 50,
    backgroundColor:Colors.primary,
    borderRadius: 25,
    justifyContent:'center',
    alignItems: 'center',
    left:275,
    margin:20,
  },
});


