const antThemeToken = {
  token: {
    colorPrimary: '#1A1A1A',
    colorLink: '#1A1A1A',
    colorText: '#2D2D2D',
    colorTextSecondary: '#6B6B6B',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: '#F7F7F5',
    colorBorder: '#E8E8E2',
    colorBorderSecondary: '#F0F0EC',
    borderRadius: 6,
    borderRadiusLG: 10,
    borderRadiusSM: 4,
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontSizeLG: 16,
    lineHeight: 1.6,
    controlHeight: 38,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    boxShadowSecondary: '0 2px 8px rgba(0,0,0,0.08)',
  },
  components: {
    Button: {
      colorPrimary: '#1A1A1A',
      colorPrimaryHover: '#333333',
      colorPrimaryActive: '#000000',
      borderRadius: 6,
      controlHeight: 38,
      paddingInline: 20,
    },
    Card: {
      borderRadius: 10,
      paddingLG: 16,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 38,
    },
    Select: {
      borderRadius: 6,
    },
    Tag: {
      borderRadius: 4,
    },
    Table: {
      borderRadius: 10,
    },
    Drawer: {
      borderRadius: 0,
    },
  },
};

export { antThemeToken };
