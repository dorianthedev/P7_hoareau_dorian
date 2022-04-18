import {createRouter, createWebHistory} from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'
import Login from './views/Login.vue'

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
    },
    {
        name:'Login',
        component: Login,
        path:'/login'
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;