//import './App.css';
import TodoList from "./components/TodoList/TodoList.jsx"
import { View } from "react-native";
import styled from 'styled-components/native';

const StyledView = styled.View`
  min-width: 280px;
  max-width: 600px
  text-align: center;
  margin: 10px auto;
`;

function App() {
  return (
    <View>
      <StyledView>
        <TodoList />
      </StyledView>
    </View>
  );
}


export default App;
