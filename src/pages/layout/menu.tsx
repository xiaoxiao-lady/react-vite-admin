import { MenuDataItem } from "@ant-design/pro-layout/lib/typings";

export const addMenus:MenuDataItem[] = [
    {
        "path": "/test",
        "name": "测试",
        "icon": "smile",
        "children": [
            {
                "path": "/test/page1",
                "name": "测试",
                "icon": "smile"
            }
        ]
    },
 
]