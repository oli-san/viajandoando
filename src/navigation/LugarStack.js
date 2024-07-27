import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {LugaresScreen} from "../screens/Lugares/LugaresScreen";
import {AddLugarScreen} from '../screens/Lugares/AddLugarScreen'
import {screen} from "../utils";

const Stack = createNativeStackNavigator();


export function LugarStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screen.lugar.lugares} component={LugaresScreen} options={{title: "Lugares"}} />
            <Stack.Screen name={screen.lugar.addLugar} component={AddLugarScreen} options={{title: "Añadir Lugar"}} />
        </Stack.Navigator>
    );
}