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
    title: 'WeHotel 前端文档',
    // permalink: '/:slug',
    themeConfig: {
        lastUpdated: '上次更新',
        nav: [
            {text: '代码风格指南', link: '/style-guide/'},
            {text: '私有npm', link: '/npm/'},
            {text: '仓库', link: '/packages/'},
            {text: '文章推荐', link: '/blog/'},
            {text: '代码生成器', link: '/archer/'},
            {text: '智慧门店助手', link: '/wisdom-hotel-helper/'}
        ],
        sidebar: {
            '/style-guide/': getStyleGuide('代码规范', '代码审查'),
            '/npm/': getNpm('私有 NPM', 'NPM支持'),
            '/packages/': getPackages('仓库'),
            '/archer/': archerSidebar,
            '/wisdom-hotel-helper/': getWisdomHotelHelper()
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


function getStyleGuide(groupA, groupB) {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                {
                    title: '风格指南',
                    collapsable: false,
                    children: [
                        'eslint-standard',
                        'lib-guide',
                    ]
                },
                {
                    title: '工具支持',
                    collapsable: false,
                    children: [
                        'editor',
                        'ESLint',
                        'git-hook',
                    ]
                }
            ]
        },
        {
            title: groupB,
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
                'widget'
            ]
        }
    ]
}
