import * as React from 'react';
import { Router } from 'esp-js';
import { Workspace } from '../models/workspace';
import { EventConst } from '../eventConst';

export interface WorkspaceViewProps {
    model: Workspace;
    router: Router;
    session: number;
    isRunning: Boolean;
}

export class WorkspaceView extends React.Component<WorkspaceViewProps, {}> {
    
    constructor(props?: WorkspaceViewProps, context?: any) {
        super();
    }

    public shouldComponentUpdate(nextProps: Readonly<WorkspaceViewProps>, nextState: Readonly<WorkspaceViewProps>, nextContext: any) : boolean {
        return true;
    }
    _publishEvent(eventName, event) {
        this.props.router.publishEvent(this.props.model.modelId, eventName, event);
    }
   
    render() {
        let {  session, clockify} = this.props.model;
        return (
            <div className='workspace'>
                <h1>esp-js-react demo - TIMER</h1>
  
                    <div className='grid bg-danger text-white'>
                    <header><h1 className='h5'><i className='fas fa-stopwatch mr-2'></i> Clock</h1></header>
                    <main className='square'>
                    <div className='square-inner'>
                    
                        <div className='timer'>
                        <div id='timer-label' className='h4'>TIMER</div>
                        <div id='time-left' className='display-3 mb-3'><strong>{clockify(session.session)}</strong></div>
                        </div>

                        <div className='timer-control'>
                        <button id='start_stop'  onClick={() => {this._publishEvent( EventConst.START_TIMER , { session }); }}><i className={'fas fa-3x fa-play-circle'}></i></button>
                        <button id='reset' className='bg-transparent text-white border-0 ml-1'  onClick={() => {this._publishEvent( EventConst.RESET_ALL, {}); }}><i className='fas fa-3x fa-stop-circle'></i></button>
                        </div>                    
                    </div>
                                
                    </main>
                    
                    <footer className='d-flex justify-content-between align-items-center'>
                           <div className='session-control ml-4'>
                        <div id='session-label' className='h6'>Session</div>
                        <div className='d-flex'>
                        <button id='session-decrement' className='bg-danger text-white border-0'  onClick={() => {this._publishEvent( EventConst.DECREMENT_SESSION, { }); }}><i className='fas fa-chevron-left'></i></button>
                        <div id='session-length' className='h2 mx-2'>{clockify(session.session)}</div>
                        <button id='session-increment' className='bg-danger text-white border-0'  onClick={() => {this._publishEvent( EventConst.INCREMENT_SESSION, { }); }}>
                        <i className='fas fa-chevron-right'></i></button>
                        </div>
                    </div>
                    </footer>
                    <audio id='beep' src='../../css/beep.wav' />
                </div>
            </div>
        );
    }
}