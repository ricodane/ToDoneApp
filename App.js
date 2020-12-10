import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Image,
  ListViewComponent,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "./Colors";
import TodoList from "./components/TodoList";
import AddListModal from "./components/AddListModal";
import Fire from './Fire';

let firebase;

export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };
  
  componentDidMount() {
    firebase = new Fire((error, user) => {
      if (error) {
        return alert("Something went wrong!");
      }

      firebase.getLists(lists => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} deleteList={this.deleteList}/>;
  };

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: []
    });
  };

  updateList = list =>  {
    firebase.updateList(list);
  };

  deleteList = list => {
    firebase.deleteList(list);
  };

  editList = list => {
    firebase.editList(list);
  };
  
  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue}/>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image
          style={{ width:100, height:100}}
          source={require("./assets/Logo.jpg")}
        />
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>
        
        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
            <Text style={styles.title}>
              To 
              <Text style={{ fontWeight: "400", fontStyle:"italic",  color: "#3E3E3E" }}>Done</Text>
            </Text>
          <View style={styles.divider} />
        </View>
        <View style={{ marginVertical: 48 }}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name="plus" size={16} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>
        <View style={{ height: 370, margin: 5 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            vertical={true}
            showsVerticalScrollIndicator={true}
            ItemSeparatorComponent={() => <View style ={{ margin: 3 }}/> }
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always "
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    backgroundColor: colors.black,
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "700",
    color: "#0592A5",
    fontStyle: "italic",
    paddingHorizontal: 40,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});