import { ScrollView, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "./LugarScreen.styles";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils";
import { Carousel } from "../../../components/Shared";

export function LugarScreen(props) {
  const { route } = props;
  const [lugar, setLugar] = useState(null);
  useEffect(() => {
    setLugar(null);
    onSnapshot(doc(db, "lugares", route.params.id), (doc) => {
      setLugar(doc.data());
    });
  }, [route.params.id]);

  if (!lugar) return null;
  return (
    <ScrollView style={styles.content}>
      <Carousel />
    </ScrollView>
  );
}
