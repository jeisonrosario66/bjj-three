import React, { useState } from "react";
import {
  Modal,
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import BottonCloseComponent from "../BottonCloseComponent/BottonCloseComponent";
import { configGlobal } from "../../src/config/config";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Divider from "@mui/material/Divider";
import { useForm, SubmitHandler } from "react-hook-form";

type AddNodeComponentProp = {
  isAddNodeVisible: React.SetStateAction<any>;
  setIsAddNodeVisible: React.SetStateAction<any>;
  setIsMenuVisible: React.SetStateAction<any>;
};

type Inputs = {
  example: string;
  exampleRequired: string;
};

const AddNodeComponent: React.FC<AddNodeComponentProp> = ({
  isAddNodeVisible,
  setIsAddNodeVisible,
  setIsMenuVisible,
}) => {
  const onClose = () => {
    setIsAddNodeVisible(false);
    setIsMenuVisible(true);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <ScrollView
      style={[
        styles.add_node_container,
        { display: isAddNodeVisible ? "flex" : "none" },
      ]}
    >
      <Image
        source={{ uri: "images/add_node_background.png" }}
        style={styles.background_bjj}
      />
      <Text style={styles.title}>Agregar Nodo</Text>
      <Divider />
      {/* Botón de cierre */}
      <BottonCloseComponent handleOnClose={onClose} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />
        <input defaultValue="test" {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </ScrollView>
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

  add_node_container: {
    backgroundColor: configGlobal.addNodoPanelColor,
    width: "95%",
    height: "95%",
    position: "absolute",
    zIndex: 10,
    padding: 10,
    borderRadius: 7,
    filter: configGlobal.shadowGeneral,
  },
  background_bjj: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  title: {
    textAlign: "center",
    marginTop: 30,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default AddNodeComponent;
