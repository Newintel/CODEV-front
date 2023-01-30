import React from 'react';

const Container = (Component: () => JSX.Element) => () => {
    return <Component />;
};

export default Container;
