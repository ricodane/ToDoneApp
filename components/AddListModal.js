import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../Colors";

export default class AddListModal extends React.Component {
  backgroundColors = [
    "#9A3232",
    "#80D240",
    "#9240D2",
    "#40D2AF",
    "#4072D2",
    "#D3AA40",
    "#37C345",
  ];
  state = {
    name: "",
    color: this.backgroundColors[0],
  };



  createTodo = () => {
    let { name, color } = this.state;
    let list = {name, color}
    
    if (name === this.state.name || this.state.name === "" ) {
        
    this.props.addList(list);
   }
    this.setState({ name: "" });
    this.props.closeModal();
    
  };

  renderColors() {
    return this.backgroundColors.map((color) => {
      return (
        <TouchableOpacity
          key={color}
          style={[styles.colorSelect, { backgroundColor: color }]}
          onPress={() => this.setState({ color })}
        />
      );
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "null"}>
        <TouchableOpacity
          style={{ position: "absolute", top: 64, right: 32 }}
          onPress={this.props.closeModal}
        >
          <AntDesign name="close" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={{ alignSelf: "stretch", marginHorizontal: 32 }}>
          <Text style={styles.title}>Create ToDo List</Text>
            <TextInput
              style={styles.input}
              placeholder="List name"
              onChangeText={(text) => this.setState({ name: text })}
            />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 12,
            }}
          >
            {this.renderColors()}
          </View>
          <TouchableOpacity
            style={[styles.create, { backgroundColor: this.state.color }]}
            onPress={this.createTodo}
            value={this.state.name}
          >
            <Text style={{ color: colors.white, fontWeight: "600" }}>
              Create!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.black,
    alignSelf: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  create: {
    marginTop: 24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  colorSelect: {
    width: 30,
    height: 30,
    borderRadius: 4,
  },
});