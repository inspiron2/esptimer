
import { viewBinding } from 'esp-js-react';
import { WorkspaceView } from '../views/workspaceView';
import { List } from 'immutable';
import { observeEvent } from 'esp-js';
import { EventConst  } from '../eventConst';
import { ModelBase } from './modelBase';

export interface SessionType {
    session: number;
    isRunning: Boolean;
    isSession: Boolean;
}

let timerCountdown;

@viewBinding(WorkspaceView)
export class Workspace extends ModelBase  {
    private _session: SessionType;
    private _clockify: String;

    public clockify = value => {
        let minutes : number = Math.floor(value / 60);
        let seconds : number = value - minutes * 60;
        const sec = seconds < 10 ? '0' + seconds : seconds;
        const min = minutes < 10 ? '0' + minutes : minutes;
        return min + ':' + sec;
    }
       
    constructor(router, session) {
        super(('workspace'), router);
        this._session = session;
        this._clockify = this.clockify(session.session);
    }
       
    public get session() {
        return this._session;
    }

    observeEvents() {
        this.router.addModel(this.modelId, this);
        super.observeEvents();
    }

    @observeEvent(EventConst.PREPARE_TIMER)
    _onPrepareTimer() {
      console.log('hi');
    }
    @observeEvent(EventConst.START_TIMER )
    _onStartTimer(running, router) {
        if (running === false) {
            clearInterval(timerCountdown);       
        } else {
            timerCountdown = setInterval(() => {
                this.router.runAction(this.modelId, () => {
                    this._session.session = this._session.session - 1;
                });
            }, 1000);
        }
    }

    @observeEvent(EventConst.PAUSE_TIMER)
    _onPauseTimer() {
      console.log('hi3');
      clearInterval(timerCountdown);
    }
    @observeEvent(EventConst.RESET_ALL)
    _onresetAll() {
      clearInterval(timerCountdown);
      console.log('hi4');
    }
    @observeEvent(EventConst.TOGGLE_TIMER)
    _ontoggleTimer() {
      console.log('hi5');
    }
    @observeEvent(EventConst.INCREMENT_SESSION)
    _onincrementSession() {
        this._session.session = this._session.session + 60;
        return(this._session);
    }
    @observeEvent(EventConst.DECREMENT_SESSION)
    _ondecrementSession() {
        this._session.session = this._session.session - 60;
        return(this._session);       
    }
}