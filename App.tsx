import React, { useRef, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ text, onOK }) => {
  const ref = useRef();
  const [capturedSignature, setCapturedSignature] = useState("");

  // Called after ref.current.readSignature() reads a non-empty base64 string
  const handleOK = (signature) => {
    onOK?.(signature);

    // Save the captured signature for display

    setCapturedSignature(signature);
    console.log(capturedSignature);
  };

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after ref.current.clearSignature()
  const handleClear = () => {
    console.log("clear success!");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current.readSignature();
  };

  return (
    <View style={styles.container}>
      <SignatureScreen
        ref={ref}
        //onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        onClear={handleClear}
        autoClear={false}
        descriptionText={text}
        canvasProps={{ style: styles.signatureCanvas }}
      />

      {/* Display the captured signature using the new component */}

      <Image
        source={{
          uri: capturedSignature,
        }}
        style={{
          width: 400,
          height: 200,
          bottom: 100,
          backgroundColor: "#FFC0CB",
        }}
      />
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signatureCanvas: {
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    height: 100,
  },
});
