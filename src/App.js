import React from 'react';

import SharedWidget from './SharedWidget.jsx';

export default React.createClass({
    displayName: 'App',

    render() {
        return (
            <div>
                <h1>Page 1</h1>
                <SharedWidget>Page 1</SharedWidget>
                <p><a href='/page2'>Page 2</a></p>
            </div>
        );
    }
});