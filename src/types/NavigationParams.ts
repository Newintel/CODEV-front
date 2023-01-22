import { I_LoginResponse } from '../api/resources/auth';
import Screens from '../screens/screens';
interface I_NavigationParams {
    [Screens.Login]: { auth_message: I_LoginResponse };
    [Screens.Home]: undefined;
    [Screens.Menu]: undefined;
    [Screens.MyAccount]: undefined;
    [Screens.Search]: undefined;
    [Screens.Main]: undefined;
}

export default I_NavigationParams;
