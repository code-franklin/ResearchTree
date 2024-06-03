import React from 'react';
import { IBaseProps } from './Base';
export interface ITextProps extends IBaseProps {
    attrs: {
        x?: number;
        y?: number;
        text?: number;
        [key: string]: any;
    };
    [key: string]: any;
}
declare const _default: React.ForwardRefExoticComponent<Omit<ITextProps, "ref"> & React.RefAttributes<any>>;
export default _default;
