import { Chance } from "chance";
import { Status } from "../../domains/statuses/entities/status.entity";


export class StatusClass implements Status {
    orders = [];
    id = Chance().natural({ min: 1 });
    value: string
    description = Chance().string({ length: 15 });

    constructor(value: string) {
        this.value = value
        this.description = value
    }
}

export class ProcessingStatus extends StatusClass {
    constructor() {
        super('processing')
        this.description = 'processing'
    }
}

export class CanceledStatus extends StatusClass {
    constructor() {
        super('canceled')
        this.description = 'canceled'
    }
}
