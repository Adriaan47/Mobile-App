export class Skills {
    id: string;
    name: string;
    origin: string;
    level: number;
    lastUsed: number = Date.now();
    activeExperience: number;
    active: boolean;
    }
