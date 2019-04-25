module.exports = {
    port: 8302,
    dest: 'docs',
    evergreen: true,
    title: 'WeHotel 前端文档',
    // permalink: '/:slug'
    themeConfig: {
        nav: [
            {text: '代码规范', link: '/style-guide/'},
            {text: '私有npm', link: '/verdaccio/'},
            {text: 'GitLab', link: 'http://172.25.38.44/fe-gayhub/fe-docs'}
        ]
    }
};
