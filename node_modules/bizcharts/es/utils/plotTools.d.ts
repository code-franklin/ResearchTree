import React from 'react';
export declare const visibleHelper: (cfg: any, defaultVisible?: boolean) => {
    visible: boolean;
    text: string | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
} | {
    visible: boolean;
    text?: undefined;
};
export declare const visibleHelperInvert: (cfg: any) => any;
