import {
    Home,
    Box,
    DollarSign,
    Tag,
    Clipboard,
    Camera,
    AlignLeft,
    UserPlus,
    Users,
    Chrome,
    BarChart,Settings,Archive, LogIn
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Tablero de Control', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Productos', icon: Box, type: 'sub', active: false, children: [
            {
                title: 'En tienda', type: 'sub', active: false, children: [
                    { path: '/products/physical/ProductType', title: 'Tipos de Productos', type: 'link' },
                    { path: '/products/physical/category', title: 'Categorias', type: 'link' },
                    { path: '/products/physical/sub-category', title: 'Sub Categorias', type: 'link' },
                    { path: '/products/physical/sub-category-dos', title: 'Sub Categorias Dos', type: 'link' },
                    { path: '/products/physical/productvariables', title: 'Variables Productos', type: 'link' },
                    { path: '/products/physical/product-list', title: 'Listar Productos', type: 'link' },
                    { path: '/products/physical/product-detail', title: 'Detalle Productos', type: 'link' },
                    { path: '/products/physical/add-product', title: 'Crear Productos', type: 'link' },
                ]
            },
            {
                title: 'En Página', type: 'sub', active: false, children: [
                    { path: '/products/digital/digital-category', title: 'Categorias', type: 'link' },
                    { path: '/products/digital/digital-sub-category', title: 'Sub Categorias', type: 'link' },
                    { path: '/products/digital/digital-product-list', title: 'Listar Productos', type: 'link' },
                    { path: '/products/digital/digital-add-product', title: 'Crear Producto', type: 'link' },
                ]
            },
        ]
    },
    {
        title: 'Ventas', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Pedidos', type: 'link' },
            { path: '/sales/transactions', title: 'Facturación', type: 'link' },
        ]
    },
    {
        title: 'Clientes', icon: Users, type: 'sub', active: false, children: [
            { path: '/customers/list-customers', title: 'Listar Clientes', type: 'link' },
            { path: '/customers/create-customers', title: 'Crear Clientes', type: 'link' },
        ]
    },
    {
        title: 'Promociones', icon: Tag, type: 'sub', active: false, children: [
            { path: '/coupons/list-coupons', title: 'List Coupons', type: 'link' },
            { path: '/coupons/create-coupons', title: 'Create Coupons', type: 'link' },
        ]
    },
    {
        title: 'Páginas', icon: Clipboard , type: 'sub', active: false, children: [
            { path: '/pages/list-page', title: 'List Page', type: 'link' },
            { path: '/pages/create-page', title: 'Create Page', type: 'link' },
        ]
    },
    {
        title: 'Media', path: '/media', icon: Camera, type: 'link', active: false
    },
    {
        title: 'Menus', icon: AlignLeft, type: 'sub', active: false, children: [
            { path: '/menus/list-menu', title: 'List Menu', type: 'link' },
            { path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
        ]
    },
    {
        title: 'Usuarios', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/users/list-user', title: 'User List', type: 'link' },
            { path: '/users/create-user', title: 'Create User', type: 'link' },
        ]
    },
    {
        title: 'Localización', icon: Chrome, type: 'sub', children: [
            { path: '/localization/transactions', title: 'Translations', type: 'link' },
            { path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
            { path: '/localization/taxes', title: 'Taxes', type: 'link' }
        ]
    },
    {
        title: 'Informes',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Configuración', icon: Settings, type: 'sub', children: [
            { path: '/settings/profile', title: 'Profile', type: 'link' },
        ]
    },
    {
        title: 'Facturas',path:'/invoice', icon: Archive, type: 'link', active: false
    },
    {
        title: 'Login',path:'/auth/login', icon: LogIn, type: 'link', active: false
    }
]
