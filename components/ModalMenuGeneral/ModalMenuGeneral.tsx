import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  Switch,
  TextInput,
} from "react-native";
import ButtonMenu from "@mui/material/Button";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { configGlobal, GraphLink, NodeType } from "../../src/config/config";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
// const [menuVisible, setMenuVisible] = React.useState(false);
// const [isMenuVisible, setIsMenuVisible] = useState(false); // Estado para mostrar/ocultar el menú






type modalMenuGeneralProps = {
  selectedNode: React.SetStateAction<any>;
  selectedLink: React.SetStateAction<any>;
  isBrilloActivo: React.SetStateAction<any>;
  isMenuVisible: React.SetStateAction<any>;
  setIsMenuVisible: React.SetStateAction<any>;
  setIsAddNodeVisible: React.SetStateAction<any>;
};

const ModalMenuGeneral: React.FC<modalMenuGeneralProps> = ({
  selectedNode,
  selectedLink,
  isBrilloActivo,
  isMenuVisible,
  setIsMenuVisible,
  setIsAddNodeVisible,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    selectedNode(null);
    selectedLink(null);
    isBrilloActivo(false);
  };


  const handleClose = () => {
    setAnchorEl(null);
    // setIsMenuVisible(true);
  };

  const addNode = () => {
    console.log("Add Node");
    setIsAddNodeVisible(true);
    setIsMenuVisible(false)
  };

  return (
    <View style={styles.containerButtonMenu}>
      <React.Fragment>
        <Box
          sx={{
            display: isMenuVisible ? "flex" : "none",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Tooltip title="Opciones">
            <IconButton
              // Despliega el menu
              onClick={handleClick}
              size="medium"
              sx={{ ml: 2 }}
              aria-controls={open ? "menu-opciones" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon sx={{ padding:1, backgroundColor: configGlobal.iconMenuBackgraundColor,borderRadius:10, color: "white", width: 32, height: 32 }}></MenuIcon>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="menu-opciones"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: configGlobal.shadowGeneral,
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={addNode}>
           <AddCircleOutlineIcon  sx={{color:configGlobal.itemsMenuColor,marginRight:0.5, width: 32, height: 32 }} /> Agregar nodo
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </React.Fragment>
    </View>

    // <View>
    //   {/* Menú de hamburguesa */}
    //   <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
    //     <Text style={styles.menuText}>☰</Text>
    //   </TouchableOpacity>
    //   {/* Modal para agregar nodos */}
    //   <Modal visible={isMenuVisible} transparent={true} animationType="slide">
    //     <View style={styles.modalContainer}>
    //       <View style={styles.modalContent}>
    //         <Text style={styles.modalTitle}>Agregar Nodo</Text>
    //         <TextInput
    //           placeholder="Nombre del Nodo"
    //           style={styles.input}
    //           value={newNode.name}
    //           onChangeText={(text) => setNewNode({ ...newNode, name: text })}
    //         />
    //         <TextInput
    //           placeholder="Grupo"
    //           style={styles.input}
    //           value={newNode.group}
    //           onChangeText={(text) => setNewNode({ ...newNode, group: text })}
    //         />
    //         <TextInput
    //           placeholder="URL (opcional)"
    //           style={styles.input}
    //           value={newNode.url}
    //           onChangeText={(text) => setNewNode({ ...newNode, url: text })}
    //         />
    //         <View style={styles.buttonContainer}>
    //           <Button title="Agregar" onPress={handleAddNode} />
    //           <Button title="Cancelar" onPress={toggleMenu} color="red" />
    //         </View>
    //       </View>
    //     </View>
    //   </Modal>

    //   {/* Modal para el menú */}
    //   <Modal visible={isMenuVisible} transparent={true} animationType="slide">
    //     <View style={styles.modalContainer}>
    //       <View style={styles.modalContent}>
    //         <Text style={styles.modalTitle}>Opciones</Text>

    //         {/* <TouchableOpacity onPress={addNodo}>
    //           <Text style={styles.menuButtonHover}>Agregar Nodo</Text>
    //         </TouchableOpacity> */}

    //         <TouchableOpacity onPress={toggleMenu}>
    //           <Text style={styles.closeButton}>Cerrar</Text>
    //         </TouchableOpacity>
    //         {/* Aquí puedes agregar el formulario o más opciones */}
    //       </View>
    //     </View>
    //   </Modal>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },

  containerButtonMenu: {
    position: "absolute",
    top: 10,
    right: 15,
    zIndex: 10,
    // display:  displayMenuBotton,
  },

  ButtonMenu: {
    position: "relative",
    backgroundColor: "aliceblue",
  },
  // menuText: {
  //   // color: "#fff",
  //   // fontSize: 18,
  //   backgroundColor: "red",

  // },

  // menuButton: {
  //   position: "relative",
  //   // top: 40,
  //   right: 20,
  //   backgroundColor: "blue",
  //   // borderRadius: 25,
  //   padding: 10,
  // },
  // closeButton: {
  //   marginTop: 20,
  //   color: "blue",
  //   fontSize: 16,
  // },

  // menuButtonText: {
  //   color: "white",
  //   fontSize: 18,
  // },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  // },
  // modalContent: {
  //   width: "80%",
  //   padding: 20,
  //   backgroundColor: "white",
  //   borderRadius: 10,
  //   elevation: 10,
  // },
  // modalTitle: {
  //   fontSize: 20,
  //   fontWeight: "bold",
  //   marginBottom: 20,
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  //   width: "100%",
  // },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },

  // menuButtonHover: {
  //   cursor: "pointer",
  //   fontSize: 16,
  //   marginBottom: 20,
  // },
});

export default ModalMenuGeneral;
