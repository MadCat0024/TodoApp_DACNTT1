import Realm from "realm";



import {databaseOptions} from './allSchema'
import { TodoListSchema } from "./tables";

export const getAll = (nameTable) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
            let alls = realm.objects(nameTable)
            resolve(alls)
        }
    ).catch(e => {
        reject(e)
    })
})

export const insert = (nameTable,obj) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm) => {
        realm.write(() => {
            realm.create(nameTable,obj,true)
            resolve(1)
        })
    }).catch(e => {
        reject(0)
    })
})

export const deleteTask = (nameTable,id) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm)=>{
        realm.write(()=>{
            let deleteById = realm.objectForPrimaryKey(nameTable, id);
            realm.delete(deleteById);
            resolve(1);
        })
    }).catch( e=>{
        reject(0)
    })
})

// export const queryAllTodoList = ()=> new Promise((resolve, reject) => {
//     Realm.open(databaseOptions).then((realm) => {
//         let allTodoList = realm.objects(TodoListSchema);
//         resolve(allTodoList)
//         resolve(1);
//     }).catch(e=>{
//         reject(0)
//     })
// })
export const getId = ()=>new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then((realm)=>{
        let all = realm.objects(TodoListSchema);
        let id = all.id;
        resolve(id)
    }).catch(e =>{
        reject(1)
    })
})