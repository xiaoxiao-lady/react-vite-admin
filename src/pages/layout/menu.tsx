import { MenuDataItem } from "@ant-design/pro-layout/lib/typings";

export const addMenus:MenuDataItem[] = [
    {
        "path": "/test",
        "name": "测试",
        "icon": "smile",
        "children": [
            {
                "path": "/test/page1",
                "name": "组件的重新渲染",
                "icon": "smile"
            }
        ]
    },
 
]