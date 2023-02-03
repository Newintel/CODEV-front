import React from 'react';
import NotLogged from '../screens/pages/NotLogged';
import { useSelector } from 'react-redux';
import AuthSelectors from '../storage/redux/selectors/auth';

interface I_Props {
    Component: () => JSX.Element;
    mustBeLogged?: boolean;
}

const BaseContainer =
    ({ Component }: I_Props) =>
    () => {
        return <Component />;
    };

const WithLoginCheck = ({ Component, mustBeLogged }: I_Props) => {
    const isLogged = useSelector(AuthSelectors.logged);

    const logged = isLogged || mustBeLogged !== true;

    return logged ? <Component /> : <NotLogged />;
};

const Container = ({ Component, mustBeLogged }: I_Props) =>
    BaseContainer({
        Component: () => WithLoginCheck({ Component, mustBeLogged }),
    });

export default Container;
