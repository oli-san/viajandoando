import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { LugarRanking } from "../components/Lugares";
import { db } from "../utils";

export function RankingScreen() {
  const [lugares, setLugares] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "lugares"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    onSnapshot(q, (snapshot) => {
      setLugares(snapshot.docs);
    });
  }, []);

  return (
    <ScrollView>
      {map(lugares, (lugar, index) => (
        <LugarRanking key={index} index={index} lugar={lugar.data()} />
      ))}
    </ScrollView>
  );
}
