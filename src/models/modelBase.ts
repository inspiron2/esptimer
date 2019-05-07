import { Disposable, Router } from 'esp-js';

export class ModelBase {
    private _modelId: string;
    private _router: Router;

    constructor(modelId: string, router: Router) {
        this._modelId = modelId;
        this._router = router;
    }

    public get modelId() {
        return this._modelId;
    }

    public get router() {
        return this._router;
    }

    public observeEvents() {
        this.router.observeEventsOn(this.modelId, this);
    }

    public ensureOnDispatchLoop(action) {
        if (this.router.isOnDispatchLoopFor(this.modelId)) {
            action();
        } else {
            this.router.runAction(this.modelId, action);
        }
    }
}