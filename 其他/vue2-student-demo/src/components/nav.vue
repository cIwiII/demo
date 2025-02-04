<template>

    <nav>

        <ul>
            <li :key="vals.ids" v-for="vals in menu">
                <p>{{ vals.tits }}</p>
                <ul>
                    <li :class="val.className" :key="val.id" v-for="val in vals.children">{{ val.tit }}</li>
                </ul>
            </li>
        </ul>
    
    </nav>

</template>

<script>
export default {
    data() {
        return {
            menu: [{
                ids: 1, tits: '课程体系', children: [
                    { id: 1, tit: '专业管理', className: 'check' },
                    { id: 2, tit: '阶段管理', className: '' },
                    { id: 3, tit: '课程管理', className: '' },
                    { id: 4, tit: '知识域管理', className: '' },
                    { id: 5, tit: '知识点管理', className: '' },
                ]
            },
            {
                ids: 2, tits: '线下随堂', children: [
                    { id: 1, tit: '随堂视频', className: 'check' },
                    { id: 2, tit: '视频上传', className: '' },
                    { id: 3, tit: '随堂笔记', className: '' },
                    { id: 4, tit: '随堂作业', className: '' },
                    { id: 5, tit: '作业批改', className: '' },
                ]
            },]
        }
    }
}
</script>
<!-- <li ></li> -->
<style  lang="scss">
nav {
    background-color: rgb(22, 21, 21, .5);
    width: 180px;
    color: #fff;

    ul {
        list-style: none;

        // li ul{
        //     display: none;
        // }
        li li {
            position: relative;
            width: 130px;
            line-height: 2.0;
            left: -80px;
            top: 0;
            padding-left: 50px;
        }

        .check {
            background-color: rgba(15, 233, 222, 0.4);
        }
    }
}
</style>