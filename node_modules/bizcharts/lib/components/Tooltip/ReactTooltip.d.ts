import React from 'react';
export interface TooltipProps extends React.ComponentProps<any> {
    children?: (title?: string, items?: any[], x?: number, y?: number, event?: any) => any;
    [key: string]: any;
}
declare const _default: (props: TooltipProps) => React.JSX.Element;
export default _default;
