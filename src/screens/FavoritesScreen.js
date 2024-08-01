import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { size, map } from "lodash";
import { UserNotLogged, NotFoundSites, LugarFavorite } from "../components/Favorites";
import { Loading } from "../components/Shared";
import { db } from "../utils";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [lugares, setLugares] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (auth?.currentUser) {
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, async (snapshot) => {
        let lugarArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "lugares", data.idLugar);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          lugarArray.push(newData);
        }
        setLugares(lugarArray);
      });
    }
  }, [auth]);

  if (!hasLogged) return <UserNotLogged />;

  if (!lugares) return <Loading show text="Cargando" />;

  if (size(lugares) === 0) return <NotFoundSites />;

  return (
    <ScrollView>
      {map(lugares, (lugar) => (
        <LugarFavorite key={lugar.id} lugar={lugar} />
      ))}
    </ScrollView>
  );
}