<template>
    <div class="article-list-wrapper">
        <ul class="article-list-tab-list">
            <li
                v-for="(tab, index) in tabList"
                :key="index"
                :class="{
                    'active': type === tab.type
                }"
                @click="tabClick(tab.type)"
            >
                {{ tab.title }}
            </li>
        </ul>
        <div class="article-list-container">
            <ul class="article-list">
                <li
                    v-for="(article, index) in articleList"
                    :key="index"
                >
                    <a
                        :href="article.link"
                        target="_blank"
                    >
                        <span>[{{ article.time }}]</span>
                        {{ article.title }}
                    </a>
                </li>
            </ul>
            <paginate
                :page-count="pageTotal"
                v-model="page"
                prev-text="上一页"
                next-text="下一页"
                container-class="paginate"
                page-class="page-item"
                :click-handler="pageClick"
            />
        </div>
    </div>
</template>
<script>
import jsKou from '../utils/jskou';
import Paginate from 'vuejs-paginate';
export default {
    name: 'ArticleList',
    components: {
        Paginate
    },
    data() {
        return {
            tabList: [
                { title: '前端艺术家', type: 0 },
                { title: '飞冰早报', type: 1 }
            ],
            articleList: [],
            type: 0,
            page: 1,
            pageTotal: 0
        };
    },
    created() {
        this.getArticle({
            type: this.type,
            page: this.page - 1
        });
    },
    methods: {
        getArticle(data) {
            jsKou(data)
                .then(res => {
                    this.articleList = res.data || [];
                    this.pageTotal = res.pageTotal;
                });
        },
        tabClick(type) {
            this.type = type;
            this.page = 1;
            this.getArticle({type, page: 0});
        },
        pageClick(page) {
            this.getArticle({
            type: this.type,
            page: page - 1
        });
        }
    }
};
</script>
<style lang="stylus">
    .article-list-wrapper {
        .article-list-tab-list {
            list-style: none;
            display: flex;
            justify-content: space-around;
            li {
                font-weight: bold;
                padding: 10px 30px;
                border-bottom: 2px solid transparent;
                cursor: pointer;
                &.active {
                    color: $accentColor;
                    border-bottom: 2px solid $accentColor;
                }
            }
        }

        .article-list {
            list-style: none;
            a {
                display: block;
                color: $textColor;
                padding: 5px 10px;
                span {
                    margin-right: 10px;
                }
                &:hover {
                    color: $accentColor;
                    text-decoration: none;
                    background-color: $borderColor;
                }
            }
        }

        .paginate {
            list-style: none;
            text-align: center;
            li {
                display: inline-block;
                height: 30px;
                margin: 0 5px;
                line-height: 30px;
                background-color: #eee;
                border-radius: 5px;
                a {
                    display: block;
                    padding: 0 10px;
                    color: $textColor;
                    outline: 0;
                    &:hover {
                        text-decoration: none;
                    }
                }
                &.active {
                    background-color: $accentColor;
                    a {
                        color: #fff;
                    }
                }
                &.disabled {
                    background-color: #efefef;
                    a {
                        color: #ccc;
                    }
                }
            }
        }
    }
</style>
