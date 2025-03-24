
// Define TaskData (incoming data for creating/updating tasks)
export interface TaskData {
    title: string;
    description: string;
    status?: 'pending' | 'in-progress' | 'completed';
}