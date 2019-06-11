import Vue from 'vue';
import Vuex from 'vuex';

import { TreeData } from "@/data/Tree";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        TreeData: TreeData,
        CheckedItems:[],
    },
    mutations: {
        toggleCheck(state,obj) {
            //obj{checked:bool,id:number}
            obj.checked
                ?
                state.CheckedItems.push(obj.id)
                :
                state.CheckedItems.splice(state.CheckedItems.indexOf(obj.id),1)
            ;
        },
        setCheckedItems( state, items ) {
            state.CheckedItems = items
        }
    },
    getters: {
        allTreeItems (state){
            return state.TreeData
        },
        allCheckedItems (state){
            return state.CheckedItems
        }
    }
})