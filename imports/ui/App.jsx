import React from 'react';
import PropTypes from "prop-types";


const App = ({children}) =>
    <div className="app-container" id="app-container">
        {children}
    </div>;

export default App

App.propTypes = {
    children:PropTypes.node
};
