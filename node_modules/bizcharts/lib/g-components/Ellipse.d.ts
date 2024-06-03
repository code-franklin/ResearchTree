import React from 'react';
import { IBaseProps } from './Base';
export interface IEllipseProps extends IBaseProps {
    attrs: {
        x?: number;
        y?: number;
        rx?: number;
        ry?: number;
        [key: string]: any;
    };
    [key: string]: any;
}
declare const _default: React.ForwardRefExoticComponent<Omit<IEllipseProps, "ref"> & React.RefAttributes<any>>;
export default _default;
