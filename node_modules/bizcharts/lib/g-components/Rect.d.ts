import React from 'react';
import { IBaseProps } from './Base';
export interface IRectProps extends IBaseProps {
    attrs: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        radius?: number;
        [key: string]: any;
    };
    [key: string]: any;
}
declare const _default: React.ForwardRefExoticComponent<Omit<IRectProps, "ref"> & React.RefAttributes<any>>;
export default _default;
