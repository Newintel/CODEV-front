import SideMenu, { SideMenuComponentType } from './SideMenu';

/**
 * @param routes object with the routes to be displayed in the side menu:
 * the key is the name of the route, and the value is the component to be rendered when the route is selected.
 * @returns: {@link SideMenu} component, to place inside a NavigationContainer component.
 */
const SideMenuFactory =
    (routes: Record<string, SideMenuComponentType>) => () => {
        return SideMenu({
            components: Object.entries(routes).map(([name, component]) => ({
                name,
                component,
            })),
        });
    };

export default SideMenuFactory;
