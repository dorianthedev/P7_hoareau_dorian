import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'

const routes = [
    {
        name:'Home',
        component: Home,
        path:'/'
    },
    {
        name:'SignUp',
        component: SignUp,
        path:'/signup'
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;