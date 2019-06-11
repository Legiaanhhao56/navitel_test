<template>
    <div class="tree">
        <tree-wrapper>
            <TreeItem :tree="setData(TreeData)"/>
        </tree-wrapper>
    </div>
</template>

<script>
    import TreeItem from './TreeItem.vue'
    import { TreeWrapper } from "@/assets/styled-components/Tree";

    export default {
        name: "Tree",
        computed: {
            TreeData () {
                return this.$store.getters.allTreeItems
            }
        },
        components: {
            TreeItem,
            'tree-wrapper': TreeWrapper,
        },
        methods: {
            setData: function (data) {
                const dataFormatted = [];
                const all = {};

                data.forEach((item) => {
                    all[item.id] = item;
                });

                Object.keys(all).forEach((id) => {
                    const item = all[id];
                    if (item.parent === null || (!item.parent)) {
                        dataFormatted.push(item);
                    } else if (item.parent in all) {
                        const p = all[item.parent];
                        if (!('child' in p)) {
                            p.child = [];
                        }
                        p.child.push(item);
                    }
                });

                return dataFormatted[0];
            },

            getCheckedItems: function () {

                return this.$store.getters.allCheckedItems
            },

            setCheckedItems: function (items) {

                return this.$store.commit('setCheckedItems',items)
            },

        },
    }
</script>

