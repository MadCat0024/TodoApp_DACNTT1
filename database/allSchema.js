 

import Realm from "realm";
import {TodoListSchema} from './tables'
export const databaseOptions = {
    path: 'exan.realm',
    schema: [
        TodoListSchema
    ],
    schemaVersion: 1
}

