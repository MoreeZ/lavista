import * as React from 'react';

export interface Button {
    class?: string,
    text: string,
    color?: string,
    link?: string
}

export interface IContentSlabProps {
    heading: string,
    description: string,
    image: ImageBitmap,
    button?: Button,
    backgroundColor?: string,
    height?: number,
    reverse?: boolean,
    fullscreen?: boolean
}

export default function ContentSlab(props: IContentSlabProps) {
    return (
        <div className='scale-content-width' style={{ backgroundColor: props.backgroundColor, height: props.height }}>
            <div className={(!props.fullscreen ? "block-content-width" : "") + ' cs-container ' + (props.reverse ? "cs-container-reverse" : "")}>
                <div className={!props.reverse ? 'cs-left' : 'cs-right'} style={{height: props.height}}>
                    <div className='cs-heading'>{props.heading}</div>
                    <div className='cs-desc'>{props.description}</div>
                    <div className={"cs-button btn " + props.button?.class} style={{ backgroundColor: props.button?.color }}>{props.button?.text}</div>
                </div>
                <div className={!props.reverse ? 'cs-right' : 'cs-left'} style={{height: props.height}}>
                    <div className='cs-img-cont'>
                        <img src={props.image.toString()} alt={props.heading} style={props.height ? {height: props.height-(props.height/10)} : {}} />
                    </div>
                </div>
            </div>
        </div>
    );
}
