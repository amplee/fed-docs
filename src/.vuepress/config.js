module.exports = {
    port: 8302,
    dest: 'docs',
    base: '/docs/',
    evergreen: false,
    title: 'WeHotel 前端文档',
    // permalink: '/:slug',
    themeConfig: {
        nav: [
            {text: '代码风格指南', link: '/style-guide/'},
            {text: '私有npm', link: '/verdaccio/'},
        ],
        sidebar: {
            '/style-guide/': getStyleGuide('代码规范', '代码审查')
        },
        displayAllHeaders: true,
        repo: 'http://gzgit.bestwehotel.com/fe-gayhub/fe-docs',
        repoLabel: '查看源码',
    },
    lastUpdated: {
        transformer: (timestamp) => {
            var date = new Date();
            date.setTime(timestamp);
            return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
        }
    },
    plugins: [
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
                'code-review-2'
            ]
        }
    ]
}
