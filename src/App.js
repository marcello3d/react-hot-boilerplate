import React from 'react';

import SharedWidget from './SharedWidget.jsx';

export default React.createClass({
    displayName: 'App',

    render() {
        return (
            <div>
                <h1>The App!</h1>
                <SharedWidget>A widget</SharedWidget>
            </div>
        );
    }
});
