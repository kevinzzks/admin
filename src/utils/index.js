const menuItems = [
    {
      key: 'dashboard',
      title: '仪表盘',
      icon: markRaw(IconHome),
      routeName: 'Dashboard'
    },
    {
      key: 'menu1',
      title: '菜单一',
      icon: markRaw(IconCalendar),
      routeName: 'Menu1'
    },
    {
      key: 'nav1',
      title: '导航一',
      icon: markRaw(IconCalendar),
      children: [
        {
          key: 'nav1-sub1',
          title: '子菜单一',
          routeName: 'Nav1Sub1'
        },
        {
          key: 'nav1-sub2',
          title: '子菜单二',
          routeName: 'Nav1Sub2'
        }
      ]
    }
  ]