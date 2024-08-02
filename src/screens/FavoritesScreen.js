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

  /* useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User state changed: ", user);
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (auth?.currentUser) {
      //console.log("Fetching favorites for user: ", auth.currentUser.uid);
      const q = query(
        collection(db, "favorites"),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, async (snapshot) => {
        //console.log("Snapshot received: ", snapshot.docs.length);
        let lugarArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "lugares", data.idLugar);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
          lugarArray.push(newData);
        }
        //console.log("Updated lugares: ", lugarArray);
        setLugares(lugarArray);
      });
    }
  }, [auth]); */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setHasLogged(!!user);
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const fetchFavorites = async () => {
        if (auth?.currentUser) {
          try {
            const q = query(
              collection(db, "favorites"),
              where("idUser", "==", auth.currentUser.uid)
            );
            const unsubscribe = onSnapshot(q, async (snapshot) => {
              let lugarArray = [];
              for await (const item of snapshot.docs) {
                try {
                  const data = item.data();
                  const docRef = doc(db, "lugares", data.idLugar);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                    const newData = docSnap.data();
                    newData.idFavorite = data.id;
                    lugarArray.push(newData);
                  } else {
                    console.log("No such document: ", data.idLugar);
                  }
                } catch (error) {
                  console.error("Error fetching document: ", error);
                }
              }
              setLugares(lugarArray);
            }, (error) => {
              console.error("Error with onSnapshot: ", error);
            });

            // Cleanup on unmount
            return () => unsubscribe();
          } catch (error) {
            console.error("Error with query: ", error);
          }
        }
      };

      fetchFavorites();
    }
  }, [hasLogged, auth]);

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