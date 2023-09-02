<template>
    <form action="/">
        <van-search
                v-model="searchText"
                show-action
                placeholder="请输入想要的标签"
                @search="onSearch"
                @cancel="onCancel"
        />
    </form>

    <van-divider content-position="left">已添加标签区域</van-divider>

    <van-row gutter="20">
        <van-col span="8" v-for="tag in activeIds">
            <van-tag  closeable size="small" type="primary" @close="doClose(tag)">
                {{tag}}
            </van-tag>
        </van-col>
    </van-row>

    <van-divider content-position="left">待添加标签区域</van-divider>

    <van-tree-select
        v-model:active-id="activeIds"
        v-model:main-active-index="activeIndex"
        :items="tagList"
    />
    <div style="padding: 12px">
        <van-button type="primary" block @click="doSearch">搜索</van-button>
    </div>


</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

/**
 *搜索栏
 */
const searchText = ref('');

/**
 *搜索过滤
 */
const onSearch = (val) => {
    /**
     * 把标签的所有子项平铺，然后看里面是否包含输入内容。如果有那就保留，没有就过滤，就得到一个新的tagList。
     * 然后我们需要把之前的tagList标签列表替换成新的符合搜索条件的标签列表，展示给用户。
     * tagList.flatMap(parentTag => parentTag.children).filter(item => { item.text.contains(searchText.value) })
     * [但这样把tagList的嵌套数组改变成为了一个数组了]
     * 流程：点击搜索，搜索出包含搜索条件的标签列表；点击取消，变回初始的标签列表。
     */
        /**
         * 直接这样一直过滤替换会越选越少，且不可取消返回，所以我们需要把标签列表变成一份原始数据，然后去修改原始数据的拷贝
         * tagList.forEach(parentTag => {
         * parentTag.children = parentTag.children.filter(item => item.text.includes(searchText.value));
         *  })
         */
     //遍历原始数据，并复制原始数据进行操作，然后把筛选后的复制版标签列表返回给响应对象tagList的值
     tagList.value = originTagList.map(parentTag => {
         //数据拷贝
         const tempParentTag = {...parentTag};
         const tempChildren = [...parentTag.children];
         //对数据的拷贝进行操作
         tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value));
         return tempParentTag;
     })
}
const onCancel = () => {
    searchText.value = '';
    tagList.value = originTagList;
}

/**
 * 移除标签
 */
const doClose = (tag) => {
    //利用filter过滤来实现移除
    activeIds.value = activeIds.value.filter(item => {
        return item !== tag;
    })
}

/**
 * 待添加标签区域
 */
const activeIds = ref([]);
const activeIndex = ref(0);
//标签原始数据
const originTagList = [
    {
        text: '语言',
        children: [
            { text: 'java', id: 'java' },
            { text: 'python', id: 'python' },
            { text: 'c++', id: 'c++' },
        ],
    },
    {
        text: '方向',
        children: [
            { text: 'java后端开发', id: 'java后端开发' },
            { text: 'vue前端开发', id: 'vue前端开发' },
            { text: '测试', id: '测试' },
        ],
    },
    {
        text: '性别',
        children: [
            { text: '男', id: '0' },
            { text: '女', id: '1' },
        ],
    },
];
//响应式对象let tagList
let tagList= ref(originTagList);

const router = useRouter();
/**
 * 搜索符合条件的伙伴
 * 使用router进行页面跳转，query来页面跳转的传参
 */
const doSearch = () => {
    router.push({
        path: '/searchResultPage',
        query: {
            tags: activeIds.value
        }
    })
}
</script>

<style scoped>

</style>