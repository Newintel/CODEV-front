import { NavigationProp, useNavigation } from '@react-navigation/native';
import I_NavigationParams from '../types/NavigationParams';

const useAppNavigation = useNavigation<NavigationProp<I_NavigationParams>>;

export default useAppNavigation;
