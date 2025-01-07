import React from "react";
import IconButton from "@mui/material/IconButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet, View, Switch } from "react-native";

type BottonCloseComponentProp = {
  handleOnClose: () => void;
  handleonExpand?: () => void;
  toggleSwitch?: () => void;
  isExpanded?: React.SetStateAction<any>;
  isEnabled?: React.SetStateAction<any>;
};

const BottonCloseComponent: React.FC<BottonCloseComponentProp> = ({
  handleOnClose,
  handleonExpand,
  toggleSwitch,
  isExpanded,
  isEnabled,
}) => {
  return (
    <View style={styles.buttonContainer}>
      {toggleSwitch !== undefined && isEnabled !== undefined && (
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={styles.switch}
        />
      )}

      {/* Mostrar el botón de expandir solo si handleonExpand e isExpanded existen */}
      {handleonExpand !== undefined && isExpanded !== undefined && (
        <IconButton
          aria-label="expand"
          size="small"
          style={styles.expandButton}
        >
          <Icon
            name={isExpanded ? "arrow-collapse" : "arrow-expand"}
            size={24}
            color="white"
            onPress={handleonExpand}
          />
        </IconButton>
      )}

      <IconButton aria-label="delete" size="small" style={styles.closeButton}>
        <Icon
          name="window-close"
          size={24}
          color="white"
          onPress={() => {
            handleOnClose();
          }}
        />
      </IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    cursor: "pointer",
    marginLeft:5,
  },
  buttonContainer: {
    top: 10,
    right: 10,
    flexDirection: "row",
    position: "absolute",
    width: 120,
    justifyContent: "flex-end",

  },
  switch: {
    marginBottom: "auto",
    marginTop: "auto",
    cursor: "pointer",


  },
  expandButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    cursor: "pointer",
    marginLeft:5,

  },
});

export default BottonCloseComponent;
