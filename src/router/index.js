import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import recom from '@/components/recom/recom'
import toplist from '@/components/toplist/toplist'
import search from '@/components/search/search'
import list from '@/components/list/list'
//引用路由
Vue.use(Router)

export default new Router({
	linkExactActiveClass: 'active',
	routes: [{
			path: '/',
			name: 'recom',
			component: recom
		},
		{
			path: '/toplist',
			name: 'toplist',
			component: toplist,
			children: [{
				path: 'list',
				component: list
			}]
		}, {
			path: '/search',
			name: 'search',
			component: search
		}
	]
})