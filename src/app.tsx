import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RouterProvider, SmartComponent } from 'esp-js-react';
import { Workspace } from './models/workspace';
import { Router } from 'esp-js';

// create an app wide router
let router = new Router();

const x = {session: 60,isRunning : true, isSession: false};
// create the main model
let workspace = new Workspace(router, x);
workspace.observeEvents();

ReactDOM.render(
    <RouterProvider router={router}>
        <div>
            <SmartComponent modelId={workspace.modelId}/>
        </div>
    </RouterProvider>,
    document.getElementById('root')
);