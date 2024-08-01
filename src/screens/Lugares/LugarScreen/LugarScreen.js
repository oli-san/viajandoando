import { ScrollView, Dimensions } from "react-native";
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
import { Carousel, Loading } from "../../../components/Shared";
import { Header, Info, BtnReviewForm  } from "../../../components/Lugar";

const {width}= Dimensions.get("window")

export function LugarScreen(props) {
  const { route } = props;
  const [lugar, setLugar] = useState(null);

  useEffect(() => {
    setLugar(null);
    onSnapshot(doc(db, "lugares", route.params.id), (doc) => {
      setLugar(doc.data());
    });
  }, [route.params.id]);

  if (!lugar) return <Loading show text="Cargando lugares"/>;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={lugar.images} height={250} width={width} />
      <Header lugar={lugar} />
      <Info lugar={lugar} />
      <BtnReviewForm idLugar={route.params.id} />
    </ScrollView>
  );
}
