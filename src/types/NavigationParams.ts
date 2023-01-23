import { I_LinkRegister } from '../api/resources/auth';
import E_Screens from '../screens/screens';
interface I_NavigationParams {
    [E_Screens.Login]: { auth_message: I_LinkRegister };
    [E_Screens.Home]: undefined;
    [E_Screens.Menu]: undefined;
    [E_Screens.MyAccount]: undefined;
    [E_Screens.Search]: undefined;
    [E_Screens.Main]: undefined;
}

export default I_NavigationParams;
