export interface IActivityDB {
    id_activitiy: number;
    user_id: number;
    title: string;
    description: string;
    expiration_date: string;
    priority: string;
    keywords: string;
    completed: number;
    completed_date: string | null;
}

export interface IActivity {
    id_activity: number;
    user_id: number;
    title: string;
    description: string;
    expiration_date: string;
    priority: string;
    keywords: string[];
    completed: number;
    completed_date: string | null;
}