import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import Dashboard from '../pages/Dashboard.vue';
import ApplyLeave from '../pages/ApplyLeave.vue';
import MyLeaves from '../pages/MyLeaves.vue';
import ManageRequests from '../pages/ManageRequests.vue';
import TeamMembers from '../pages/TeamMembers.vue';
import Profile from '../pages/Profile.vue';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guest: true }
    },
    {
        path: '/signup',
        name: 'Signup',
        component: Signup,
        meta: { guest: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/apply-leave',
        name: 'ApplyLeave',
        component: ApplyLeave,
        meta: { requiresAuth: true, role: 'employee' }
    },
    {
        path: '/my-leaves',
        name: 'MyLeaves',
        component: MyLeaves,
        meta: { requiresAuth: true, role: 'employee' }
    },
    {
        path: '/manage-requests',
        name: 'ManageRequests',
        component: ManageRequests,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/team-members',
        name: 'TeamMembers',
        component: TeamMembers,
        meta: { requiresAuth: true, role: 'employer' }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/',
        redirect: '/dashboard'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (to.meta.requiresAuth && !user) {
        next('/login');
    } else if (to.meta.guest && user) {
        next('/dashboard');
    } else if (to.meta.role && user && user.role !== to.meta.role) {
        next('/dashboard');
    } else {
        next();
    }
});

export default router;
