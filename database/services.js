import Realm from "realm";



import {databaseOptions} from './allSchema'

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