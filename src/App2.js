import React from 'react';

import SharedWidget from './SharedWidget.jsx';

export default React.createClass({
    displayName: 'App2',

    render() {
        return (
            <div>
                <h1>Party time!</h1>
                <SharedWidget>Page 2</SharedWidget>
            </div>
        );
    }
});
