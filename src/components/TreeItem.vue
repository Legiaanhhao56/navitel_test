<template>
    <tree-item>
        <md-checkbox
                v-model="checked"
                :disabled="disabled"
        >
            {{tree.title}}
        </md-checkbox>
        <tree-wrapper v-if="tree.child && tree.child.length">
            <TreeItem
                    v-for="child in tree.child"
                    :key="child.id"
                    :tree="child"
                    :disabled="checked ? checked : disabled"
            />
        </tree-wrapper>
    </tree-item>
</template>

<script>
    import { TreeItem, TreeWrapper } from "@/assets/styled-components/Tree";

    export default {
        name: "TreeItem",
        components: {
            'tree-item': TreeItem,
            'tree-wrapper': TreeWrapper,
        },
        props: [
            'tree',
            'disabled',
        ],
        computed: {
            checked: {
                get: function () {
                    return this.$store.getters.allCheckedItems.indexOf( this.tree.id ) != -1
                },
                set: function (newValue) {
                    this.$store.commit('toggleCheck',{ checked: newValue, id: this.tree.id })
                }
            }
        },
        watch: {
            disabled(val) {
                if (val && this.checked){
                    this.$store.commit('toggleCheck',{ checked: false, id: this.tree.id })
                }
            }
        },
    }
</script>
