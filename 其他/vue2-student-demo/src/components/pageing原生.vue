<template>
    <div class="pageing">
        <div class="pages">
            <button @click.prevent="fenye(1)">首页</button>
            <a href="#" @click.prevent="fenye(item)" v-for="item in newPages"
               :key="item">{{item}}</a>
            <button @click.prevent="fenye(pages)">尾页</button>
        </div>
        <div class="message">
            <span>一共{{pages}}页/当前{{currentPage}}页</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ["pages", 'size'],
    data() {
        return {
            currentPage: 1
        }
    },
    computed: {
        newPages() {
            if (this.pages < 6) { return this.pages }
            else {
                if (this.currentPage < 4) {
                    return [1, 2, 3, 4, 5]
                } else if (this.currentPage >= this.pages - 5) {
                    return [this.pages - 4, this.pages - 3, this.pages - 2, this.pages - 1, this.pages]
                } else {
                    return [this.currentPage - 2,
                    this.currentPage - 1,
                    this.currentPage,
                    this.currentPage + 1,
                    this.currentPage + 2
                    ]
                }
            }


        }
    },
    methods: {
        fenye(val) {
            this.currentPage = val
            this.$emit("pageing", val, this.size)
        }
    }
}
</script>

<style lang="scss" scoped>
.pageing {
    display: flex;
    margin-top: 20px;
    align-items: center;
    .pages {
        display: flex;
        a {
            display: block;
            width: 30px;
            height: 30px;
            border: 1px solid gainsboro;
            text-align: center;
            line-height: 30px;
        }
    }
}
</style>