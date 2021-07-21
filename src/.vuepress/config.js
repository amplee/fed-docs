const archerSidebar = [
    {
        title: '代码生成器',
        collapsable: false,
        children: [
            ''
        ]
    },
];

module.exports = {
    port: 8302,
    dest: 'docs',
    base: '/docs/',
    evergreen: false,
    title: 'CBG 前端文档',
    // permalink: '/:slug',
    themeConfig: {
        // lastUpdated: false,
        nav: [
            {text: '代码风格指南', link: '/style-guide/'},
            // {text: '私有npm', link: '/npm/'},
            // {text: '仓库', link: '/packages/'},
            {text: '文章推荐', link: '/blog/'},
            // {text: '代码生成器', link: '/archer/'},
            // {text: '智慧门店助手', link: '/wisdom-hotel-helper/'}
        ],
        sidebar: {
            '/style-guide/': getStyleGuide(),
            // '/npm/': getNpm('私有 NPM', 'NPM支持'),
            // '/packages/': getPackages('仓库'),
            '/archer/': archerSidebar,
            // '/wisdom-hotel-helper/': getWisdomHotelHelper()
        },
        displayAllHeaders: true,
        repo: 'http://gzgit.bestwehotel.com/fe-gayhub/fe-docs',
        repoLabel: '查看源码',
    },
    plugins: [
        [
            '@vuepress/last-updated',
            {
                transformer: (timestamp) => {
                    var date = new Date();
                    date.setTime(timestamp);
                    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
                }
            }
        ],
        ['@vuepress/back-to-top', true],
        ['@vuepress/nprogress', true]
    ]
};


function getStyleGuide() {
    return [
        {
            title: '代码规范',
            collapsable: false,
            children: [
                '',
                {
                    title: 'Javascript 风格指南',
                    collapsable: true,
                    children: [
                        'js-guide-standard',
                        'js-guide-vue',
                        'js-guide-react',
                        'js-guide-lib',
                        'js-guide-other'
                    ]
                },
                {
                    title: 'CSS 风格指南',
                    collapsable: true,
                    children: [
                        'css-guide-standard',
                        'css-guide-scss',
                    ]
                }
            ]
        },
        {
            title: '项目集成',
            collapsable: false,
            children: [
                {
                    title: '编辑器插件',
                    collapsable: true,
                    children: [
                        'editor-plugin-config',
                        'editor-plugin-spell-checker',
                        'editor-plugin-eslint',
                        'editor-plugin-stylelint'
                    ]
                },
                {
                    title: 'Eslint配置',
                    collapsable: true,
                    children: [
                        'eslint-config-standard',
                        'eslint-config-vue',
                        'eslint-config-react'
                    ]
                },
                {
                    title: 'Stylelint配置',
                    collapsable: true,
                    children: [
                        'stylelint-config-standard',
                        'stylelint-config-scss',
                    ]
                },
                {
                    title: '工程化支持',
                    collapsable: true,
                    children: [
                        'build-eslint-webpack',
                        'build-stylelint-webpack',
                        'build-code-fix'
                    ]
                },
                {
                    title: 'Git Hooks',
                    collapsable: true,
                    children: [
                        'git-hooks-pre-commit',
                        'git-hooks-verify-commit-msg'
                    ]
                }
            ]
        },
        {
            title: '代码审查',
            collapsable: false,
            children: [
                'code-review-1',
                'code-review-2',
                'code-review-3'
            ]
        }
    ]
}

function getNpm(groupA, groupB) {
    return [{
        title: groupA,
        collapsable: false,
        children: [
            '',
            'guide',
            'publish',
            'install'
        ]
    } ,{
        title: groupB,
        collapsable: false,
        children: [
            'nrm',
            // 'yrm'
        ]
    }];
}

function getPackages(groupA) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'wehotelCli',
                'offlineApp',
                'microFe'
            ]
        }
    ]
}

function getWisdomHotelHelper() {
    return [
        {
            title: '智慧门店助手',
            collapsable: false,
            children: [
                '',
                {
                    title: 'widget',
                    collapsable: false,
                    children: [
                        'widget-standard',
                        'wisdom-widget-cli',
                        'widget-developer-auth',
                        'widget-util'
                    ]
                }
            ]
        }
    ]
}
