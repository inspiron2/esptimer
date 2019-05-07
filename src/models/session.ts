import { ModelBase } from './modelBase';
import { viewBinding } from 'esp-js-react';
import { WorkspaceView } from '../views/workspaceView';

@viewBinding(WorkspaceView)
export class Session extends ModelBase {
    private _modelIdToDisplay: string;
    private _session: SessionType;

    constructor(router, session) {
        super(('modal'), router);
        this._modelIdToDisplay = null;
        this._session = session;
        }

    public get modelIdToDisplay() {
        return this._modelIdToDisplay;
    }

    public get session() {
        return this._session;
    }

    public observeEvents() {
        super.observeEvents();
        this.router.addModel(this.modelId, this);
    }

    public open(modelIdToDisplay: string, session: SessionType) {
        return this.router.createObservableFor(this.modelId, () => {
            this._modelIdToDisplay = modelIdToDisplay;
            this._session = session;
            return () => {
                this._clear();
            };
        });
    }

    private _clear() {
        this._modelIdToDisplay = null;
        this._session = null;
    }
}

export interface SessionType {
    session: number;
    isRunning: Boolean;
    isSession: Boolean;
}
