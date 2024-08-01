import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LugaresScreen } from "../screens/Lugares/LugaresScreen";
import { AddLugarScreen } from "../screens/Lugares/AddLugarScreen";
import { screen } from "../utils";
import { LugarScreen } from "../screens/Lugares/LugarScreen";
import { AddReviewLugarScreen } from "../screens/Lugares/AddReviewLugarScreen";

const Stack = createNativeStackNavigator();

export function LugarStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.lugar.lugares}
        component={LugaresScreen}
        options={{ title: "Lugares" }}
      />
      <Stack.Screen
        name={screen.lugar.addLugar}
        component={AddLugarScreen}
        options={{ title: "Añadir Lugar" }}
      />
      <Stack.Screen
        name={screen.lugar.lugar}
        component={LugarScreen}
        options={{ title: "Lugar" }}
      />
      <Stack.Screen
        name={screen.lugar.addReviewLugar}
        component={AddReviewLugarScreen}
        options={{ title: "Nueva opinión" }}
      />
    </Stack.Navigator>
  );
}
