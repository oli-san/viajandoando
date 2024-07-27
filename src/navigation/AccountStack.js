import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {AccountScreen} from "../screens/Account/AccountScreen";
import {LogginScreen} from "../screens/Account/LogginScreen/LogginScreen";
import {RegisterScreen} from '../screens/Account/RegisterScreen/RegisterScreen'
import {screen} from "../utils";

const Stack = createNativeStackNavigator();

export function AccountStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name={screen.account.account} component={AccountScreen} options={{title: "Mi cuenta"}} />
            <Stack.Screen name={screen.account.login} component={LogginScreen} options={{title: "Iniciar Sesión"}} />
            <Stack.Screen name={screen.account.register} component={RegisterScreen} options={{title: "Crea tu cuenta"}} />
        </Stack.Navigator>
    );
}