import React, { Component } from 'react';

import logo from './logo.svg';

class App extends Component{
    render ()   {
        return(
            <div className="App container">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </Table>
            </div>
        );
    }
}

export default App;