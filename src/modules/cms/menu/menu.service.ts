import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class MenuService {

    getMenu():any{
        return [
            {
                id: '1',
                caption: 'Channel TV',
                icon: 'pi pi-desktop',
                toggle_child: false,
                sidebarChild: [
                    {
                        id: '11',
                        caption: 'Channel Group',
                        icon: 'pi pi-clone',
                        toggle_child: false,
                        url: '/setting-channel-tv/channel-group'
                    },
                    {
                        id: '12',
                        caption: 'Channel List',
                        icon: 'pi pi-desktop',
                        toggle_child: false,
                        url: '/setting-channel-tv/channel-list'
                    },
                ]
            },
            {
                id: '2',
                caption: 'Event & Promo',
                icon: 'pi pi-calendar-clock',
                toggle_child: false,
                url: '/event-promo'
            },
            {
                id: '3',
                caption: 'Entertainment',
                icon: 'pi pi-crown',
                toggle_child: false,
                url: '/entertainment'
            },
            {
                id: '4',
                caption: 'For Your Guest',
                icon: 'pi pi-file-edit',
                toggle_child: false,
                sidebarChild: [
                    {
                        id: '41',
                        caption: 'About Us',
                        icon: 'pi pi-info-circle',
                        toggle_child: false,
                        url: '/for-your-guest/about-us'
                    },
                    {
                        id: '42',
                        caption: 'Our Rooms',
                        icon: 'pi pi-home',
                        toggle_child: false,
                        url: '/for-your-guest/our-rooms'
                    },
                    {
                        id: '43',
                        caption: 'Our Facilities',
                        icon: 'pi pi-expand',
                        toggle_child: false,
                        url: '/for-your-guest/our-facilities'
                    },
                ]
            },
            {
                id: '5',
                caption: 'Greeting Card',
                icon: 'pi pi-check-square',
                toggle_child: false,
                url: '/greeting-card'
            },
            {
                id: '5',
                caption: 'Dining',
                icon: 'pi pi-star',
                toggle_child: false,
                url: '/dining'
            },
            {
                id: '6',
                caption: 'Nearby Attractions',
                icon: 'pi pi-car',
                toggle_child: false,
                url: '/nearby-attractions'
            },
            {
                id: '7',
                caption: 'IPTV Features',
                icon: 'pi pi-cog',
                toggle_child: false,
                url: '/iptv-features'
            },
            {
                id: '8',
                caption: 'User Management',
                icon: 'pi pi-users',
                toggle_child: false,
                sidebarChild: [
                    {
                        id: '81',
                        caption: 'Setup Role',
                        icon: 'pi pi-objects-column',
                        toggle_child: false,
                        url: '/user-management/setup-role'
                    },
                    {
                        id: '82',
                        caption: 'Setup User',
                        icon: 'pi pi-user',
                        toggle_child: false,
                        url: '/user-management/setup-user'
                    },
                    {
                        id: '83',
                        caption: 'Setting Menu Roles',
                        icon: 'pi pi-sliders-h',
                        toggle_child: false,
                        url: '/user-management/setting-role-menu'
                    },
                ]
            },
        ]
    }
}
